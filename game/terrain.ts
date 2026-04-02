import { createNoise2D, createNoise3D } from 'simplex-noise';

export type BlockType = 'grass' | 'dirt' | 'stone' | 'wood' | 'sand' | 'leaves' | 'coal' | 'iron';

export interface Block {
  x: number;
  y: number;
  z: number;
  type: BlockType;
}

const BLOCK_COLORS: Record<BlockType, string> = {
  grass: '#5E8C31',
  dirt: '#8B5A2B',
  stone: '#808080',
  wood: '#6B4226',
  sand: '#C2B280',
  leaves: '#3A5F0B',
  coal: '#2A2A2A',
  iron: '#D4B483',
};

export function getBlockColor(type: BlockType): string {
  return BLOCK_COLORS[type];
}

export const CHUNK_SIZE = 64;
export const WORLD_HEIGHT = 20;
export const SEA_LEVEL = 10;

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateTerrain(chunkX: number, chunkZ: number, seed = 42): Block[] {
  const seeded = seededRandom(seed);
  const noise2D = createNoise2D(seeded);
  const noise3D = createNoise3D(seededRandom(seed + 1));

  const blocks: Block[] = [];

  for (let x = 0; x < CHUNK_SIZE; x++) {
    for (let z = 0; z < CHUNK_SIZE; z++) {
      const worldX = chunkX * CHUNK_SIZE + x;
      const worldZ = chunkZ * CHUNK_SIZE + z;

      const height = Math.floor(
        8 +
        noise2D(worldX * 0.02, worldZ * 0.02) * 6 +
        noise2D(worldX * 0.05, worldZ * 0.05) * 3 +
        noise2D(worldX * 0.1, worldZ * 0.1) * 1.5
      );

      for (let y = 0; y <= height; y++) {
        // CAVE 3D NOISE - Skip block creation if noise is above threshold
        const caveNoise = noise3D(worldX * 0.1, y * 0.15, worldZ * 0.1);
        
        // Entrances: If noise is very high, it can break the surface
        const entranceThreshold = 0.7;
        const normalThreshold = 0.55;
        
        if (y === height) {
          if (caveNoise > entranceThreshold) continue;
        } else {
          if (caveNoise > normalThreshold) continue;
        }

        let type: BlockType;
        if (y === height) {
          // Surface: check for beach
          if (height <= SEA_LEVEL + 1) {
            type = 'sand';
          } else {
            type = 'grass';
          }
        } else if (y >= height - 3) {
          type = height <= SEA_LEVEL + 1 ? 'sand' : 'dirt';
        } else {
          // Stone layer + ores
          const oreNoise = noise3D(worldX * 0.2, y * 0.2, worldZ * 0.2);
          if (oreNoise > 0.8) type = 'iron';
          else if (oreNoise > 0.7) type = 'coal';
          else type = 'stone';
        }
        blocks.push({ x: worldX, y, z: worldZ, type });
      }

      // Trees
      if (height > 7 && Math.abs(noise2D(worldX * 0.5, worldZ * 0.5)) > 0.85) {
        const treeHeight = 4 + Math.floor(Math.abs(noise2D(worldX * 0.3, worldZ * 0.3)) * 3);
        for (let ty = 1; ty <= treeHeight; ty++) {
          blocks.push({ x: worldX, y: height + ty, z: worldZ, type: 'wood' });
        }
        // Leaves
        for (let lx = -2; lx <= 2; lx++) {
          for (let lz = -2; lz <= 2; lz++) {
            for (let ly = -1; ly <= 2; ly++) {
              if (Math.abs(lx) + Math.abs(lz) + Math.abs(ly) <= 3 && !(lx === 0 && lz === 0 && ly <= 0)) {
                blocks.push({
                  x: worldX + lx,
                  y: height + treeHeight + ly,
                  z: worldZ + lz,
                  type: 'leaves',
                });
              }
            }
          }
        }
      }
    }
  }

  return blocks;
}
