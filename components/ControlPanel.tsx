import React, { useEffect, useRef } from 'react';

interface ControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const ControlPanel = ({ isOpen, onClose, children, title }: ControlPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // If click was outside, close the menu
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute top-full right-0 mt-1 w-72 glass-darker text-white/90 rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right"
    >
      {title && <h3 className="text-[11px] font-bold text-white/40 mb-3 px-1 uppercase tracking-wider">{title}</h3>}
      {children}
    </div>
  );
};

export const ControlItem = ({ icon, label, sublabel, isActive, onClick }: { 
  icon: React.ReactNode; 
  label: string; 
  sublabel?: string; 
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <button 
    className="w-full flex items-center p-2 hover:bg-white/10 rounded-xl transition-colors space-x-3 text-left cursor-pointer"
    onClick={onClick}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/80'}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[13px] font-semibold text-white/90 truncate">{label}</div>
      {sublabel && <div className="text-[11px] text-white/40 truncate">{sublabel}</div>}
    </div>
  </button>
);
