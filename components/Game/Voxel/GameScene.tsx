import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
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
  const BLOCK_TYPES = ['grass', 'dirt', 'stone', 'wood', 'sand', 'leaves'];

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      // 0 = Left (Break), 2 = Right (Place)
      if (e.button !== 0 && e.button !== 2) return;
      
      const mouse = new THREE.Vector2(0, 0); 
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      
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

export default function GameScene() {
  const { world, chunks, version, activeBlock, setActiveBlock, initWorld, addBlock, removeBlock, hasBlock, loadChunksAround, exportWorld, importWorld } = useGameStore();

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
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ fov: 75, near: 0.1, far: 300 }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#87CEEB']} />
        <fog attach="fog" args={['#87CEEB', 60, 160]} />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[60, 100, 40]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <hemisphereLight args={['#87CEEB', '#5E8C31', 0.3]} />

        <PlayerControls hasBlock={hasBlock} onPositionChange={loadChunksAround} />

        <Terrain
          world={world}
          chunks={chunks}
          version={version}
        />

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
