import { useEffect, useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/game/store';
import Terrain from './Terrain';
import PlayerControls from './PlayerControls';
import HUD from './HUD';

function InteractionHandler({
  addBlock,
  removeBlock,
  activeBlock,
  setActiveBlock,
}: {
  addBlock: (x: number, y: number, z: number, type: any) => void;
  removeBlock: (x: number, y: number, z: number) => void;
  activeBlock: any;
  setActiveBlock: (type: any) => void;
}) {
  const { raycaster, camera, scene, gl } = useThree();
  const BLOCK_TYPES = ['grass', 'dirt', 'stone', 'wood', 'sand', 'leaves', 'coal', 'iron'];

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      // 0 = Left (Break), 2 = Right (Place)
      if (e.button !== 0 && e.button !== 2) return;
      
      const mouse = new THREE.Vector2(0, 0); 
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true)
        .filter(i => i.object.name !== 'water');
      
      if (intersects.length > 0) {
        // Increased reach distance to 12
        const hit = intersects.find(i => i.face && i.distance < 12);
        
        if (hit && hit.face) {
          if (e.button === 0) {
            // BREAK BLOCK
            const pos = hit.point.clone().sub(hit.face.normal.clone().multiplyScalar(0.5));
            removeBlock(Math.round(pos.x), Math.round(pos.y), Math.round(pos.z));
          } else {
            // PLACE BLOCK
            const pos = hit.point.clone().sub(hit.face.normal.clone().multiplyScalar(0.5));
            const bx = Math.round(pos.x);
            const by = Math.round(pos.y);
            const bz = Math.round(pos.z);
            
            addBlock(
              bx + Math.round(hit.face.normal.x),
              by + Math.round(hit.face.normal.y),
              bz + Math.round(hit.face.normal.z),
              activeBlock
            );
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const currentIndex = BLOCK_TYPES.indexOf(activeBlock);
      let nextIndex = (currentIndex + dir) % BLOCK_TYPES.length;
      if (nextIndex < 0) nextIndex = BLOCK_TYPES.length - 1;
      setActiveBlock(BLOCK_TYPES[nextIndex]);
    };

    window.addEventListener('pointerdown', handlePointer);
    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [raycaster, camera, scene, gl, addBlock, removeBlock, activeBlock, setActiveBlock]);

  return null;
}

function Selection() {
  const { raycaster, camera, scene } = useThree();
  const selectionRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!selectionRef.current) return;
    
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    // Ignore water in selection
    const intersects = raycaster.intersectObjects(scene.children, true)
      .filter(i => i.object.name !== 'water');
      
    const hit = intersects.find(i => i.face && i.distance < 12);

    if (hit && hit.face) {
      const pos = hit.point.clone().sub(hit.face.normal.clone().multiplyScalar(0.5));
      selectionRef.current.position.set(Math.round(pos.x), Math.round(pos.y), Math.round(pos.z));
      selectionRef.current.visible = true;
    } else {
      selectionRef.current.visible = false;
    }
  });

  return (
    <mesh ref={selectionRef} visible={false}>
      <boxGeometry args={[1.01, 1.01, 1.01]} />
      <meshBasicMaterial color="white" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

const Water = () => {
  return (
    <mesh 
      name="water" 
      rotation-x={-Math.PI / 2} 
      position={[0, 9.8, 0]} 
      receiveShadow
    >
      <planeGeometry args={[2000, 2000]} />
      <meshToonMaterial 
        color="#3498db" 
        transparent 
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function GameScene() {
  const { world, chunks, version, activeBlock, setActiveBlock, initWorld, addBlock, removeBlock, hasBlock, loadChunksAround, exportWorld, importWorld } = useGameStore();
  const [isUnderwater, setIsUnderwater] = useState(false);

  useEffect(() => {
    initWorld();
  }, [initWorld]);

  return (
    <div className="w-full h-full bg-[#1a1a2e]" onContextMenu={(e) => e.preventDefault()}>
      <HUD 
        activeBlock={activeBlock} 
        onSelectBlock={setActiveBlock} 
        exportWorld={exportWorld} 
        importWorld={importWorld} 
      />
      <Canvas
        shadows
        gl={{ 
          antialias: false, 
          powerPreference: 'high-performance',
          shadowMapType: THREE.PCFShadowMap 
        }}
        camera={{ fov: 75, near: 0.1, far: 300 }}
        dpr={[1, 1.5]}
      >
        <SceneController isUnderwater={isUnderwater} setIsUnderwater={setIsUnderwater} />
        
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[100, 100, 50]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <hemisphereLight args={['#87CEEB', '#5E8C31', 0.4]} />

        <PlayerControls 
          hasBlock={hasBlock} 
          onPositionChange={loadChunksAround} 
          isUnderwater={isUnderwater}
        />

        <Terrain
          world={world}
          chunks={chunks}
          version={version}
        />

        <Water />
        <Selection />

        <InteractionHandler 
          addBlock={addBlock} 
          removeBlock={removeBlock} 
          activeBlock={activeBlock} 
          setActiveBlock={setActiveBlock}
        />
      </Canvas>
    </div>
  );
}

function SceneController({ isUnderwater, setIsUnderwater }: { isUnderwater: boolean; setIsUnderwater: (v: boolean) => void }) {
  const { scene, camera } = useThree();

  useFrame(() => {
    const under = camera.position.y < 9.8;
    if (under !== isUnderwater) {
      setIsUnderwater(under);
      if (under) {
        scene.background = new THREE.Color('#004466');
        scene.fog = new THREE.Fog('#004466', 1, 30);
      } else {
        scene.background = new THREE.Color('#87CEEB');
        scene.fog = new THREE.Fog('#87CEEB', 60, 260);
      }
    }
  });

  return null;
}
