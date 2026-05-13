'use strict';

import React from 'react';

interface MenuItemProps {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  isSeparator?: boolean;
}

export const MenuItem = ({ label, shortcut, onClick, isSeparator }: MenuItemProps) => {
  if (isSeparator) {
    return <div className="h-[1px] bg-gray-200/60 my-1 mx-1" />;
  }
  return (
    <button
      className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-blue-500 hover:text-white rounded-md transition-colors text-left group"
      onClick={onClick}
    >
      <span className="text-[13px] font-medium">{label}</span>
      {shortcut && (
        <span className="text-[12px] text-gray-400 group-hover:text-blue-100 font-normal ml-8">{shortcut}</span>
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
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full left-0 mt-1 w-60 bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl p-1 z-50 animate-in fade-in zoom-in duration-100 origin-top-left">
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </>
  );
};
