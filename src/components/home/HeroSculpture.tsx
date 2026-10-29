'use client';

import React, { useRef, useEffect } from 'react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  label?: string;
}

interface Edge3D {
  from: number;
  to: number;
  color: string;
  flowParticles: { progress: number; speed: number; size: number }[];
}

interface Ring3D {
  radiusX: number;
  radiusY: number;
  tiltX: number;
  tiltY: number;
  color: string;
  dashOffset: number;
  dashSpeed: number;
}

export const HeroSculpture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle high DPI display
    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    // Track mouse coordinates normalized between -1 and 1
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = Math.max(-1, Math.min(1, nx));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, ny));
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 1. Construct 3D Geometric Nodes (System Architecture Constellation)
    // Core crystalline polyhedron + orbiting satellite capability nodes
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const scale = 140;

    // 12 vertices of an icosahedron (representing the core intelligence nucleus)
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    const nodes: Node3D[] = rawVertices.map((v, i) => {
      const isGreen = i % 3 === 0;
      return {
        x: (v[0] / phi) * scale * 0.75,
        y: (v[1] / phi) * scale * 0.75,
        z: (v[2] / phi) * scale * 0.75,
        baseX: (v[0] / phi) * scale * 0.75,
        baseY: (v[1] / phi) * scale * 0.75,
        baseZ: (v[2] / phi) * scale * 0.75,
        radius: isGreen ? 4.5 : 3.5,
        color: isGreen ? '#02C415' : '#598BFF',
        glowColor: isGreen ? 'rgba(2, 196, 21, 0.45)' : 'rgba(89, 139, 255, 0.45)',
        pulsePhase: (i / rawVertices.length) * Math.PI * 2,
      };
    });

    // Outer satellite nodes representing digital products and capabilities
    const satelliteDefs = [
      { x: 190, y: -70, z: 40, label: 'Cloud Architecture', color: '#598BFF' },
      { x: -180, y: 90, z: -50, label: 'AI Workflows', color: '#02C415' },
      { x: 80, y: 170, z: 80, label: 'Headless Systems', color: '#598BFF' },
      { x: -90, y: -160, z: -70, label: 'Scalable SaaS', color: '#02C415' },
      { x: 140, y: 120, z: -100, label: 'Connected APIs', color: '#598BFF' },
      { x: -150, y: -80, z: 110, label: 'Enterprise Security', color: '#598BFF' },
    ];

    satelliteDefs.forEach((s, idx) => {
      nodes.push({
        x: s.x,
        y: s.y,
        z: s.z,
        baseX: s.x,
        baseY: s.y,
        baseZ: s.z,
        radius: 6,
        color: s.color,
        glowColor: s.color === '#02C415' ? 'rgba(2, 196, 21, 0.6)' : 'rgba(89, 139, 255, 0.6)',
        pulsePhase: idx * 1.2,
        label: s.label,
      });
    });

    // 2. Structural Edges & Flow Particles
    const edges: Edge3D[] = [];
    // Connect icosahedron vertices that are close
    for (let i = 0; i < 12; i++) {
      for (let j = i + 1; j < 12; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dz = nodes[i].baseZ - nodes[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < scale * 0.95) {
          edges.push({
            from: i,
            to: j,
            color: 'rgba(89, 139, 255, 0.22)',
            flowParticles: [
              { progress: Math.random(), speed: 0.003 + Math.random() * 0.004, size: 2 },
            ],
          });
        }
      }
    }

    // Connect satellites to nearest core nodes
    for (let s = 12; s < nodes.length; s++) {
      let nearest = 0;
      let minD = Infinity;
      for (let c = 0; c < 12; c++) {
        const dx = nodes[s].baseX - nodes[c].baseX;
        const dy = nodes[s].baseY - nodes[c].baseY;
        const dz = nodes[s].baseZ - nodes[c].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < minD) {
          minD = dist;
          nearest = c;
        }
      }
      edges.push({
        from: s,
        to: nearest,
        color: nodes[s].color === '#02C415' ? 'rgba(2, 196, 21, 0.35)' : 'rgba(89, 139, 255, 0.35)',
        flowParticles: [
          { progress: 0.1, speed: 0.005, size: 2.5 },
          { progress: 0.6, speed: 0.004, size: 2 },
        ],
      });
    }

    // 3. Orbital Rings
    const rings: Ring3D[] = [
      { radiusX: 230, radiusY: 100, tiltX: 0.45, tiltY: 0.3, color: 'rgba(89, 139, 255, 0.28)', dashOffset: 0, dashSpeed: 0.2 },
      { radiusX: 200, radiusY: 130, tiltX: -0.5, tiltY: -0.4, color: 'rgba(2, 196, 21, 0.24)', dashOffset: 0, dashSpeed: -0.25 },
      { radiusX: 250, radiusY: 70, tiltX: 0.8, tiltY: -0.2, color: 'rgba(89, 139, 255, 0.18)', dashOffset: 0, dashSpeed: 0.15 },
    ];

    // Animation state
    let angleY = 0;
    let angleX = 0;
    let time = 0;

    const render = () => {
      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!prefersReducedMotion) {
        angleY += 0.004;
        angleX = Math.sin(time * 0.002) * 0.12 + mouseRef.current.y * 0.35;
        time += 1;
      } else {
        angleY = 0.4;
        angleX = 0.2;
      }

      const currentAngleY = angleY + mouseRef.current.x * 0.55;
      const currentAngleX = angleX;

      // Clear Canvas
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 420;

      // Draw subtle ambient background glow
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width * 0.45);
      radialGlow.addColorStop(0, 'rgba(89, 139, 255, 0.08)');
      radialGlow.addColorStop(0.5, 'rgba(2, 196, 21, 0.04)');
      radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Pre-calculate 3D rotations for nodes
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);

      const projectedNodes = nodes.map((node, i) => {
        // Floating harmonic breathing
        const floatY = Math.sin(time * 0.03 + node.pulsePhase) * 4;

        // Rotation around Y axis
        const x1 = node.baseX * cosY - node.baseZ * sinY;
        const z1 = node.baseZ * cosY + node.baseX * sinY;

        // Rotation around X axis
        const y2 = (node.baseY + floatY) * cosX - z1 * sinX;
        const z2 = z1 * cosX + (node.baseY + floatY) * sinX;

        // Perspective projection
        const scaleFactor = fov / (fov + z2 + 180);
        const screenX = centerX + x1 * scaleFactor;
        const screenY = centerY + y2 * scaleFactor;

        return {
          screenX,
          screenY,
          z: z2,
          scale: scaleFactor,
          raw: node,
          pulse: Math.sin(time * 0.05 + node.pulsePhase) * 0.5 + 0.5,
        };
      });

      // Draw Orbital Rings (behind and through)
      rings.forEach((ring) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentAngleY * 0.3 + ring.tiltY);
        ctx.scale(1, Math.cos(ring.tiltX + currentAngleX));
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ring.dashOffset += ring.dashSpeed;
        ctx.lineDashOffset = ring.dashOffset;
        ctx.stroke();
        ctx.restore();
      });

      // Draw Edges with Flow Particles
      edges.forEach((edge) => {
        const from = projectedNodes[edge.from];
        const to = projectedNodes[edge.to];

        const avgZ = (from.z + to.z) / 2;
        const edgeOpacity = Math.max(0.08, Math.min(0.45, (avgZ + 180) / 360));

        // Draw connecting line
        ctx.beginPath();
        ctx.moveTo(from.screenX, from.screenY);
        ctx.lineTo(to.screenX, to.screenY);
        ctx.strokeStyle = edge.color.replace(/[\d.]+\)$/, `${edgeOpacity})`);
        ctx.lineWidth = 1 * Math.min(from.scale, to.scale);
        ctx.stroke();

        // Draw Flow Particles moving between nodes
        if (!prefersReducedMotion) {
          edge.flowParticles.forEach((p) => {
            p.progress = (p.progress + p.speed) % 1;
            const px = from.screenX + (to.screenX - from.screenX) * p.progress;
            const py = from.screenY + (to.screenY - from.screenY) * p.progress;
            const pScale = from.scale + (to.scale - from.scale) * p.progress;

            ctx.beginPath();
            ctx.arc(px, py, p.size * pScale, 0, Math.PI * 2);
            ctx.fillStyle = edge.color.includes('2, 196') ? '#02C415' : '#598BFF';
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          });
        }
      });

      // Sort nodes back-to-front for proper depth occlusion
      const sortedIndices = projectedNodes
        .map((n, idx) => ({ idx, z: n.z }))
        .sort((a, b) => a.z - b.z);

      // Render Nodes & Halos
      sortedIndices.forEach(({ idx }) => {
        const pNode = projectedNodes[idx];
        const { raw, screenX, screenY, scale, pulse } = pNode;

        const dynamicRadius = raw.radius * scale;

        // Ambient outer node halo
        const haloGrad = ctx.createRadialGradient(
          screenX, screenY, 0,
          screenX, screenY, dynamicRadius * (3.5 + pulse * 1.5)
        );
        haloGrad.addColorStop(0, raw.glowColor);
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(screenX, screenY, dynamicRadius * (3.5 + pulse * 1.5), 0, Math.PI * 2);
        ctx.fill();

        // Solid node core
        ctx.beginPath();
        ctx.arc(screenX, screenY, dynamicRadius, 0, Math.PI * 2);
        ctx.fillStyle = raw.color;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1 * scale;
        ctx.stroke();

        // Render label for satellite capability nodes if in front (z > -60)
        if (raw.label && pNode.z > -60) {
          ctx.font = `600 ${Math.max(10, Math.round(11 * scale))}px "JetBrains Mono", monospace`;
          ctx.fillStyle = '#111827';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          // Micro badge behind label for legibility
          const labelY = screenY - dynamicRadius - 7;
          const textMetrics = ctx.measureText(raw.label);
          const padX = 6;
          const padY = 3;

          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.roundRect(
            screenX - textMetrics.width / 2 - padX,
            labelY - 12 - padY,
            textMetrics.width + padX * 2,
            16 + padY,
            4
          );
          ctx.fill();
          ctx.strokeStyle = 'rgba(229, 231, 235, 0.8)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#111827';
          ctx.fillText(raw.label, screenX, labelY);
        }
      });

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(420px, 48vw, 560px)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 50%, #F3F4F6 100%)',
        border: '1px solid rgba(229, 231, 235, 0.8)',
        boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'grab',
        }}
        aria-label="Interactive 3D constellation of SOLVIXBIT digital engineering ecosystem"
        role="img"
      />

      {/* Floating System Telemetry Badge (Top Left) */}
      <div
        className="sb-float-1 sb-glass"
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          padding: '8px 14px',
          borderRadius: '999px',
          fontSize: '0.72rem',
          fontWeight: 600,
          fontFamily: 'var(--font-family-mono)',
          color: '#111827',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          zIndex: 10,
        }}
      >
        <span
          style={{
            position: 'relative',
            display: 'inline-flex',
            width: '8px',
            height: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="sb-radar-ping"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: 'var(--color-secondary-green)',
            }}
          />
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-secondary-green)',
            }}
          />
        </span>
        <span>CONNECTED ARCHITECTURE // LIVE</span>
      </div>

      {/* Floating Metrics Badge (Bottom Right) */}
      <div
        className="sb-float-2 sb-glass"
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          padding: '10px 16px',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 24px -6px rgba(0, 0, 0, 0.08)',
          zIndex: 10,
          maxWidth: '240px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-primary-blue)', fontWeight: 700 }}>
            SOLVIXBIT STUDIO
          </span>
          <span style={{ fontSize: '0.68rem', color: '#6B7280' }}>v2.4</span>
        </div>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#000000', lineHeight: 1.25 }}>
          Engineering Ideas Into Scalable Reality
        </div>
      </div>
    </div>
  );
};
