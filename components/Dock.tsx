'use strict';

import React from 'react';

export const DockItem = ({ 
  tooltip, 
  children, 
  dot,
  onClick
}: { 
  tooltip: string; 
  children: React.ReactNode; 
  dot?: boolean;
  onClick?: () => void;
}) => (
  <div className="dock-item relative group w-12 h-12 cursor-pointer" onClick={onClick}>
    <div className="dock-item-tooltip absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-[11px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
      {tooltip}
    </div>
    {children}
    {dot && (
      <div className="w-1 h-1 bg-black/40 rounded-full absolute -bottom-1.5 left-1/2 transform -translate-x-1/2"></div>
    )}
  </div>
);

export const Dock = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
    <div className="glass rounded-2xl p-2 flex items-center space-x-2 pointer-events-auto" style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.4) inset' }}>
      {children}
    </div>
  </div>
);
