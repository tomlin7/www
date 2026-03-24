'use strict';

import React, { useState } from 'react';

export const FolderIcon = () => (
  <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43.75 18.75H12.5C9.05 18.75 6.25 21.55 6.25 25V75C6.25 78.45 9.05 81.25 12.5 81.25H87.5C90.95 81.25 93.75 78.45 93.75 75V31.25C93.75 27.8 90.95 25 87.5 25H50L43.75 18.75Z" fill="#75C3FF" />
    <path d="M43.75 18.75H12.5C9.05 18.75 6.25 21.55 6.25 25V31.25H93.75V31.25C93.75 27.8 90.95 25 87.5 25H50L43.75 18.75Z" fill="#50A8FF" />
  </svg>
);

interface DesktopFolderProps {
  label: string;
  style: React.CSSProperties;
  onDoubleClick?: () => void;
}

export const DesktopFolder = ({ label, style, onDoubleClick }: DesktopFolderProps) => {
  const [flashing, setFlashing] = useState(false);
  const handleDoubleClick = () => {
    setFlashing(true);
    setTimeout(() => setFlashing(false), 200);
    if (onDoubleClick) onDoubleClick();
  };
  return (
    <div
      className="desktop-folder absolute flex flex-col items-center p-2 w-24"
      style={{ ...style, opacity: flashing ? 0.5 : 1 }}
      onDoubleClick={handleDoubleClick}
    >
      <FolderIcon />
      <span className="text-xs text-center mt-1 font-medium bg-white/30 px-1.5 rounded backdrop-blur-sm shadow-sm">{label}</span>
    </div>
  );
};
