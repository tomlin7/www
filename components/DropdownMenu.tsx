import React, { useEffect, useRef } from "react";

interface MenuItemProps {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  isSeparator?: boolean;
}

export const MenuItem = ({
  label,
  shortcut,
  onClick,
  isSeparator,
}: MenuItemProps) => {
  if (isSeparator) {
    return <div className="h-[1px] bg-white/10 my-1 mx-1" />;
  }
  return (
    <button
      className="w-full flex items-center justify-between  px-3 py-1.5 hover:bg-blue-600 hover:text-white rounded-md transition-colors text-left group cursor-pointer text-white/90"
      onClick={onClick}
    >
      <span className="text-[13px] font-medium">{label}</span>
      {shortcut && (
        <span className="text-[12px] text-white/40 group-hover:text-white/80 font-normal ml-8">
          {shortcut}
        </span>
      )}
    </button>
  );
};

interface DropdownMenuProps {
  isOpen: boolean;
  items: MenuItemProps[];
  onClose: () => void;
}

export const DropdownMenu = ({ isOpen, items, onClose }: DropdownMenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // If click was outside, close the menu
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 mt-1 w-60  glass-darker  rounded-lg p-1 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left"
    >
      {items.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};
