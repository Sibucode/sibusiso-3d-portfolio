import { useRef } from 'react';
import { Float, Html, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

export type PortfolioGameStage = 'title' | 'treasure' | 'opening' | 'loading';

function TreasureChest({ stage, reducedMotion }: { stage: PortfolioGameStage; reducedMotion: boolean }) {
  const chestRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const artifactRef = useRef<THREE.Group>(null);
  const openingElapsedRef = useRef(0);
  const isRevealed = stage !== 'title';
  const isOpening = stage === 'opening' || stage === 'loading';

  useFrame((_, delta) => {
    openingElapsedRef.current = isOpening ? openingElapsedRef.current + delta : 0;
    const popProgress = reducedMotion
      ? Number(isOpening)
      : THREE.MathUtils.smoothstep(openingElapsedRef.current, 1.45, 2.2);
    const lidProgress = reducedMotion
      ? Number(isOpening)
      : THREE.MathUtils.smoothstep(openingElapsedRef.current, 0.12, 0.95);
    const artifactProgress = reducedMotion
      ? Number(isOpening)
      : THREE.MathUtils.smoothstep(openingElapsedRef.current, 0.92, 1.42);

    if (chestRef.current) {
      chestRef.current.position.y = -0.82 + popProgress * 0.85;
      chestRef.current.scale.setScalar(1 + popProgress * 0.12);
    }

    if (lidRef.current) {
      lidRef.current.rotation.x = reducedMotion
        ? -1.12 * lidProgress
        : THREE.MathUtils.damp(lidRef.current.rotation.x, -1.12 * lidProgress, 4, delta);
    }

    if (artifactRef.current) {
      artifactRef.current.position.y = 0.42 + artifactProgress * 1.12;
      artifactRef.current.scale.setScalar(Math.max(0.001, artifactProgress));
      if (!reducedMotion) artifactRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={chestRef} position={[1.1, -0.82, 0.5]}>
      <pointLight
        position={[0, 1.8, 1.2]}
        color="#fbbf24"
        intensity={isRevealed ? 7 : 3.8}
        distance={8}
      />
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.65, 1.08, 1.5]} />
        <meshStandardMaterial color="#72501e" metalness={0.3} roughness={0.48} />
      </mesh>
      <mesh position={[0, -0.42, 0]} castShadow>
        <boxGeometry args={[2.78, 0.16, 1.6]} />
        <meshStandardMaterial color="#d49a22" emissive="#6b4c08" emissiveIntensity={0.24} metalness={0.65} roughness={0.28} />
      </mesh>
      <mesh position={[-0.88, 0, 0.76]}>
        <boxGeometry args={[0.11, 0.92, 0.04]} />
        <meshStandardMaterial color="#facc15" emissive="#6b4c08" emissiveIntensity={0.24} metalness={0.72} roughness={0.2} />
      </mesh>
      <mesh position={[0.88, 0, 0.76]}>
        <boxGeometry args={[0.11, 0.92, 0.04]} />
        <meshStandardMaterial color="#facc15" emissive="#6b4c08" emissiveIntensity={0.24} metalness={0.72} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.42, 0.78]}>
        <boxGeometry args={[2.7, 0.11, 0.05]} />
        <meshStandardMaterial color="#facc15" emissive="#6b4c08" emissiveIntensity={0.24} metalness={0.72} roughness={0.2} />
      </mesh>

      <group ref={lidRef} position={[0, 0.5, -0.64]}>
        <mesh position={[0, 0.28, 0.64]} castShadow>
          <boxGeometry args={[2.72, 0.62, 1.42]} />
          <meshStandardMaterial color="#876129" metalness={0.32} roughness={0.44} />
        </mesh>
        <mesh position={[0, 0.28, 1.36]}>
          <boxGeometry args={[2.68, 0.12, 0.04]} />
          <meshStandardMaterial color="#facc15" emissive="#6b4c08" emissiveIntensity={0.24} metalness={0.72} roughness={0.2} />
        </mesh>
      </group>

      {isOpening && (
        <group ref={artifactRef} position={[0, 0.42, 0.05]} scale={0.001}>
          <Float speed={reducedMotion ? 0 : 1.8} floatIntensity={reducedMotion ? 0 : 0.08}>
            <group>
              <mesh>
                <boxGeometry args={[1.12, 0.72, 0.13]} />
                <meshStandardMaterial
                  color="#10200c"
                  emissive="#65a30d"
                  emissiveIntensity={0.9}
                  metalness={0.72}
                  roughness={0.18}
                />
              </mesh>
              <mesh position={[0, -0.32, 0.02]}>
                <boxGeometry args={[1.18, 0.045, 0.16]} />
                <meshStandardMaterial color="#d9f99d" emissive="#84cc16" emissiveIntensity={1.4} />
              </mesh>
              <mesh position={[0, 0.19, 0.08]}>
                <octahedronGeometry args={[0.1, 0]} />
                <meshStandardMaterial color="#facc15" emissive="#ca8a04" emissiveIntensity={1.8} />
              </mesh>
              <mesh position={[-0.34, 0.05, 0.082]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshBasicMaterial color="#d9f99d" />
              </mesh>
              <mesh position={[0.34, 0.05, 0.082]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshBasicMaterial color="#d9f99d" />
              </mesh>
              <mesh rotation={[0.3, 0.5, 0]}>
                <torusGeometry args={[0.78, 0.012, 8, 48]} />
                <meshStandardMaterial color="#bef264" emissive="#84cc16" emissiveIntensity={1.2} />
              </mesh>
              <Html position={[0, -0.02, 0.1]} center transform distanceFactor={6}>
                <div className="game-artifact-label">
                  <span>&lt;/&gt;</span>
                  <div>
                    <strong>PORTFOLIO</strong>
                    <small>WORK // STORY // SKILLS</small>
                  </div>
                </div>
              </Html>
            </group>
          </Float>
        </group>
      )}
    </group>
  );
}

function GuideDrone({ reducedMotion }: { reducedMotion: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current && !reducedMotion) ringRef.current.rotation.z += delta * 0.45;
  });

  return (
    <Float
      position={[3.2, 1.55, 0]}
      speed={reducedMotion ? 0 : 1.6}
      rotationIntensity={reducedMotion ? 0 : 0.12}
      floatIntensity={reducedMotion ? 0 : 0.35}
    >
      <group>
        <mesh>
          <sphereGeometry args={[0.34, 24, 24]} />
          <meshStandardMaterial
            color="#19351d"
            emissive="#65a30d"
            emissiveIntensity={0.55}
            metalness={0.72}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={ringRef} rotation={[0.8, 0.4, 0]}>
          <torusGeometry args={[0.48, 0.016, 8, 40]} />
          <meshStandardMaterial color="#bef264" emissive="#84cc16" emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[-0.12, 0.04, 0.29]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#d9f99d" />
        </mesh>
        <mesh position={[0.12, 0.04, 0.29]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#d9f99d" />
        </mesh>
        <pointLight color="#84cc16" intensity={1.2} distance={2.4} />
      </group>
    </Float>
  );
}

function Room({ stage, reducedMotion }: { stage: PortfolioGameStage; reducedMotion: boolean }) {
  return (
    <>
      <color attach="background" args={['#050805']} />
      <fog attach="fog" args={['#050805', 7, 20]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[1, 6, 4]} intensity={1.5} color="#d9f99d" />
      <pointLight position={[-4, 2.8, -1]} intensity={2} color="#365314" distance={12} />
      <pointLight
        position={[2, 2.6, 2]}
        intensity={stage === 'opening' || stage === 'loading' ? 8 : stage === 'treasure' ? 3.2 : 1}
        color="#a3e635"
        distance={10}
      />

      <mesh position={[0, -1.48, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0c120c" metalness={0.38} roughness={0.7} />
      </mesh>
      <gridHelper args={[50, 50, '#3f6212', '#182715']} position={[0, -1.46, 0]} />
      <mesh position={[0, 2.4, -5]}>
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial color="#0a110a" roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-7, 2.3, -1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[13, 8]} />
        <meshStandardMaterial color="#080d08" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[7, 2.3, -1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[13, 8]} />
        <meshStandardMaterial color="#080d08" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      <TreasureChest stage={stage} reducedMotion={reducedMotion} />
      {stage !== 'title' && <GuideDrone reducedMotion={reducedMotion} />}
      <Sparkles
        count={reducedMotion ? 24 : 70}
        position={[0, 0.6, 0]}
        scale={[8, 5, 7]}
        size={2}
        speed={reducedMotion ? 0 : 0.25}
        color={stage === 'title' ? '#84cc16' : '#d9f99d'}
      />
    </>
  );
}

export default function PortfolioGameScene({ stage }: { stage: PortfolioGameStage }) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <Canvas
      camera={{ position: [0, 2.1, 9.5], fov: 47 }}
      dpr={[1, 1.25]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}
    >
      <Room stage={stage} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
