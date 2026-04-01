import { useState, useCallback, useRef } from 'react';
import { Block, BlockType, generateTerrain, CHUNK_SIZE } from './terrain';

export type WorldBlocks = Map<string, Block>;

export interface ChunkData {
  key: string;
  cx: number;
  cz: number;
  blocks: Map<string, Block>;
  dirty: boolean;
}

function blockKey(x: number, y: number, z: number) {
  return `${x},${y},${z}`;
}

function chunkKeyStr(cx: number, cz: number) {
  return `${cx},${cz}`;
}

function worldToChunk(x: number) {
  return Math.floor(x / CHUNK_SIZE);
}

const RENDER_DISTANCE = 0;

export function useGameStore() {
  const [activeBlock, setActiveBlock] = useState<BlockType>('grass');
  const worldRef = useRef<WorldBlocks>(new Map());
  const chunksRef = useRef<Map<string, ChunkData>>(new Map());
  const [chunkVersion, setChunkVersion] = useState(0);

  // Generates a single chunk synchronously
  const generateChunk = useCallback((cx: number, cz: number) => {
    const key = chunkKeyStr(cx, cz);
    if (chunksRef.current.has(key)) return;

    const blocks = generateTerrain(cx, cz);
    const chunkBlocks = new Map<string, Block>();
    blocks.forEach((b) => {
      const bk = blockKey(b.x, b.y, b.z);
      worldRef.current.set(bk, b);
      chunkBlocks.set(bk, b);
    });

    chunksRef.current.set(key, { key, cx, cz, blocks: chunkBlocks, dirty: true });
  }, []);

  const loadChunksAround = useCallback(() => {
    // DO NOTHING (One chunk only)
  }, []);

  const initWorld = useCallback(() => {
    worldRef.current = new Map();
    chunksRef.current = new Map();

    // Generate central chunk synchronously
    generateChunk(0, 0);
    setChunkVersion((v) => v + 1);
  }, [generateChunk]);

  const addBlock = useCallback((x: number, y: number, z: number, type: BlockType) => {
    const key = blockKey(x, y, z);
    if (!worldRef.current.has(key)) {
      const block = { x, y, z, type };
      worldRef.current.set(key, block);

      // Mark chunk as dirty
      const cx = worldToChunk(x);
      const cz = worldToChunk(z);
      const ck = chunkKeyStr(cx, cz);
      const chunk = chunksRef.current.get(ck);
      if (chunk) {
        chunk.blocks.set(key, block);
        chunk.dirty = true;
      }
      setChunkVersion((v) => v + 1);
    }
  }, []);

  const removeBlock = useCallback((x: number, y: number, z: number) => {
    const key = blockKey(x, y, z);
    if (worldRef.current.has(key)) {
      worldRef.current.delete(key);

      const cx = worldToChunk(x);
      const cz = worldToChunk(z);
      const ck = chunkKeyStr(cx, cz);
      const chunk = chunksRef.current.get(ck);
      if (chunk) {
        chunk.blocks.delete(key);
        chunk.dirty = true;
      }
      setChunkVersion((v) => v + 1);
    }
  }, []);

  const exportWorld = useCallback(() => {
    const data = Array.from(worldRef.current.values());
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voxel-world-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const importWorld = useCallback((json: string) => {
    try {
      const data = JSON.parse(json) as Block[];
      worldRef.current = new Map();
      chunksRef.current = new Map();
      
      data.forEach(b => {
        const key = blockKey(b.x, b.y, b.z);
        worldRef.current.set(key, b);
        
        const cx = worldToChunk(b.x);
        const cz = worldToChunk(b.z);
        const ck = chunkKeyStr(cx, cz);
        if (!chunksRef.current.has(ck)) {
          chunksRef.current.set(ck, { key: ck, cx, cz, blocks: new Map(), dirty: true });
        }
        chunksRef.current.get(ck)!.blocks.set(key, b);
      });
      
      setChunkVersion(v => v + 1);
    } catch (e) {
      console.error("Failed to import world", e);
    }
  }, []);

  const hasBlock = useCallback((x: number, y: number, z: number): boolean => {
    return worldRef.current.has(blockKey(x, y, z));
  }, []);

  return {
    world: worldRef.current,
    chunks: chunksRef.current,
    version: chunkVersion,
    activeBlock,
    setActiveBlock,
    initWorld,
    addBlock,
    removeBlock,
    hasBlock,
    loadChunksAround,
    exportWorld,
    importWorld,
  };
}
