'use strict';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export const TrafficLights = () => (
  <div className="flex space-x-2 w-20">
    <div className="traffic-light tl-red"></div>
    <div className="traffic-light tl-yellow"></div>
    <div className="traffic-light tl-green"></div>
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
  className,
  title,
  titleIcon,
  headerRight,
  headerCenter
}: WindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState(initialPos);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('.traffic-light') ||
      ['BUTTON', 'INPUT'].includes((e.target as HTMLElement).tagName)
    ) return;
    
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    document.body.style.userSelect = 'none';
  }, [pos]);

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

  return (
    <div
      ref={windowRef}
      id={id}
      className={`mac-window glass-darker rounded-xl ${width} ${isActive ? 'active' : ''} ${className || ''}`}
      style={{ top: pos.y, left: pos.x, zIndex }}
      onMouseDown={onActivate}
    >
      <div className="window-header h-12 flex items-center px-4 border-b border-gray-200/50 cursor-move" onMouseDown={handleMouseDown}>
        <TrafficLights />
        <div className="flex-1 text-center text-sm font-semibold text-gray-700 select-none flex items-center justify-center space-x-2">
          {headerCenter || (
            <>
              {titleIcon}
              <span>{title}</span>
            </>
          )}
        </div>
        <div className="w-20 flex justify-end">
          {headerRight}
        </div>
      </div>
      <div onMouseDown={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
