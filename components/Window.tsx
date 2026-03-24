'use strict';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export const TrafficLights = ({ onClose, onMinimize, onMaximize }: { onClose?: () => void, onMinimize?: () => void, onMaximize?: () => void }) => (
  <div className="flex space-x-2 w-20">
    <button onClick={onClose} className="traffic-light tl-red hover:opacity-80 transition-opacity flex items-center justify-center group">
      <span className="opacity-0 group-hover:opacity-100 text-[8px] text-gray-800/60 font-bold leading-none">×</span>
    </button>
    <button onClick={onMinimize} className="traffic-light tl-yellow hover:opacity-80 transition-opacity flex items-center justify-center group">
      <span className="opacity-0 group-hover:opacity-100 text-[10px] text-gray-800/60 font-bold leading-none">−</span>
    </button>
    <button onClick={onMaximize} className="traffic-light tl-green hover:opacity-80 transition-opacity flex items-center justify-center group">
      <span className="opacity-0 group-hover:opacity-100 text-[7px] text-gray-800/60 font-bold leading-none">+</span>
    </button>
  </div>
);

interface WindowProps {
  id: string;
  children: React.ReactNode;
  initialPos: { x: number; y: number };
  width: string;
  zIndex: number;
  isActive: boolean;
  onActivate: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  className?: string;
  title: string;
  titleIcon?: React.ReactNode;
  headerRight?: React.ReactNode;
  headerCenter?: React.ReactNode;
}

export const DraggableWindow = ({
  id,
  children,
  initialPos,
  width,
  zIndex,
  isActive,
  onActivate,
  onClose,
  onMinimize,
  className,
  title,
  titleIcon,
  headerRight,
  headerCenter
}: WindowProps) => {
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState(initialPos);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    if (
      (e.target as HTMLElement).closest('.traffic-light') ||
      (e.target as HTMLElement).closest('button') ||
      ['BUTTON', 'INPUT'].includes((e.target as HTMLElement).tagName)
    ) return;
    
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    document.body.style.userSelect = 'none';
  }, [pos, isMaximized]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const windowStyle: React.CSSProperties = isMaximized 
    ? { top: '28px', left: 0, width: '100vw', height: 'calc(100vh - 28px)', zIndex: 1000, borderRadius: 0 }
    : { top: pos.y, left: pos.x, zIndex };

  return (
    <div
      id={id}
      className={`mac-window glass-darker overflow-hidden ${isMaximized ? '' : `${width} rounded-xl`} ${isActive ? 'active' : ''} ${className || ''}`}
      style={windowStyle}
      onMouseDown={onActivate}
    >
      <div className={`window-header h-12 flex items-center px-4 border-b border-gray-200/50 ${isMaximized ? '' : 'cursor-move'}`} onMouseDown={handleMouseDown}>
        <TrafficLights onClose={onClose} onMinimize={onMinimize} onMaximize={toggleMaximize} />
        <div className="flex-1 text-center text-sm font-semibold text-gray-700 select-none flex items-center justify-center space-x-2">
          {headerCenter || (
            <>
              <div className="flex items-center space-x-2">
                {titleIcon}
                <span>{title}</span>
              </div>
            </>
          )}
        </div>
        <div className="w-20 flex justify-end">
          {headerRight}
        </div>
      </div>
      <div onMouseDown={e => e.stopPropagation()} className={isMaximized ? 'h-full overflow-y-auto' : ''}>
        {children}
      </div>
    </div>
  );
};
