import { BlockType, getBlockColor } from '@/game/terrain';

const BLOCK_TYPES: BlockType[] = ['grass', 'dirt', 'stone', 'wood', 'sand', 'leaves'];

interface HUDProps {
  activeBlock: BlockType;
  onSelectBlock: (type: BlockType) => void;
}

export default function HUD({ activeBlock, onSelectBlock }: HUDProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
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
