'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { checkPrefersReducedMotion } from '../../lib/animation/gsap';

/**
 * Creates a smooth rounded-corner THREE.Shape from a list of 2D vertices.
 */
function createRoundedPolygonShape(points: [number, number][], radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const len = points.length;

  for (let i = 0; i < len; i++) {
    const prev = points[(i - 1 + len) % len];
    const curr = points[i];
    const next = points[(i + 1) % len];

    const v1x = prev[0] - curr[0];
    const v1y = prev[1] - curr[1];
    const v2x = next[0] - curr[0];
    const v2y = next[1] - curr[1];

    const len1 = Math.hypot(v1x, v1y) || 1;
    const len2 = Math.hypot(v2x, v2y) || 1;

    const r = Math.min(radius, len1 * 0.42, len2 * 0.42);

    const p1x = curr[0] + (v1x / len1) * r;
    const p1y = curr[1] + (v1y / len1) * r;
    const p2x = curr[0] + (v2x / len2) * r;
    const p2y = curr[1] + (v2y / len2) * r;

    if (i === 0) {
      shape.moveTo(p1x, p1y);
    } else {
      shape.lineTo(p1x, p1y);
    }
    shape.quadraticCurveTo(curr[0], curr[1], p2x, p2y);
  }

  shape.closePath();
  return shape;
}

function createRadialGlowTexture(innerColor: string, midColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    grad.addColorStop(0, innerColor);
    grad.addColorStop(0.35, midColor);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export const HeroSculpture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const interactionRef = useRef({
    targetX: 0,
    targetY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    rotX: 0.08,
    rotY: -0.22,
    targetRotX: 0.08,
    targetRotY: -0.22,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    const prefersReduced = checkPrefersReducedMotion();
    let width = container.clientWidth || 520;
    let height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Studio environment map for crisp glass/acrylic specular reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.35);
    scene.add(ambientLight);

    const topRimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    topRimLight.position.set(2, 8, 6);
    scene.add(topRimLight);

    const blueKeyLight = new THREE.DirectionalLight(0x598bff, 3.6);
    blueKeyLight.position.set(-7, 4, 5);
    scene.add(blueKeyLight);

    const greenFillLight = new THREE.DirectionalLight(0x02c415, 3.0);
    greenFillLight.position.set(7, -3, 5);
    scene.add(greenFillLight);

    const cursorLight = new THREE.PointLight(0xffffff, 4.5, 16);
    cursorLight.position.set(0, 0, 5.5);
    scene.add(cursorLight);

    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.34,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.11,
      bevelThickness: 0.13,
      curveSegments: 16,
    };

    // 1. Left Chevron "<" — Electric Blue Glossy Glass
    const leftChevronPoints: [number, number][] = [
      [0.62, 1.15],
      [-0.78, 0.22],
      [-0.78, -0.22],
      [0.62, -1.15],
      [0.92, -0.74],
      [-0.14, 0.0],
      [0.92, 0.74],
    ];
    const leftShape = createRoundedPolygonShape(leftChevronPoints, 0.14);
    const leftGeo = new THREE.ExtrudeGeometry(leftShape, extrudeSettings);
    leftGeo.center();

    const blueGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b57ff,
      emissive: 0x041e66,
      emissiveIntensity: 0.32,
      roughness: 0.07,
      metalness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      ior: 1.54,
      reflectivity: 0.95,
      envMapIntensity: 0.95,
    });
    const leftMesh = new THREE.Mesh(leftGeo, blueGlassMat);
    leftMesh.position.set(-1.38, 0.08, 0.1);
    leftMesh.rotation.y = 0.12;
    sculptureGroup.add(leftMesh);

    // 2. Center Slash "/" — Frosted Pearl White / Ice
    const slashPoints: [number, number][] = [
      [0.24, 1.38],
      [-0.58, -1.32],
      [-0.16, -1.42],
      [0.66, 1.28],
    ];
    const slashShape = createRoundedPolygonShape(slashPoints, 0.12);
    const slashGeo = new THREE.ExtrudeGeometry(slashShape, extrudeSettings);
    slashGeo.center();

    const whiteGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xeef4ff,
      emissive: 0x94b8ff,
      emissiveIntensity: 0.2,
      roughness: 0.12,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      ior: 1.48,
      reflectivity: 0.9,
      envMapIntensity: 1.35,
    });
    const slashMesh = new THREE.Mesh(slashGeo, whiteGlassMat);
    slashMesh.position.set(0.02, -0.02, 0.22);
    sculptureGroup.add(slashMesh);

    // 3. Right Chevron ">" — Emerald Green Glossy Glass
    const rightChevronPoints: [number, number][] = [
      [-0.62, 1.15],
      [-0.92, 0.74],
      [0.14, 0.0],
      [-0.92, -0.74],
      [-0.62, -1.15],
      [0.78, -0.22],
      [0.78, 0.22],
    ];
    const rightShape = createRoundedPolygonShape(rightChevronPoints, 0.14);
    const rightGeo = new THREE.ExtrudeGeometry(rightShape, extrudeSettings);
    rightGeo.center();

    const greenGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00b814,
      emissive: 0x004d0a,
      emissiveIntensity: 0.3,
      roughness: 0.07,
      metalness: 0.24,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      ior: 1.54,
      reflectivity: 0.95,
      envMapIntensity: 0.95,
    });
    const rightMesh = new THREE.Mesh(rightGeo, greenGlassMat);
    rightMesh.position.set(1.42, -0.08, -0.05);
    rightMesh.rotation.y = -0.14;
    sculptureGroup.add(rightMesh);

    // 4. Floating Orbs (Bottom-Left Green & Top-Right Blue)
    const greenGlowTex = createRadialGlowTexture('rgba(2, 224, 32, 0.65)', 'rgba(2, 196, 21, 0.18)');
    const blueGlowTex = createRadialGlowTexture('rgba(89, 139, 255, 0.65)', 'rgba(22, 104, 255, 0.18)');

    const greenOrbGeo = new THREE.SphereGeometry(0.45, 48, 48);
    const greenOrbGroup = new THREE.Group();
    greenOrbGroup.position.set(-1.12, -1.45, 0.38);
    const greenOrbMesh = new THREE.Mesh(greenOrbGeo, greenGlassMat);
    greenOrbGroup.add(greenOrbMesh);

    const greenHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: greenGlowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    greenHalo.scale.set(2.1, 2.1, 1);
    greenOrbGroup.add(greenHalo);
    sculptureGroup.add(greenOrbGroup);

    const blueOrbGeo = new THREE.SphereGeometry(0.43, 48, 48);
    const blueOrbGroup = new THREE.Group();
    blueOrbGroup.position.set(1.92, 1.55, 0.2);
    const blueOrbMesh = new THREE.Mesh(blueOrbGeo, blueGlassMat);
    blueOrbGroup.add(blueOrbMesh);

    const blueHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: blueGlowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    blueHalo.scale.set(2.1, 2.1, 1);
    blueOrbGroup.add(blueHalo);
    sculptureGroup.add(blueOrbGroup);

    // Pointer Interactions
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      interactionRef.current.targetX = nx;
      interactionRef.current.targetY = ny;

      if (interactionRef.current.isDragging) {
        const dx = e.clientX - interactionRef.current.dragStartX;
        const dy = e.clientY - interactionRef.current.dragStartY;
        interactionRef.current.targetRotY += dx * 0.0065;
        interactionRef.current.targetRotX += dy * 0.0065;
        interactionRef.current.dragStartX = e.clientX;
        interactionRef.current.dragStartY = e.clientY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      interactionRef.current.isDragging = true;
      interactionRef.current.dragStartX = e.clientX;
      interactionRef.current.dragStartY = e.clientY;
      setIsDragging(true);
    };

    const handlePointerUp = () => {
      interactionRef.current.isDragging = false;
      setIsDragging(false);
    };

    const handlePointerLeave = () => {
      interactionRef.current.isDragging = false;
      interactionRef.current.targetX = 0;
      interactionRef.current.targetY = 0;
      setIsDragging(false);
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 520;
      height = container.clientHeight || 460;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const state = interactionRef.current;

      // Gently spring back to hero pose when not dragging
      if (!state.isDragging) {
        const baseRotY = -0.22 + state.targetX * 0.24;
        const baseRotX = 0.08 - state.targetY * 0.16;
        state.targetRotY += (baseRotY - state.targetRotY) * 0.04;
        state.targetRotX += (baseRotX - state.targetRotX) * 0.04;
      }

      state.rotY += (state.targetRotY - state.rotY) * 0.08;
      state.rotX += (state.targetRotX - state.rotX) * 0.08;

      sculptureGroup.rotation.y = state.rotY;
      sculptureGroup.rotation.x = state.rotX;

      if (!prefersReduced) {
        sculptureGroup.position.y = Math.sin(t * 1.15) * 0.1;
        leftMesh.position.y = 0.08 + Math.sin(t * 1.4 + 0.4) * 0.05;
        slashMesh.position.y = -0.02 + Math.sin(t * 1.4 + 1.2) * 0.04;
        rightMesh.position.y = -0.08 + Math.sin(t * 1.4 + 2.0) * 0.05;

        greenOrbGroup.position.y = -1.45 + Math.sin(t * 1.6 + 0.6) * 0.12;
        blueOrbGroup.position.y = 1.55 + Math.cos(t * 1.5 + 0.3) * 0.12;
      }

      cursorLight.position.x = state.targetX * 4.5;
      cursorLight.position.y = state.targetY * 3.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);

      leftGeo.dispose();
      slashGeo.dispose();
      rightGeo.dispose();
      greenOrbGeo.dispose();
      blueOrbGeo.dispose();
      blueGlassMat.dispose();
      whiteGlassMat.dispose();
      greenGlassMat.dispose();
      greenGlowTex.dispose();
      blueGlowTex.dispose();
      envTarget.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(360px, 46vw, 520px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      {/* Subtle ambient radial glow behind the 3D emblem */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '8%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 38% 55%, rgba(22, 104, 255, 0.24) 0%, rgba(2, 196, 21, 0.14) 55%, transparent 75%)',
          filter: 'blur(42px)',
          pointerEvents: 'none',
        }}
      />

      {webGLSupported ? (
        <canvas
          ref={canvasRef}
          aria-label="Interactive 3D glossy code emblem"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y',
          }}
        />
      ) : (
        /* Crisp SVG Fallback if WebGL is unavailable */
        <svg
          viewBox="0 0 420 340"
          role="img"
          aria-label="3D code emblem"
          style={{ width: '88%', maxWidth: '420px', height: 'auto' }}
        >
          <defs>
            <linearGradient id="sbFallbackBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#1668FF" />
            </linearGradient>
            <linearGradient id="sbFallbackGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#02C415" />
            </linearGradient>
            <linearGradient id="sbFallbackWhite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
          <path
            d="M150 90 L65 160 L150 230 L172 204 L118 160 L172 116 Z"
            fill="url(#sbFallbackBlue)"
          />
          <path d="M225 65 L175 255 L205 262 L255 72 Z" fill="url(#sbFallbackWhite)" />
          <path
            d="M270 90 L355 160 L270 230 L248 204 L302 160 L248 116 Z"
            fill="url(#sbFallbackGreen)"
          />
          <circle cx="120" cy="275" r="26" fill="url(#sbFallbackGreen)" />
          <circle cx="330" cy="70" r="25" fill="url(#sbFallbackBlue)" />
        </svg>
      )}
    </div>
  );
};
