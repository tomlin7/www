import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { generateTerrain, getBlockColor } from '@/game/terrain';

function MenuTerrain() {
  const meshData = useMemo(() => {
    const groups = new Map<string, number[]>();
    for (let cx = -4; cx <= 4; cx++) {
      for (let cz = -4; cz <= 4; cz++) {
        const blocks = generateTerrain(cx, cz);
        blocks.forEach((b) => {
          const key = b.type;
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key)!.push(b.x, b.y, b.z);
        });
      }
    }
    return Array.from(groups.entries()).map(([type, positions]) => ({
      type,
      color: getBlockColor(type as any),
      positions,
      count: positions.length / 3,
    }));
  }, []);

  return (
    <>
      {meshData.map((group) => (
        <MenuBlocks key={group.type} color={group.color} positions={group.positions} count={group.count} />
      ))}
    </>
  );
}

function MenuBlocks({ color, positions, count }: { color: string; positions: number[]; count: number }) {
  const mesh = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.85 });
    const m = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }, [color, positions, count]);

  return <primitive object={mesh} />;
}

const LETTER_MAP: Record<string, [number, number][]> = {
  V: [[0, 4], [0, 3], [0, 2], [1, 1], [2, 0], [3, 1], [4, 2], [4, 3], [4, 4]],
  O: [[1, 4], [2, 4], [3, 4], [0, 3], [4, 3], [0, 2], [4, 2], [0, 1], [4, 1], [1, 0], [2, 0], [3, 0]],
  X: [[0, 4], [4, 4], [1, 3], [3, 3], [2, 2], [1, 1], [3, 1], [0, 0], [4, 0]],
  E: [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [0, 3], [0, 2], [1, 2], [2, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
  L: [[0, 4], [0, 3], [0, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
  S: [[1, 4], [2, 4], [3, 4], [4, 4], [0, 3], [1, 2], [2, 2], [3, 2], [4, 1], [0, 0], [1, 0], [2, 0], [3, 0]],
};

function VoxelBlock({ target, delay, color, visible }: { target: [number, number, number], delay: number, color: string, visible: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const startPos = useRef(new THREE.Vector3(target[0], target[1] + 30, target[2] + 100)); // Flying in from "behind" camera direction
  const startTime = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !visible) return;
    if (startTime.current === null) startTime.current = clock.elapsedTime + delay;

    const t = Math.max(0, (clock.elapsedTime - startTime.current) * 3.5); // Fast!
    const easedT = 1 - Math.pow(1 - Math.min(t, 1), 3); // cubic ease out

    ref.current.position.set(
      THREE.MathUtils.lerp(startPos.current.x, target[0], easedT),
      THREE.MathUtils.lerp(startPos.current.y, target[1], easedT),
      THREE.MathUtils.lerp(startPos.current.z, target[2], easedT)
    );

    ref.current.scale.setScalar(easedT > 0 ? 1 : 0);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
    </mesh>
  );
}

function FloatingTitle({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y = 30;
    groupRef.current.rotation.y = 9.5;
    groupRef.current.scale.setScalar(1); // No more animated scaling
  });

  const letters = useMemo(() => {
    const chars = ['V', 'O', 'X', 'E', 'L', 'S'];
    const gap = 8;
    return chars.map((char, i) => ({
      char,
      offsetX: (i - (chars.length - 1) / 2) * gap,
      blocks: LETTER_MAP[char] || [],
      index: i
    }));
  }, []);

  return (
    <group ref={groupRef} position={[-3, 30, -25]}>
      <Center>
        {letters.map((letter) => (
          <group key={letter.char + letter.index} position={[letter.offsetX, 0, 0]}>
            {letter.blocks.map(([bx, by], bi) => (
              <VoxelBlock
                key={bi}
                target={[bx - 2, by - 2, 0]}
                delay={letter.index * 0.15 + (bi * 0.01)}
                color={letter.index % 2 === 0 ? '#FFD700' : '#3A7D2E'}
                visible={visible}
              />
            ))}
          </group>
        ))}
      </Center>
    </group>
  );
}

function CinematicCamera({ onSplineDone }: { onSplineDone: () => void }) {
  const { camera } = useThree();
  const elapsed = useRef(0);
  const splineDone = useRef(false);
  const DURATION = 8;

  useFrame((_, delta) => {
    if (splineDone.current) {
      // STATIC STATE: Tighter framing (Radius: 45, Height: 32) at 180 degrees
      camera.position.set(0, 32, -45);
      camera.lookAt(0, 18, 0);
      return;
    }

    elapsed.current += delta;
    const t = Math.min(elapsed.current / DURATION, 1);

    // Quintic easing for buttery-smooth settlement
    const easedT = t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

    // TIGHTER ARC: 
    // 180-degree half-circle orbit (Math.PI) but pulling back less
    const angle = easedT * Math.PI;
    const radius = 10 + easedT * 35;
    const height = 14 + easedT * 18;

    camera.position.set(
      Math.sin(angle) * radius,
      height,
      Math.cos(angle) * radius
    );

    camera.lookAt(0, 18, 0);

    if (t >= 1 && !splineDone.current) {
      splineDone.current = true;
      onSplineDone();
    }
  });

  return null;
}

interface MenuSceneProps {
  onPlay: () => void;
  onClose: () => void;
}

export default function MenuScene({ onPlay, onClose }: MenuSceneProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  const handleSplineDone = () => {
    setTitleVisible(true);
    setTimeout(() => setShowMenu(true), 400);
  };

  return (
    <div className="w-full h-full relative bg-[#050505] overflow-hidden">
      {/* Menu UI */}
      {showMenu && (
        <>
          {/* Start Button - Voxel Style */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <button
              onClick={onPlay}
              className="pointer-events-auto px-16 py-6 bg-[#3A7D2E] text-white font-mono text-2xl tracking-widest uppercase border-b-8 border-r-8 border-[#1A3D0E] hover:bg-[#4A8D3E] hover:scale-105 active:border-0 active:translate-y-2 active:translate-x-2 transition-all shadow-[10px_10px_0_rgba(0,0,0,0.5)]"
              style={{
                imageRendering: 'pixelated',
                boxShadow: '10px 10px 0px 0px rgba(0,0,0,0.3)',
              }}
            >
              Start Journey
            </button>
          </div>
        </>
      )}

      <Canvas shadows camera={{ position: [50, 40, 50], fov: 75 }}>
        <color attach="background" args={['#050505']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <fog attach="fog" args={['#050505', 20, 100]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

        <CinematicCamera onSplineDone={handleSplineDone} />
        <MenuTerrain />
        <FloatingTitle visible={titleVisible} />
      </Canvas>
    </div>
  );
}
