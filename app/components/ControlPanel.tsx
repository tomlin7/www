'use strict';

import React from 'react';

interface ControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const ControlPanel = ({ isOpen, onClose, children, title }: ControlPanelProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full right-0 mt-1 w-72 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
        {title && <h3 className="text-[13px] font-bold text-gray-500 mb-3 px-1 uppercase tracking-wider">{title}</h3>}
        {children}
      </div>
    </>
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
    className="w-full flex items-center p-2 hover:bg-black/5 rounded-xl transition-colors space-x-3 text-left"
    onClick={onClick}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200/50 text-gray-700'}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[13px] font-semibold truncate">{label}</div>
      {sublabel && <div className="text-[11px] text-gray-500 truncate">{sublabel}</div>}
    </div>
  </button>
);
