"use strict";

import React, { useState, useRef, useEffect, useCallback } from "react";

export const FolderIcon = () => (
  <img
    src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779537170/folder-icon-macos_dl98vf.png"
    alt="Folder Icon"
    className="w-full h-full drop-shadow-sm select-none"
  />
);

interface DesktopFolderProps {
  label: string;
  initialPos: { top: string; left: string };
  onDoubleClick?: () => void;
}

export const DesktopFolder = ({
  label,
  initialPos,
  onDoubleClick,
}: DesktopFolderProps) => {
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
      document.body.style.userSelect = "none";
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
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
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
      <span className="text-[11px] text-center mt-1 font-medium bg-[#1F1F1F]/40 text-white px-2 py-0.5 rounded backdrop-blur-md shadow-sm select-none">
        {label}
      </span>
    </div>
  );
};
