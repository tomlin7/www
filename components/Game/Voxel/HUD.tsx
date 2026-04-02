import React from 'react';
import { BlockType, getBlockColor } from '@/game/terrain';

const BLOCK_TYPES: BlockType[] = ['grass', 'dirt', 'stone', 'wood', 'sand', 'leaves', 'coal', 'iron'];

interface HUDProps {
  activeBlock: BlockType;
  onSelectBlock: (type: BlockType) => void;
  exportWorld: () => void;
  importWorld: (json: string) => void;
}

export default function HUD({ activeBlock, onSelectBlock, exportWorld, importWorld }: HUDProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) importWorld(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Top Right Controls - Voxel Style */}
      <div className="absolute top-10 right-10 flex gap-4 pointer-events-auto">
        <button
          onClick={exportWorld}
          title="Export World"
          className="relative px-4 py-3 bg-blue-600 text-white font-mono text-xs uppercase border-b-4 border-r-4 border-blue-900 active:translate-y-1 active:translate-x-1 active:border-0 transition-all shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Export
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Load World"
          className="relative px-4 py-3 bg-zinc-700 text-white font-mono text-xs uppercase border-b-4 border-r-4 border-zinc-900 active:translate-y-1 active:translate-x-1 active:border-0 transition-all shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          Load
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden"
        />
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 relative opacity-80">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white -translate-x-1/2" />
        </div>
      </div>

      {/* Hotbar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-auto bg-black/40 backdrop-blur-xl p-2 rounded-xl border border-white/10 shadow-2xl">
        {BLOCK_TYPES.map((type, i) => (
          <button
            key={type}
            onClick={() => onSelectBlock(type)}
            className={`relative w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${activeBlock === type
                ? 'border-blue-500 bg-blue-500/20 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                : 'border-white/5 hover:border-white/20 bg-white/5'
              }`}
          >
            <div
              className="w-8 h-8 rounded shadow-inner"
              style={{ backgroundColor: getBlockColor(type) }}
            />
            <span className="absolute -top-1.5 -right-1.5 bg-white/10 backdrop-blur-md px-1.5 rounded text-[10px] font-mono text-white/50 border border-white/5">
              {i + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
