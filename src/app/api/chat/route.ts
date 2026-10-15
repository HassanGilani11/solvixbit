import { NextRequest, NextResponse } from 'next/server';
import { buildSolvixbitSystemPrompt } from '../../../config/chat-knowledge';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Multi-Model Fallback Priority List
 * Models are attempted in order. If a model encounters a rate limit (HTTP 429),
 * temporary spike (HTTP 503), or quota exhaustion, it instantly fails over to the next.
 */
const MODEL_FALLBACK_CHAIN = [
  'gemini-3.1-flash-lite', // 15 RPM, 500 RPD (Fastest & highest daily cap)
  'gemini-3.5-flash-lite', // 15 RPM, 500 RPD (Alternate high-capacity lite)
  'gemini-3.8-flash',      // 5 RPM, 20 RPD (Latest flagship flash)
  'gemini-3.7-flash',      // 5 RPM, 20 RPD
  'gemini-3.6-flash',      // 5 RPM, 20 RPD
  'gemini-2.5-flash-lite', // 10 RPM, 20 RPD
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
];

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured. Please add GEMINI_API_KEY to .env.local.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    // Limit conversation history to the last 12 messages for performance and context management
    const recentMessages = messages.slice(-12);

    // Format Gemini contents payload
    const formattedContents = recentMessages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const systemPrompt = buildSolvixbitSystemPrompt();

    const requestPayload = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 1200,
        topP: 0.95,
      },
    };

    let activeResponse: Response | null = null;
    let selectedModel = '';
    const errors: string[] = [];

    // Attempt models in the fallback chain sequentially
    for (const model of MODEL_FALLBACK_CHAIN) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestPayload),
        });

        if (res.ok && res.body) {
          activeResponse = res;
          selectedModel = model;
          break; // Successfully connected to this model
        } else {
          const errText = await res.text();
          errors.push(`[${model} HTTP ${res.status}]: ${errText.slice(0, 120)}`);
          // Continue to next model in fallback list on 429, 503, 404, or any error
        }
      } catch (err: any) {
        errors.push(`[${model} Network]: ${err?.message || 'Failed to fetch'}`);
      }
    }

    if (!activeResponse || !activeResponse.body) {
      return NextResponse.json(
        {
          error: 'All Gemini models in fallback chain reached their limit or are temporarily unavailable.',
          details: errors,
        },
        { status: 503 }
      );
    }

    const upstreamReader = activeResponse.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    // Stream parsed plain text tokens directly to client
    const stream = new ReadableStream({
      async start(controller) {
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await upstreamReader.read();

            if (done) {
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith('data: ')) continue;

              const dataStr = trimmed.slice(6);
              if (dataStr === '[DONE]') continue;

              try {
                const parsed = JSON.parse(dataStr);
                const token = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (token) {
                  controller.enqueue(encoder.encode(token));
                }
              } catch {
                // Skip incomplete SSE JSON line
              }
            }
          }
        } catch (streamErr) {
          controller.error(streamErr);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Model-Used': selectedModel,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Internal server error while processing chat inquiry.' },
      { status: 500 }
    );
  }
}
