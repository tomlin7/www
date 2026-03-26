import { useMemo, memo } from 'react';
import * as THREE from 'three';
import { WorldBlocks, ChunkData } from '@/game/store';
import { getBlockColor, Block } from '@/game/terrain';

interface TerrainProps {
  world: WorldBlocks;
  chunks: Map<string, ChunkData>;
  version: number;
}

const tempMatrix = new THREE.Object3D();
const sharedGeo = new THREE.BoxGeometry(1, 1, 1);

function isExposed(world: WorldBlocks, x: number, y: number, z: number): boolean {
  return !world.has(`${x},${y},${z}`);
}

const InstancedBlocks = memo(function InstancedBlocks({ color, positions, count }: { color: string; positions: number[]; count: number }) {
  const mesh = useMemo(() => {
    const mat = new THREE.MeshLambertMaterial({ color });
    const m = new THREE.InstancedMesh(sharedGeo, mat, count);
    for (let i = 0; i < count; i++) {
      tempMatrix.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      tempMatrix.updateMatrix();
      m.setMatrixAt(i, tempMatrix.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    m.receiveShadow = true;
    m.castShadow = true;
    return m;
  }, [color, positions, count]);

  return <primitive object={mesh} />;
});

const ChunkMesh = memo(function ChunkMesh({
  chunk,
  world,
  version,
}: {
  chunk: ChunkData;
  world: WorldBlocks;
  version: number;
}) {
  const groups = useMemo(() => {
    const g = new Map<string, { positions: number[]; color: string }>();
    const chunkBlocks = chunk.blocks;

    chunkBlocks.forEach((block) => {
      const { x, y, z, type } = block;
      
      // Optimization: Avoid 6 world Map lookups if possible.
      // 1. Air check (standard exposure)
      const hasExposed =
        !chunkBlocks.has(`${x+1},${y},${z}`) && isExposed(world, x + 1, y, z) ||
        !chunkBlocks.has(`${x-1},${y},${z}`) && isExposed(world, x - 1, y, z) ||
        !chunkBlocks.has(`${x},${y+1},${z}`) && isExposed(world, x, y + 1, z) ||
        !chunkBlocks.has(`${x},${y-1},${z}`) && isExposed(world, x, y - 1, z) ||
        !chunkBlocks.has(`${x},${y},${z+1}`) && isExposed(world, x, y, z + 1) ||
        !chunkBlocks.has(`${x},${y},${z-1}`) && isExposed(world, x, y, z - 1);

      if (!hasExposed) return;

      if (!g.has(type)) {
        g.set(type, { positions: [], color: getBlockColor(type) });
      }
      g.get(type)!.positions.push(x, y, z);
    });

    return Array.from(g.entries()).map(([type, data]) => ({
      type,
      color: data.color,
      count: data.positions.length / 3,
      positions: data.positions,
    }));
  }, [chunk, world, version]);

  return (
    <>
      {groups.map((group) =>
        group.count > 0 ? (
          <InstancedBlocks
            key={`${chunk.key}-${group.type}`}
            color={group.color}
            positions={group.positions}
            count={group.count}
          />
        ) : null
      )}
    </>
  );
});

export default function Terrain({ world, chunks, version }: TerrainProps) {
  // MUST include version here to re-run Array.from when Map mutations happen in the store
  const chunkArray = useMemo(() => Array.from(chunks.values()), [chunks, version]);

  return (
    <group>
      {chunkArray.map((chunk) => (
        <ChunkMesh
          key={chunk.key}
          chunk={chunk}
          world={world}
          version={version}
        />
      ))}
    </group>
  );
}
