'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { checkPrefersReducedMotion } from '../../lib/animation/gsap';

interface CapabilityBeacon {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  color: number;
}

const CAPABILITY_BEACONS: CapabilityBeacon[] = [
  { id: 'cloud', name: 'Distributed Cloud Mesh', category: 'INFRASTRUCTURE', position: [2.9, 1.4, 1.2], color: 0x598bff },
  { id: 'ai', name: 'Agentic AI & Neural Logic', category: 'INTELLIGENCE', position: [-2.8, 1.6, -1.0], color: 0x02c415 },
  { id: 'commerce', name: 'Headless Global Scale', category: 'COMMERCE', position: [1.2, 2.8, -1.6], color: 0x598bff },
  { id: 'saas', name: 'Scalable SaaS Core', category: 'PLATFORMS', position: [-1.4, -2.8, 1.4], color: 0x02c415 },
  { id: 'security', name: 'Zero-Trust Architecture', category: 'RESILIENCE', position: [2.5, -1.8, -1.6], color: 0x598bff },
];

export const HeroSculpture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredBeacon, setHoveredBeacon] = useState<CapabilityBeacon | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Interaction Physics State
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    rotX: 0.25,
    rotY: 0.45,
    targetRotX: 0.25,
    targetRotY: 0.45,
    velX: 0,
    velY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability
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

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 10.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 2. Sophisticated Studio Lighting for Crisp Light Background
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Primary Brand Blue Key Light
    const keyLightBlue = new THREE.DirectionalLight(0x598bff, 4.2);
    keyLightBlue.position.set(7, 10, 8);
    scene.add(keyLightBlue);

    // Secondary Emerald Green Fill Light
    const fillLightGreen = new THREE.DirectionalLight(0x02c415, 3.2);
    fillLightGreen.position.set(-8, -6, 6);
    scene.add(fillLightGreen);

    // Warm Crisp Top Rim Light
    const rimLightWhite = new THREE.DirectionalLight(0xffffff, 2.5);
    rimLightWhite.position.set(0, 12, -4);
    scene.add(rimLightWhite);

    // Interactive Dynamic Specular Point Light that tracks the cursor
    const cursorLight = new THREE.PointLight(0x598bff, 3.5, 18);
    cursorLight.position.set(0, 0, 6);
    scene.add(cursorLight);

    // 3. Main Rotating Kinetic Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Helper: Dynamic Luminous Glow Particle Texture
    const createGlowTexture = () => {
      const gCanvas = document.createElement('canvas');
      gCanvas.width = 64;
      gCanvas.height = 64;
      const ctx = gCanvas.getContext('2d');
      if (ctx) {
        const rad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        rad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        rad.addColorStop(0.3, 'rgba(89, 139, 255, 0.85)');
        rad.addColorStop(0.7, 'rgba(2, 196, 21, 0.2)');
        rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, 64, 64);
      }
      const tex = new THREE.CanvasTexture(gCanvas);
      tex.needsUpdate = true;
      return tex;
    };
    const glowTexture = createGlowTexture();

    // --- A. Masterpiece Kinetic Torus Knot Core (Midnight Titanium & Chrome) ---
    // Smooth geometric curvature that creates hypnotic light glints
    const knotGeo = new THREE.TorusKnotGeometry(1.75, 0.42, 180, 32, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x141e36, // Deep midnight titanium
      emissive: 0x091224,
      roughness: 0.16,
      metalness: 0.92,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    sculptureGroup.add(knotMesh);

    // Fine Blueprint Wireframe Cage overlaying the Torus Knot
    const knotWireGeo = new THREE.WireframeGeometry(knotGeo);
    const knotWireMat = new THREE.LineBasicMaterial({
      color: 0x598bff,
      transparent: true,
      opacity: 0.35,
    });
    const knotWireframe = new THREE.LineSegments(knotWireGeo, knotWireMat);
    sculptureGroup.add(knotWireframe);

    // --- B. Central Floating Radiant Nucleus (Emerald & Blue Core) ---
    const nucleusGroup = new THREE.Group();
    sculptureGroup.add(nucleusGroup);

    const nucleusGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x02c415,
      emissive: 0x02c415,
      emissiveIntensity: 0.75,
      roughness: 0.2,
      metalness: 0.6,
      wireframe: true,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    nucleusGroup.add(nucleusMesh);

    // Inner glowing sphere
    const innerSphereGeo = new THREE.SphereGeometry(0.55, 24, 24);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x598bff,
      transparent: true,
      opacity: 0.85,
    });
    const innerSphereMesh = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    nucleusGroup.add(innerSphereMesh);

    // --- C. Interlocking Precision Gyro Gimbal Rings ---
    const ringsGroup = new THREE.Group();
    sculptureGroup.add(ringsGroup);

    interface GyroRing {
      mesh: THREE.Line;
      speedX: number;
      speedY: number;
      speedZ: number;
    }

    const ringDefs = [
      { radius: 2.7, tiltX: 0.4, tiltY: 0.2, color: 0x598bff, sx: 0.002, sy: 0.003, sz: 0.001 },
      { radius: 3.1, tiltX: -0.5, tiltY: 0.6, color: 0x02c415, sx: -0.002, sy: -0.002, sz: 0.003 },
      { radius: 3.5, tiltX: 0.7, tiltY: -0.3, color: 0x598bff, sx: 0.001, sy: 0.002, sz: -0.002 },
    ];

    const gyroRings: GyroRing[] = ringDefs.map((def) => {
      const curve = new THREE.EllipseCurve(0, 0, def.radius, def.radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(120);
      const rGeo = new THREE.BufferGeometry().setFromPoints(points);
      const rMat = new THREE.LineBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.4,
      });
      const rLine = new THREE.Line(rGeo, rMat);
      rLine.rotation.set(def.tiltX, def.tiltY, 0);
      ringsGroup.add(rLine);
      return { mesh: rLine, speedX: def.sx, speedY: def.sy, speedZ: def.sz };
    });

    // --- D. 5 Floating Satellite Beacons ---
    const beaconsGroup = new THREE.Group();
    sculptureGroup.add(beaconsGroup);

    interface BeaconRuntime {
      mesh: THREE.Mesh;
      halo: THREE.Line;
      conduit: THREE.Line;
      data: CapabilityBeacon;
      initialPos: THREE.Vector3;
    }

    const beaconRuntimes: BeaconRuntime[] = [];
    const bSphereGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const bHaloGeo = new THREE.BufferGeometry().setFromPoints(
      new THREE.EllipseCurve(0, 0, 0.34, 0.34, 0, 2 * Math.PI, false, 0).getPoints(48)
    );

    CAPABILITY_BEACONS.forEach((beacon) => {
      const bMat = new THREE.MeshStandardMaterial({
        color: beacon.color,
        emissive: beacon.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.5,
      });
      const bMesh = new THREE.Mesh(bSphereGeo, bMat);
      bMesh.position.set(...beacon.position);

      const hMat = new THREE.LineBasicMaterial({
        color: beacon.color,
        transparent: true,
        opacity: 0.5,
      });
      const hLine = new THREE.Line(bHaloGeo, hMat);
      hLine.position.copy(bMesh.position);
      hLine.rotation.x = Math.PI / 2;

      // Subtle laser thread connecting to center
      const conduitPoints = [bMesh.position, new THREE.Vector3(0, 0, 0)];
      const conduitGeo = new THREE.BufferGeometry().setFromPoints(conduitPoints);
      const conduitMat = new THREE.LineBasicMaterial({
        color: beacon.color,
        transparent: true,
        opacity: 0.2,
      });
      const conduitLine = new THREE.Line(conduitGeo, conduitMat);

      beaconsGroup.add(bMesh);
      beaconsGroup.add(hLine);
      sculptureGroup.add(conduitLine);

      beaconRuntimes.push({
        mesh: bMesh,
        halo: hLine,
        conduit: conduitLine,
        data: beacon,
        initialPos: new THREE.Vector3(...beacon.position),
      });
    });

    // --- E. Floating Luminous Stardust Photons (120 Particles) ---
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: { radius: number; angle: number; speed: number; y: number; ySpeed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;
      const speed = 0.003 + Math.random() * 0.006;
      const ySpeed = (Math.random() - 0.5) * 0.004;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      particleSpeeds.push({ radius, angle, speed, y, ySpeed });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: glowTexture,
      color: 0x598bff,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    sculptureGroup.add(particlePoints);

    // 4. Raycasting & Interaction Physics
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2(-1000, -1000);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseVector.x = (clientX / rect.width) * 2 - 1;
      mouseVector.y = -(clientY / rect.height) * 2 + 1;

      // Fluid magnetic tilt
      mouseRef.current.targetX = (clientX / rect.width - 0.5) * 0.55;
      mouseRef.current.targetY = (clientY / rect.height - 0.5) * 0.45;

      // Update interactive light position
      cursorLight.position.x = mouseRef.current.targetX * 12;
      cursorLight.position.y = -mouseRef.current.targetY * 12;

      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.dragStartX;
        const deltaY = e.clientY - mouseRef.current.dragStartY;
        mouseRef.current.velY = deltaX * 0.007;
        mouseRef.current.velX = deltaY * 0.007;
        mouseRef.current.targetRotY += mouseRef.current.velY;
        mouseRef.current.targetRotX += mouseRef.current.velX;
        mouseRef.current.dragStartX = e.clientX;
        mouseRef.current.dragStartY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.dragStartX = e.clientX;
      mouseRef.current.dragStartY = e.clientY;
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      mouseRef.current.isDragging = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseVector.set(-1000, -1000);
      setIsDragging(false);
      setHoveredBeacon(null);
    };

    // Mobile Touch Gestures
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        mouseRef.current.isDragging = true;
        mouseRef.current.dragStartX = e.touches[0].clientX;
        mouseRef.current.dragStartY = e.touches[0].clientY;
        setIsDragging(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (mouseRef.current.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - mouseRef.current.dragStartX;
        const deltaY = e.touches[0].clientY - mouseRef.current.dragStartY;
        mouseRef.current.targetRotY += deltaX * 0.008;
        mouseRef.current.targetRotX += deltaY * 0.008;
        mouseRef.current.dragStartX = e.touches[0].clientX;
        mouseRef.current.dragStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isDragging = false;
      setIsDragging(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    // 5. Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };
    window.addEventListener('resize', handleResize);

    // 6. Intersection & Visibility Observers
    let isVisibleOnScreen = true;
    let isTabVisible = !document.hidden;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleOnScreen = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 7. 60 FPS Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisibleOnScreen || !isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Continuous ambient rotation when not dragging
      if (!prefersReduced) {
        if (!mouseRef.current.isDragging) {
          mouseRef.current.targetRotY += 0.004;
          mouseRef.current.targetRotX += 0.0012;
        }
      }

      // Smooth inertia damping
      mouseRef.current.rotX +=
        (mouseRef.current.targetRotX + mouseRef.current.targetY - mouseRef.current.rotX) * 0.07;
      mouseRef.current.rotY +=
        (mouseRef.current.targetRotY + mouseRef.current.targetX - mouseRef.current.rotY) * 0.07;

      sculptureGroup.rotation.x = mouseRef.current.rotX;
      sculptureGroup.rotation.y = mouseRef.current.rotY;

      if (!prefersReduced) {
        // Subtle breathing scale pulse
        const pulse = 1.0 + Math.sin(elapsedTime * 1.5) * 0.03;
        knotMesh.scale.set(pulse, pulse, pulse);
        knotWireframe.scale.set(pulse, pulse, pulse);

        // Counter-rotating inner crystal
        nucleusMesh.rotation.y -= 0.015;
        nucleusMesh.rotation.x += 0.01;

        // Gyro rings orbital precession
        gyroRings.forEach((r) => {
          r.mesh.rotation.x += r.speedX;
          r.mesh.rotation.y += r.speedY;
          r.mesh.rotation.z += r.speedZ;
        });

        // Floating floating motion for satellites
        beaconRuntimes.forEach((b, i) => {
          const offset = Math.sin(elapsedTime * 1.6 + i * 1.2) * 0.12;
          b.mesh.position.y = b.initialPos.y + offset;
          b.halo.position.y = b.initialPos.y + offset;
          b.halo.rotation.z += 0.012;
        });

        // Floating stardust particles update
        const positions = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const p = particleSpeeds[i];
          p.angle += p.speed;
          p.y += p.ySpeed;
          if (p.y > 2.0 || p.y < -2.0) p.ySpeed *= -1;

          positions[i * 3] = Math.cos(p.angle) * p.radius;
          positions[i * 3 + 1] = p.y;
          positions[i * 3 + 2] = Math.sin(p.angle) * p.radius;
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      // Raycasting for Beacon Hover
      raycaster.setFromCamera(mouseVector, camera);
      const meshesToTest = beaconRuntimes.map((b) => b.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const found = beaconRuntimes.find((b) => b.mesh === hitMesh);
        if (found) {
          setHoveredBeacon(found.data);
          found.mesh.scale.set(1.4, 1.4, 1.4);
          found.halo.scale.set(1.5, 1.5, 1.5);
          (found.conduit.material as THREE.LineBasicMaterial).opacity = 0.85;
        }
      } else {
        setHoveredBeacon(null);
        beaconRuntimes.forEach((b) => {
          b.mesh.scale.set(1, 1, 1);
          b.halo.scale.set(1, 1, 1);
          (b.conduit.material as THREE.LineBasicMaterial).opacity = 0.2;
        });
      }

      renderer.render(scene, camera);
    };

    render();

    // 8. Resource Teardown & Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);

      knotGeo.dispose();
      knotMat.dispose();
      knotWireGeo.dispose();
      knotWireMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      bSphereGeo.dispose();
      bHaloGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      glowTexture.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(460px, 48vw, 600px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* Seamless Ambient Light Aura that dissolves smoothly into the hero background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '90%',
          background: 'radial-gradient(circle, rgba(89, 139, 255, 0.16) 0%, rgba(2, 196, 21, 0.07) 42%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Hardware-Accelerated WebGL Three.js Canvas */}
      {webGLSupported ? (
        <canvas
          ref={canvasRef}
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'block',
            width: '100%',
            height: '100%',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          aria-label="Interactive 3D Kinetic Sculpture representing SOLVIXBIT Connected Architecture"
          role="img"
        />
      ) : (
        /* Accessible Fallback */
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: '2px dashed #598BFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <span style={{ fontSize: '2.5rem', color: '#598BFF' }}>✦</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
            SOLVIXBIT Kinetic Architecture
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', maxWidth: '360px' }}>
            Distributed Cloud • Agentic AI • Headless Scale • Connected APIs • Zero-Trust
          </p>
        </div>
      )}

      {/* Interactive Beacon Hover Card (Appears gracefully when beacon hovered) */}
      {hoveredBeacon && (
        <div
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            zIndex: 10,
            padding: '10px 16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(89, 139, 255, 0.25)',
            boxShadow: '0 12px 32px rgba(89, 139, 255, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'sbFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: hoveredBeacon.color === 0x02c415 ? '#02C415' : '#598BFF',
            }}
          />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111827' }}>
            {hoveredBeacon.name}
          </span>
          <span style={{ fontSize: '0.66rem', fontFamily: 'var(--font-family-mono)', color: '#6B7280' }}>
            [{hoveredBeacon.category}]
          </span>
        </div>
      )}

      {/* Minimalist Apple-Style Interactive Telemetry Pill (Bottom Center) */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 18px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(229, 231, 235, 0.9)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)',
          pointerEvents: 'none',
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
        <span
          style={{
            fontSize: '0.74rem',
            fontFamily: 'var(--font-family-mono)',
            fontWeight: 700,
            color: '#111827',
            letterSpacing: '0.04em',
          }}
        >
          SOLVIXBIT // 3D KINETIC ARCHITECTURE
        </span>
        <span style={{ color: '#D1D5DB' }}>•</span>
        <span
          style={{
            fontSize: '0.74rem',
            color: '#6B7280',
            fontWeight: 500,
          }}
        >
          {isDragging ? 'Rotating...' : 'Drag to explore'}
        </span>
      </div>

      <style jsx>{`
        @keyframes sbFadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
