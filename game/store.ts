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

const RENDER_DISTANCE = 4;

export function useGameStore() {
  const [activeBlock, setActiveBlock] = useState<BlockType>('grass');
  const worldRef = useRef<WorldBlocks>(new Map());
  const chunksRef = useRef<Map<string, ChunkData>>(new Map());
  const [chunkVersion, setChunkVersion] = useState(0);
  const pendingLoads = useRef<Array<{ cx: number; cz: number }>>([]);
  const loadingFrame = useRef<number | null>(null);

  // Generates a single chunk synchronously and stores it
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

  // Process pending chunk loads - one chunk per frame to avoid jank
  const processPendingLoads = useCallback(() => {
    if (pendingLoads.current.length === 0) {
      loadingFrame.current = null;
      return;
    }

    // Load up to 2 chunks per frame
    const batch = pendingLoads.current.splice(0, 2);
    batch.forEach(({ cx, cz }) => generateChunk(cx, cz));
    setChunkVersion((v) => v + 1);

    loadingFrame.current = requestAnimationFrame(processPendingLoads);
  }, [generateChunk]);

  const loadChunksAround = useCallback((playerX: number, playerZ: number) => {
    const pcx = worldToChunk(playerX);
    const pcz = worldToChunk(playerZ);
    const needed: Array<{ cx: number; cz: number; dist: number }> = [];

    for (let cx = pcx - RENDER_DISTANCE; cx <= pcx + RENDER_DISTANCE; cx++) {
      for (let cz = pcz - RENDER_DISTANCE; cz <= pcz + RENDER_DISTANCE; cz++) {
        const key = chunkKeyStr(cx, cz);
        if (!chunksRef.current.has(key)) {
          const dist = Math.abs(cx - pcx) + Math.abs(cz - pcz);
          needed.push({ cx, cz, dist });
        }
      }
    }

    // Sort by distance - load closest chunks first
    needed.sort((a, b) => a.dist - b.dist);

    // Queue for staggered loading
    if (needed.length > 0) {
      pendingLoads.current = needed;
      if (!loadingFrame.current) {
        loadingFrame.current = requestAnimationFrame(processPendingLoads);
      }
    }

    // Unload distant chunks
    const toRemove: string[] = [];
    chunksRef.current.forEach((chunk, key) => {
      if (
        Math.abs(chunk.cx - pcx) > RENDER_DISTANCE + 2 ||
        Math.abs(chunk.cz - pcz) > RENDER_DISTANCE + 2
      ) {
        toRemove.push(key);
        chunk.blocks.forEach((_, bk) => worldRef.current.delete(bk));
      }
    });
    if (toRemove.length > 0) {
      toRemove.forEach((k) => chunksRef.current.delete(k));
      setChunkVersion((v) => v + 1);
    }
  }, [processPendingLoads, generateChunk]);

  const initWorld = useCallback(() => {
    worldRef.current = new Map();
    chunksRef.current = new Map();
    pendingLoads.current = [];
    if (loadingFrame.current) cancelAnimationFrame(loadingFrame.current);

    // Pre-generate immediate area synchronously for instant start
    for (let cx = -2; cx <= 2; cx++) {
      for (let cz = -2; cz <= 2; cz++) {
        generateChunk(cx, cz);
      }
    }
    setChunkVersion((v) => v + 1);

    // Queue remaining chunks for async loading
    setTimeout(() => loadChunksAround(8, 8), 100);
  }, [generateChunk, loadChunksAround]);

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
  };
}
