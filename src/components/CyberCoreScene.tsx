import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
  Torus,
} from '@react-three/drei';
import * as THREE from 'three';
import type { ProjectTheme } from '../data/portfolioData';

interface SceneProps {
  activeTheme: ProjectTheme;
  prefersReducedMotion?: boolean;
  isBackground?: boolean;
}

function ResponsiveCameraFraming({ cameraPos }: { cameraPos: ProjectTheme['cameraPos'] }) {
  const { size } = useThree();
  const aspectRatio = Math.min(size.width / size.height, 1);
  const cameraDistance = Math.hypot(...cameraPos);
  const framingRadius = 2.75;
  const fov = THREE.MathUtils.radToDeg(
    2 * Math.atan(framingRadius / (cameraDistance * aspectRatio))
  );

  return <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={fov} />;
}

function MorphingCore({
  activeTheme,
  prefersReducedMotion = false,
  isBackground = false,
}: SceneProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const ringMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const { camera } = useThree();
  const targetColor = new THREE.Color(activeTheme.primaryColor);
  const targetEmissive = new THREE.Color(activeTheme.emissiveColor);
  const targetRingColor = new THREE.Color(activeTheme.ringColor);
  const targetCamPos = new THREE.Vector3(...activeTheme.cameraPos);

  useFrame((state, delta) => {
    if (prefersReducedMotion) {
      camera.position.copy(targetCamPos);
      camera.lookAt(0, 0, 0);

      if (materialRef.current) {
        materialRef.current.color.copy(targetColor);
        materialRef.current.emissive.copy(targetEmissive);
        materialRef.current.distort = activeTheme.distort;
      }

      if (ringMatRef.current) {
        ringMatRef.current.color.copy(targetRingColor);
        ringMatRef.current.emissive.copy(targetRingColor);
      }

      return;
    }

    const t = state.clock.getElapsedTime();
    const lerpSpeed = Math.min(delta * 4, 1);

    // 1. Smoothly glide camera to the project's angle
    camera.position.lerp(targetCamPos, lerpSpeed * 0.7);
    camera.lookAt(0, 0, 0);

    // 2. Smoothly transition colors & distortion
    if (materialRef.current) {
      materialRef.current.color.lerp(targetColor, lerpSpeed);
      materialRef.current.emissive.lerp(targetEmissive, lerpSpeed);
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        activeTheme.distort,
        lerpSpeed
      );
    }

    if (ringMatRef.current) {
      ringMatRef.current.color.lerp(targetRingColor, lerpSpeed);
      ringMatRef.current.emissive.lerp(targetRingColor, lerpSpeed);
    }

    // 3. Dynamic rotation scaled by project speed
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25 * activeTheme.speed;
      coreRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.4 * activeTheme.speed;
      innerRef.current.rotation.z += delta * 0.2;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15 * activeTheme.speed;
      outerRingRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.25) * 0.15;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 0.3 * activeTheme.speed;
      innerRingRef.current.rotation.z = Math.PI / 4;
    }
  });

  // Switch inner core geometry depending on the selected project domain
  const renderInnerGeometry = () => {
    switch (activeTheme.id) {
      case 'transit':
        return <dodecahedronGeometry args={[0.8, 0]} />; // Multi-node transit network
      case 'campus':
        return <torusKnotGeometry args={[0.55, 0.18, 64, 16]} />; // Connected student hub
      case 'medical':
      case 'pharmacy':
        return <boxGeometry args={[1.05, 1.05, 1.05]} />; // Structured clinical database
      default:
        return <octahedronGeometry args={[0.75, 0]} />; // Default systems core
    }
  };

  return (
    <group>
      <mesh scale={1.85}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color={activeTheme.primaryColor}
          transparent
          opacity={0.075}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <Float
        speed={prefersReducedMotion ? 0 : 2}
        rotationIntensity={prefersReducedMotion ? 0 : 0.5}
        floatIntensity={prefersReducedMotion ? 0 : 1.1}
      >
        {/* Outer Wireframe Mesh */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.4, 1]} />
          <MeshDistortMaterial
            ref={materialRef}
            color={activeTheme.primaryColor}
            emissive={activeTheme.emissiveColor}
            emissiveIntensity={0.45}
            roughness={0.2}
            metalness={0.8}
            distort={activeTheme.distort}
            speed={activeTheme.speed}
            wireframe
          />
        </mesh>

        <mesh scale={1.52}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial
            color={activeTheme.primaryColor}
            transparent
            opacity={0.035}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Morphing Inner Core */}
        <mesh ref={innerRef}>
          {renderInnerGeometry()}
          <meshStandardMaterial
            color={activeTheme.primaryColor}
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
      </Float>

      {/* Primary Orbital Ring */}
      <Torus ref={outerRingRef} args={[2.35, 0.022, 16, 100]}>
        <meshStandardMaterial
          ref={ringMatRef}
          color={activeTheme.ringColor}
          emissive={activeTheme.ringColor}
          emissiveIntensity={0.55}
        />
      </Torus>

      {/* Secondary Orbital Ring */}
      <Torus ref={innerRingRef} args={[1.9, 0.014, 16, 100]}>
        <meshStandardMaterial
          color={activeTheme.primaryColor}
          emissive={activeTheme.emissiveColor}
          emissiveIntensity={0.4}
        />
      </Torus>
      <Sparkles
        count={isBackground ? 56 : 90}
        scale={6}
        size={1.8}
        speed={prefersReducedMotion ? 0 : 0.4}
        color={activeTheme.primaryColor}
      />
    </group>
  );
}

export default function CyberCoreScene({
  activeTheme,
  isBackground = false,
}: SceneProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const sceneClassName = isBackground
    ? 'scene-background'
    : 'relative isolate h-[420px] w-full cursor-grab overflow-hidden rounded-[2rem] border border-sky-500/10 bg-[radial-gradient(ellipse_at_center,rgba(20,50,12,0.34),rgba(9,11,9,0.05)_58%,transparent_78%)] active:cursor-grabbing lg:h-[580px]';

  return (
    <div aria-hidden={isBackground} className={sceneClassName}>
      {!isBackground && (
        <>
          <div className="pointer-events-none absolute inset-6 rounded-[1.5rem] border border-white/[0.04]" />
          <div className="pointer-events-none absolute left-7 top-7 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] motion-reduce:animate-none" />
            Interactive system model
          </div>
          <div className="pointer-events-none absolute right-7 top-7 z-10 font-mono text-[10px] tracking-[0.18em] text-slate-600">
            3D / LIVE
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl" />
        </>
      )}
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60 }}
        dpr={isBackground ? 1 : [1, 1.5]}
        frameloop={prefersReducedMotion ? 'demand' : 'always'}
      >
        <ResponsiveCameraFraming cameraPos={activeTheme.cameraPos} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={1.2} color={activeTheme.primaryColor} />
        <pointLight position={[0, 0, 2.4]} intensity={2.8} distance={6} color={activeTheme.primaryColor} />
        <MorphingCore
          activeTheme={activeTheme}
          prefersReducedMotion={prefersReducedMotion}
          isBackground={isBackground}
        />
        <OrbitControls
          enabled={!isBackground}
          enableZoom={false}
          enablePan={false}
          enableDamping={!prefersReducedMotion && !isBackground}
          autoRotate={!prefersReducedMotion}
          autoRotateSpeed={0.45}
        />
      </Canvas>

      {!isBackground && (
        <div className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-slate-700/70 bg-slate-950/75 px-4 py-1.5 text-center text-[10px] font-mono tracking-wider text-slate-300 backdrop-blur-md sm:text-xs">
          NODE_STATE: <span className="uppercase text-sky-400">{activeTheme.id}</span> // DRAG TO ORBIT
        </div>
      )}
    </div>
  );
}