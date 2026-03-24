'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DraggableWindow } from '@/components/Window';
import { Dock, DockItem } from '@/components/Dock';
import { DesktopFolder } from '@/components/DesktopIcon';

// Project Card Component
const ProjectCard = ({ name, description, language, languageColor, stars, forks, isFeatured }: any) => (
  <div className={`group relative bg-white/60 hover:bg-white/80 border border-gray-200/50 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 cursor-default flex flex-col h-full ${isFeatured ? 'col-span-2 row-span-1 shadow-md border-blue-200' : ''}`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${languageColor || 'bg-gray-100'} bg-opacity-10 text-xl`}>
        {name[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="text-[17px] font-bold text-gray-900 truncate tracking-tight">{name}</h3>
          {isFeatured && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>}
        </div>
        <p className="text-[12px] text-gray-500 font-medium truncate opacity-70 italic">{language || 'General Tool'}</p>
      </div>
    </div>
    <p className={`text-[14px] text-gray-600 mb-6 flex-grow leading-relaxed ${isFeatured ? 'line-clamp-2' : 'line-clamp-3'}`}>
      {description}
    </p>
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100/30">
      <div className="flex items-center space-x-3 text-[12px] text-gray-400 font-semibold">
        {stars !== undefined && (
          <div className="flex items-center hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4 mr-1 fill-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {stars}
          </div>
        )}
        {forks !== undefined && (
          <div className="flex items-center hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {forks}
          </div>
        )}
      </div>
      <button className="text-[12px] font-bold text-blue-500 hover:text-blue-600 px-4 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full transition-all active:scale-95 group-hover:shadow-sm">
        View Project
      </button>
    </div>
  </div>
);

// Profile Window Content
const ProfileWindowContent = () => (
  <div className="p-8 bg-white/40 rounded-b-xl">
    <div className="mb-6">
      <h1 className="font-serif-italic text-6xl text-gray-900 mb-4 tracking-tight">
        HEY, i'm @tomlin7!
      </h1>
      <p className="font-mono-custom text-[13px] text-gray-500 bg-gray-100/50 inline-block px-3 py-1.5 rounded-md border border-gray-200/50">
        software engineer // systems • graphics • full-stack
      </p>
    </div>
    <hr className="border-t border-gray-300/60 my-6" />
    <ul className="space-y-4 text-[15px] leading-relaxed text-gray-700">
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>i'm focused on building things close to the metal and shipping real products.</span>
      </li>
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>i'm currently working on <a href="#" className="text-blue-600 hover:underline font-medium">ted.sh</a></span>
      </li>
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>i work on sophisticated agentic code editors <span className="text-xs text-gray-400">[1]</span> <span className="text-xs text-gray-400">[2]</span> and devtools <span className="text-xs text-gray-400">[3]</span> <span className="text-xs text-gray-400">[4]</span>, game engines <span className="text-xs text-gray-400">[5]</span>, rendering <span className="text-xs text-gray-400">[6]</span>, compilers <span className="text-xs text-gray-400">[7]</span> <span className="text-xs text-gray-400">[8]</span> <span className="text-xs text-gray-400">[9]</span>, games, to scalable backend services and production web apps.</span>
      </li>
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>i care about performance, clean architecture, and understanding how things actually work under the hood.</span>
      </li>
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>occasionally, i log out and pick up a pencil 🎨</span>
      </li>
    </ul>
  </div>
);

// Projects Window Content
const ProjectsWindowContent = ({ searchQuery }: { searchQuery: string }) => {
  const projects = [
    {
      name: 'biscuit',
      description: 'biscuit is a fast, extensible, native code editor with agents. lightweight <20 mb in size. install and start using in seconds.',
      language: 'Python',
      languageColor: 'bg-blue-500',
      stars: 254,
      forks: 32,
      isFeatured: true,
    },
    {
      name: 'ted-industries/ted',
      description: 'a minimal code editor for agents built with accessibility and performance in mind.',
      language: 'TypeScript',
      languageColor: 'bg-blue-600',
      stars: 12,
    },
    {
      name: 'Logicarium',
      description: 'Logicarium is a minimalist, performant, visual logic design environment. Design complex digital systems using a high-density, performant interface.',
      language: 'C++',
      languageColor: 'bg-pink-500',
      stars: 5,
    },
    {
      name: 'Positron',
      description: 'High-performance desktop applications with Python and modern web frameworks. Fast by design. Minimal by choice.',
      language: 'Python',
      languageColor: 'bg-blue-500',
      stars: 45,
    },
    {
      name: 'Ember',
      description: 'Game Engine written in C++ for real-time 3D rendering and physics simulation.',
      language: 'C++',
      languageColor: 'bg-pink-500',
      stars: 17,
    },
  ];

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[550px] bg-white rounded-b-xl overflow-hidden">
      {/* Finder-style Sidebar */}
      <div className="w-[180px] bg-[#EBEBEB]/80 backdrop-blur-xl p-4 flex flex-col border-r border-gray-200/50">
        <div className="space-y-6 flex-1 overflow-y-auto">
          <div>
            <h4 className="text-[11px] font-bold text-gray-500/80 mb-2 px-2 uppercase tracking-tight">Favorites</h4>
            <div className="space-y-1">
              <button className="w-full text-left px-2 py-1.5 text-[13px] font-medium bg-gray-200/60 rounded-lg flex items-center">
                <span className="w-4 h-4 mr-2 text-blue-500 flex items-center justify-center">🏠</span> All Projects
              </button>
              <button className="w-full text-left px-2 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-200/40 rounded-lg flex items-center transition-colors">
                <span className="w-4 h-4 mr-2 opacity-70 flex items-center justify-center">📁</span> Recents
              </button>
              <button className="w-full text-left px-2 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-200/40 rounded-lg flex items-center transition-colors">
                <span className="w-4 h-4 mr-2 opacity-70 flex items-center justify-center">🚀</span> Applications
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-gray-500/80 mb-2 px-2 uppercase tracking-tight">Tags</h4>
            <div className="space-y-1">
              <button className="w-full text-left px-2 py-1 text-[12px] text-gray-600 flex items-center hover:bg-gray-200/40 rounded-md">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></span> Personal
              </button>
              <button className="w-full text-left px-2 py-1 text-[12px] text-gray-600 flex items-center hover:bg-gray-200/40 rounded-md">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-2"></span> Work
              </button>
              <button className="w-full text-left px-2 py-1 text-[12px] text-gray-600 flex items-center hover:bg-gray-200/40 rounded-md">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></span> OSS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#FAFAFA]/50 custom-scrollbar">
        <div className="mb-10">
          <h2 className="text-4xl font-serif-italic mb-2 tracking-tight">My Craft</h2>
          <p className="text-gray-500 text-[14px] font-medium max-w-lg">
            A selection of my best work, ranging from systems engineering to creative tools.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 pb-8">
          {filtered.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 py-20 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-400 font-medium">No projects matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { DropdownMenu } from '@/components/DropdownMenu';
import { ControlPanel, ControlItem } from '@/components/ControlPanel';

export default function Home() {
  const [clockText, setClockText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWindow, setActiveWindow] = useState('profile');
  const [zIndexMap, setZIndexMap] = useState<Record<string, number>>({ profile: 40, projects: 39 });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({ profile: true, projects: false });
  const [minimizedWindows, setMinimizedWindows] = useState<Record<string, boolean>>({ profile: false, projects: false });
  const zCounter = useRef(40);

  const finderMenuItems = [
    { label: 'About Finder' },
    { label: '', isSeparator: true },
    { label: 'Settings...', shortcut: '⌘,' },
    { label: '', isSeparator: true },
    { label: 'Empty Trash...', shortcut: '⇧⌘⌫' },
    { label: '', isSeparator: true },
    { label: 'Hide Finder', shortcut: '⌘H' },
    { label: 'Hide Others', shortcut: '⌥⌘H' },
    { label: 'Show All' },
  ];

  const fileMenuItems = [
    { label: 'New Window', shortcut: '⌘N' },
    { label: 'New Tab', shortcut: '⌘T' },
    { label: '', isSeparator: true },
    { label: 'Download Resume', shortcut: '⌘R' },
    { label: '', isSeparator: true },
    { label: 'Share Portfolio', shortcut: '⇧⌘C' },
    { label: '', isSeparator: true },
    { label: 'Print...', shortcut: '⌘P' },
    { label: '', isSeparator: true },
    { label: 'Close Window', shortcut: '⌘W' },
  ];

  const editMenuItems = [
    { label: 'Undo', shortcut: '⌘Z' },
    { label: 'Redo', shortcut: '⇧⌘Z' },
    { label: '', isSeparator: true },
    { label: 'Cut', shortcut: '⌘X' },
    { label: 'Copy', shortcut: '⌘C' },
    { label: 'Paste', shortcut: '⌘V' },
    { label: 'Select All', shortcut: '⌘A' },
  ];

  const viewMenuItems = [
    { label: 'as Icons', shortcut: '⌘1' },
    { label: 'as List', shortcut: '⌘2' },
    { label: 'as Columns', shortcut: '⌘3' },
    { label: 'as Gallery', shortcut: '⌘4' },
    { label: '', isSeparator: true },
    { label: 'Sort By' },
    { label: 'Clean Up' },
    { label: '', isSeparator: true },
    { label: 'Hide Sidebar', shortcut: '⌥⌘S' },
    { label: 'Show Path Bar', shortcut: '⌥⌘P' },
  ];

  const windowMenuItems = [
    { label: 'Minimize', shortcut: '⌘M' },
    { label: 'Zoom' },
    { label: '', isSeparator: true },
    { label: 'Bring All to Front' },
    { label: '', isSeparator: true },
    { label: 'tomlin.jpg (bio)', shortcut: activeWindow === 'profile' ? '✓' : '' },
    { label: 'major projects', shortcut: activeWindow === 'projects' ? '✓' : '' },
  ];

  const helpMenuItems = [
    { label: 'Search' },
    { label: '', isSeparator: true },
    { label: 'Next.js Documentation' },
    { label: 'macOS Portfolio Tips' },
  ];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const day = days[now.getDay()];
      const dayNum = now.getDate();
      const month = now.toLocaleString('default', { month: 'short' });
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setClockText(`${day} ${month} ${dayNum}  ${hours}:${minutes} ${ampm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const activateWindow = useCallback((id: string) => {
    zCounter.current += 1;
    setZIndexMap(prev => ({ ...prev, [id]: zCounter.current }));
    setActiveWindow(id);
    setMinimizedWindows(prev => ({ ...prev, [id]: false }));
    setOpenWindows(prev => ({ ...prev, [id]: true }));
  }, []);

  const closeWindow = (id: string) => {
    setOpenWindows(prev => ({ ...prev, [id]: false }));
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows(prev => ({ ...prev, [id]: true }));
  };

  const bringProjectsToFront = () => {
    activateWindow('projects');
  };

  const WifiIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );

  const BatteryIcon = () => (
    <svg className="w-5 h-5 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
      <line x1="22" y1="11" x2="22" y2="13" />
      <rect x="4" y="9" width="10" height="6" rx="1" fill="currentColor" />
    </svg>
  );

  return (
    <div className="text-gray-800 h-screen w-screen overflow-hidden flex flex-col font-sans">
      {/* Menu Bar */}
      <nav className="glass w-full h-7 flex items-center justify-between px-4 text-xs font-medium z-50 fixed top-0">
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-4 pr-3">
            <svg className="w-3.5 h-3.5 fill-current cursor-pointer" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <div className="relative">
              <span 
                className={`font-bold cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'Finder' ? 'bg-black/5' : 'hover:bg-black/5'}`}
                onMouseDown={() => setActiveMenu(activeMenu === 'Finder' ? null : 'Finder')}
              >
                Finder
              </span>
              <DropdownMenu isOpen={activeMenu === 'Finder'} items={finderMenuItems} onClose={() => setActiveMenu(null)} />
            </div>
          </div>
          
          <div className="relative">
            <span 
              className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'File' ? 'bg-black/5' : 'hover:bg-black/5'}`}
              onMouseDown={() => setActiveMenu(activeMenu === 'File' ? null : 'File')}
            >
              File
            </span>
            <DropdownMenu isOpen={activeMenu === 'File'} items={fileMenuItems} onClose={() => setActiveMenu(null)} />
          </div>

          <div className="relative">
            <span 
              className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'Edit' ? 'bg-black/5' : 'hover:bg-black/5'}`}
              onMouseDown={() => setActiveMenu(activeMenu === 'Edit' ? null : 'Edit')}
            >
              Edit
            </span>
            <DropdownMenu isOpen={activeMenu === 'Edit'} items={editMenuItems} onClose={() => setActiveMenu(null)} />
          </div>

          <div className="relative">
            <span 
              className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'View' ? 'bg-black/5' : 'hover:bg-black/5'}`}
              onMouseDown={() => setActiveMenu(activeMenu === 'View' ? null : 'View')}
            >
              View
            </span>
            <DropdownMenu isOpen={activeMenu === 'View'} items={viewMenuItems} onClose={() => setActiveMenu(null)} />
          </div>

          <div className="relative">
            <span 
              className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'Window' ? 'bg-black/5' : 'hover:bg-black/5'}`}
              onMouseDown={() => setActiveMenu(activeMenu === 'Window' ? null : 'Window')}
            >
              Window
            </span>
            <DropdownMenu isOpen={activeMenu === 'Window'} items={windowMenuItems} onClose={() => setActiveMenu(null)} />
          </div>

          <div className="relative">
            <span 
              className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'Help' ? 'bg-black/5' : 'hover:bg-black/5'}`}
              onMouseDown={() => setActiveMenu(activeMenu === 'Help' ? null : 'Help')}
            >
              Help
            </span>
            <DropdownMenu isOpen={activeMenu === 'Help'} items={helpMenuItems} onClose={() => setActiveMenu(null)} />
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <div className="relative">
            <button 
              className={`p-1.5 rounded-md ${activeMenu === 'Wifi' ? 'bg-black/5' : 'hover:bg-black/5'}`}
              onMouseDown={() => setActiveMenu(activeMenu === 'Wifi' ? null : 'Wifi')}
            >
              <WifiIcon />
            </button>
            <ControlPanel isOpen={activeMenu === 'Wifi'} onClose={() => setActiveMenu(null)} title="Wi-Fi">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-bold">Wi-Fi</span>
                <div className="w-10 h-5 bg-blue-500 rounded-full relative p-0.5">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="space-y-1">
                <ControlItem icon={<WifiIcon />} label="Antigravity_Fiber" sublabel="Saved" isActive />
                <ControlItem icon={<WifiIcon />} label="Guest_Access" />
                <ControlItem icon={<WifiIcon />} label="Starlink_99" />
              </div>
              <div className="h-[1px] bg-gray-200/60 my-3" />
              <button className="text-[12px] text-gray-500 hover:text-black hover:underline px-2">Wi-Fi Settings...</button>
            </ControlPanel>
          </div>

          <div className="relative">
            <button 
              className={`p-1.5 rounded-md ${activeMenu === 'Power' ? 'bg-black/5' : 'hover:bg-black/5'}`}
              onMouseDown={() => setActiveMenu(activeMenu === 'Power' ? null : 'Power')}
            >
              <BatteryIcon />
            </button>
            <ControlPanel isOpen={activeMenu === 'Power'} onClose={() => setActiveMenu(null)} title="Battery">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-gray-800">100% Charged</span>
                <BatteryIcon />
              </div>
              <div className="text-[11px] text-gray-500 mb-4 bg-black/[0.03] p-2 rounded-lg">Power Source: Power Adapter</div>
              <div className="space-y-1">
                <ControlItem icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>} label="Low Power Mode" />
              </div>
              <div className="h-[1px] bg-gray-200/60 my-3" />
              <button className="text-[12px] text-gray-500 hover:text-black hover:underline px-2">Battery Settings...</button>
            </ControlPanel>
          </div>

          <div className="relative">
            <span 
              className={`cursor-pointer px-2 py-1 rounded-md text-[13px] hover:bg-black/5 ${activeMenu === 'Clock' ? 'bg-black/5' : ''}`}
              onMouseDown={() => setActiveMenu(activeMenu === 'Clock' ? null : 'Clock')}
            >
              {clockText}
            </span>
            <ControlPanel isOpen={activeMenu === 'Clock'} onClose={() => setActiveMenu(null)}>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-serif-italic mb-2">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-xs text-gray-500 mb-6">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                <div className="w-full h-40 bg-black/5 rounded-2xl flex items-center justify-center text-gray-400">
                  <div className="text-[11px] uppercase tracking-widest font-bold">No Notifications</div>
                </div>
              </div>
              <div className="h-[1px] bg-gray-200/60 my-4" />
              <button className="w-full text-[12px] text-gray-500 hover:text-black py-1">Open Calendar...</button>
            </ControlPanel>
          </div>
        </div>
      </nav>

      {/* Desktop Area */}
      <main className="flex-1 relative w-full h-full pt-7 pb-20 overflow-hidden">
        {/* Desktop Folders */}
        <DesktopFolder label="projects" initialPos={{ top: '15%', left: '80%' }} onDoubleClick={() => activateWindow('projects')} />
        <DesktopFolder label="about me" initialPos={{ top: '35%', left: '75%' }} onDoubleClick={() => activateWindow('profile')} />
        <DesktopFolder label="resume" initialPos={{ top: '55%', left: '45%' }} />
        <DesktopFolder label="graphic design" initialPos={{ top: '15%', left: '40%' }} />

        {/* Profile Window */}
        {openWindows['profile'] && !minimizedWindows['profile'] && (
          <DraggableWindow
            id="win-profile"
            initialPos={{ x: 80, y: 100 }}
            width="w-[550px]"
            zIndex={zIndexMap['profile']}
            isActive={activeWindow === 'profile'}
            onActivate={() => activateWindow('profile')}
            onClose={() => closeWindow('profile')}
            onMinimize={() => minimizeWindow('profile')}
            title="tomlin.jpg"
            titleIcon={
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            }
          >
            <ProfileWindowContent />
          </DraggableWindow>
        )}

        {/* Projects Window */}
        {openWindows['projects'] && !minimizedWindows['projects'] && (
          <DraggableWindow
            id="win-projects"
            initialPos={{ x: 350, y: 150 }}
            width="w-[850px]"
            zIndex={zIndexMap['projects']}
            isActive={activeWindow === 'projects'}
            onActivate={() => activateWindow('projects')}
            onClose={() => closeWindow('projects')}
            onMinimize={() => minimizeWindow('projects')}
            title="some of his major projects"
            headerCenter={
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z" />
                </svg>
                <span>some of his major projects</span>
              </div>
            }
            headerRight={
              <div className="relative">
                <svg className="w-4 h-4 absolute left-2 top-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2 py-1 bg-white/50 border border-gray-300/50 rounded-md text-xs w-28 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  onMouseDown={e => e.stopPropagation()}
                />
              </div>
            }
          >
            <ProjectsWindowContent searchQuery={searchQuery} />
          </DraggableWindow>
        )}
      </main>

      {/* Dock */}
      <Dock>
        {/* Finder */}
        <DockItem tooltip="Finder" dot={activeWindow === 'Finder'}>
          <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl shadow-sm flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="w-1/2 bg-blue-400"></div>
              <div className="w-1/2 bg-blue-300"></div>
            </div>
            <svg className="w-8 h-8 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
        </DockItem>

        {/* Launchpad */}
        <DockItem tooltip="Launchpad">
          <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-50 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center p-2">
            <div className="grid grid-cols-3 gap-1 w-full h-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-gray-400 rounded-sm"></div>
              ))}
            </div>
          </div>
        </DockItem>

        {/* Safari */}
        <DockItem tooltip="Safari">
          <div className="w-full h-full bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
            <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" fill="#e0f2fe" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="white" stroke="#3b82f6" />
            </svg>
          </div>
        </DockItem>

        {/* Messages */}
        <DockItem tooltip="Messages">
          <div className="w-full h-full bg-gradient-to-b from-green-400 to-green-500 rounded-xl shadow-sm flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
        </DockItem>

        <div className="h-10 w-[1px] bg-black/10 mx-1"></div>

        {/* Profile */}
        <DockItem tooltip="About Me" dot={openWindows['profile']} onClick={() => activateWindow('profile')}>
          <div className="w-full h-full bg-slate-100 rounded-xl shadow-sm flex items-center justify-center border border-slate-200 text-slate-600">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </DockItem>

        {/* Projects */}
        <DockItem tooltip="Projects" dot={openWindows['projects']} onClick={() => activateWindow('projects')}>
          <div className="w-full h-full bg-blue-100 rounded-xl shadow-sm flex items-center justify-center border border-blue-200 text-blue-500">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z" />
            </svg>
          </div>
        </DockItem>

        <div className="h-10 w-[1px] bg-black/10 mx-1"></div>

        {/* Notion */}
        <DockItem tooltip="Notion">
          <div className="w-full h-full bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-200">
            <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.459 4.208c.746-.062 1.487-.042 2.221.055.679.083 1.157.491 1.472 1.051l3.528 7.359 4.398-8.139c.264-.469.77-.732 1.291-.767.876-.057 1.761-.061 2.646-.011.233.013.385.16.368.398-.052.75-.027 1.503.047 2.253.04.423-.191.737-.504.939l-4.218 2.636v8.283c.01.272.164.444.425.503.626.142 1.258.261 1.889.375.312.056.495.234.502.553.012.569.006 1.139.002 1.708-.002.32-.206.522-.518.524-1.196.006-2.392-.04-3.582-.249-.785-.138-1.554-.368-2.321-.58-.337-.094-.522-.321-.532-.676-.021-.715-.008-1.431-.005-2.146.002-.34.198-.568.528-.669.585-.179 1.163-.382 1.745-.572.338-.11.498-.328.5-.688.012-3.149.009-6.297.009-9.446 0-.083-.017-.165-.026-.25L8.514 15.68c-.146.289-.357.485-.682.527-1.077.139-2.152.3-3.23.435-.347.043-.591-.07-.723-.404-.668-1.693-1.32-3.39-1.996-5.078-.175-.436-.37-1.134-.37-1.134l-.066 6.551c-.006.492.203.778.683.948.513.181 1.022.373 1.528.572.355.139.539.387.525.766-.023.639-.015 1.278-.013 1.917.001.378-.184.629-.569.704-.982.193-1.981.3-2.977.375-.631.047-1.265.053-1.895-.018-.322-.036-.506-.243-.505-.573.003-.701.018-1.402.016-2.103-.001-.326.17-.532.485-.615.656-.174 1.305-.373 1.954-.572.378-.116.558-.363.555-.764-.02-3.878-.008-7.756-.008-11.634 0-.486-.239-.775-.712-.942-.423-.15-.843-.311-1.258-.481-.301-.124-.462-.35-.443-.681.026-.452.012-.906.012-1.359 0-.251.146-.382.392-.401z" />
            </svg>
          </div>
        </DockItem>

        <div className="h-10 w-[1px] bg-black/10 mx-1"></div>

        {/* Trash */}
        <DockItem tooltip="Trash">
          <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-xl shadow-sm border border-white/50 flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-600 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </DockItem>
      </Dock>
    </div>
  );
}
