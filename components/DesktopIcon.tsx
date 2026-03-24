'use strict';

import React, { useState, useRef, useEffect, useCallback } from 'react';

export const FolderIcon = () => (
  <svg className="w-16 h-16 drop-shadow-sm select-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43.75 18.75H12.5C9.05 18.75 6.25 21.55 6.25 25V75C6.25 78.45 9.05 81.25 12.5 81.25H87.5C90.95 81.25 93.75 78.45 93.75 75V31.25C93.75 27.8 90.95 25 87.5 25H50L43.75 18.75Z" fill="#75C3FF" />
    <path d="M43.75 18.75H12.5C9.05 18.75 6.25 21.55 6.25 25V31.25H93.75V31.25C93.75 27.8 90.95 25 87.5 25H50L43.75 18.75Z" fill="#50A8FF" />
  </svg>
);

interface DesktopFolderProps {
  label: string;
  initialPos: { top: string; left: string };
  onDoubleClick?: () => void;
}

export const DesktopFolder = ({ label, initialPos, onDoubleClick }: DesktopFolderProps) => {
  const [flashing, setFlashing] = useState(false);
  const [pos, setPos] = useState(initialPos);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const folderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (folderRef.current) {
      isDragging.current = true;
      const rect = folderRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.body.style.userSelect = 'none';
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setPos({
        top: `${e.clientY - dragOffset.current.y}px`,
        left: `${e.clientX - dragOffset.current.x}px`,
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

  const handleDoubleClick = () => {
    setFlashing(true);
    setTimeout(() => setFlashing(false), 200);
    if (onDoubleClick) onDoubleClick();
  };

  return (
    <div
      ref={folderRef}
      className="desktop-folder absolute flex flex-col items-center p-2 w-24 group transition-opacity"
      style={{ top: pos.top, left: pos.left, opacity: flashing ? 0.5 : 1 }}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
    >
      <div className="relative transform transition-transform group-active:scale-95 group-hover:drop-shadow-lg">
        <FolderIcon />
      </div>
      <span className="text-[11px] text-center mt-1 font-medium bg-[#1F1F1F]/40 text-white px-2 py-0.5 rounded backdrop-blur-md shadow-sm border border-white/10 select-none">
        {label}
      </span>
    </div>
  );
};
