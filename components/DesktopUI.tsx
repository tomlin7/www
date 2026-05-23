'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { DraggableWindow } from '@/components/Window';
import { Dock, DockItem } from '@/components/Dock';
import { DesktopFolder } from '@/components/DesktopIcon';
import { DropdownMenu } from '@/components/DropdownMenu';
import { ControlPanel, ControlItem } from '@/components/ControlPanel';

// Assuming these are available in page.tsx or we can move them here
import { 
  ProfileWindowContent, 
  ExperienceWindowContent, 
  ProjectsWindowContent,
  finderMenuItems,
  fileMenuItems,
  editMenuItems,
  viewMenuItems,
  windowMenuItems,
  helpMenuItems
} from './portfolio-data'; // We'll need to create this or keep them in layout

import { IconWifi, IconBattery } from '@tabler/icons-react';

const WifiIcon = () => <IconWifi className="w-5 h-5" />;
const BatteryIcon = () => <IconBattery className="w-5 h-5" />;

export default function DesktopUI() {
  const searchParams = useSearchParams();
  const isLinkedIn = searchParams.get('source') === 'linkedin';

  const [clockText, setClockText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWindow, setActiveWindow] = useState('profile');
  const [zIndexMap, setZIndexMap] = useState<Record<string, number>>({ profile: 40, projects: 39, experience: 38 });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({ profile: true, projects: false, experience: false });
  const [minimizedWindows, setMinimizedWindows] = useState<Record<string, boolean>>({ profile: false, projects: false, experience: false });
  const zCounter = useRef(40);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockText(now.toLocaleTimeString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
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

  return (
    <div className="w-full h-full relative desktop-bg">
      <div className="text-gray-800 h-full w-full flex flex-col relative overflow-hidden bg-white/5">
        <div className="h-full w-full flex flex-col relative bg-transparent">
          {/* Menu Bar */}
          <nav className="glass w-full h-7 flex items-center justify-between px-4 text-xs font-medium z-50 absolute top-0 left-0">
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-4 pr-3">
                <img src="https://upload.wikimedia.org/wikipedia/en/8/8e/AppleSiriIcon2017.png" alt="Siri" className="w-4 h-4 cursor-pointer" />
                <div className="relative">
                  <span className={`font-bold cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'Finder' ? 'bg-black/5' : 'hover:bg-black/5'}`} onMouseDown={() => setActiveMenu(activeMenu === 'Finder' ? null : 'Finder')}>Finder</span>
                  <DropdownMenu isOpen={activeMenu === 'Finder'} items={finderMenuItems} onClose={() => setActiveMenu(null)} />
                </div>
              </div>
              {['File', 'Edit', 'View', 'Window', 'Help'].map(item => (
                <div key={item} className="relative">
                  <span className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === item ? 'bg-black/5' : 'hover:bg-black/5'}`} onMouseDown={() => setActiveMenu(activeMenu === item ? null : item)}>{item}</span>
                  <DropdownMenu isOpen={activeMenu === item} items={item === 'File' ? fileMenuItems : item === 'Edit' ? editMenuItems : item === 'View' ? viewMenuItems : item === 'Window' ? windowMenuItems : helpMenuItems} onClose={() => setActiveMenu(null)} />
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-1">
              {/* Wifi, Battery, Clock */}
              <div className="relative">
                <button className={`p-1.5 rounded-md ${activeMenu === 'Wifi' ? 'bg-black/5' : 'hover:bg-black/5'}`} onMouseDown={() => setActiveMenu(activeMenu === 'Wifi' ? null : 'Wifi')}><WifiIcon /></button>
                <ControlPanel isOpen={activeMenu === 'Wifi'} onClose={() => setActiveMenu(null)} title="Wi-Fi">
                   <div className="flex items-center justify-between mb-4"><span className="text-[13px] font-bold">Wi-Fi</span><div className="w-10 h-5 bg-blue-500 rounded-full relative p-0.5"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 shadow-sm"></div></div></div>
                   <div className="space-y-1"><ControlItem icon={<WifiIcon />} label="Fiber" sublabel="Saved" isActive /><ControlItem icon={<WifiIcon />} label="Guest_Access" /><ControlItem icon={<WifiIcon />} label="Starlink_99" /></div>
                </ControlPanel>
              </div>
              <div className="relative">
                <button className={`p-1.5 rounded-md ${activeMenu === 'Power' ? 'bg-black/5' : 'hover:bg-black/5'}`} onMouseDown={() => setActiveMenu(activeMenu === 'Power' ? null : 'Power')}><BatteryIcon /></button>
                <ControlPanel isOpen={activeMenu === 'Power'} onClose={() => setActiveMenu(null)} title="Battery">
                  <div className="flex items-center justify-between mb-4"><span className="text-sm font-bold text-gray-800">100% Charged</span><BatteryIcon /></div>
                  <div className="text-[11px] text-gray-500 mb-4 bg-black/[0.03] p-2 rounded-lg">Power Source: Power Adapter</div>
                </ControlPanel>
              </div>
              <div className="relative">
                <span className={`cursor-pointer px-2 py-1 rounded-md text-[13px] hover:bg-black/5 ${activeMenu === 'Clock' ? 'bg-black/5' : ''}`} onMouseDown={() => setActiveMenu(activeMenu === 'Clock' ? null : 'Clock')}>{clockText}</span>
              </div>
            </div>
          </nav>
          {/* Desktop Area */}
          <main className="flex-1 relative w-full h-full pt-7 pb-20 overflow-hidden">
            <DesktopFolder label="projects" initialPos={{ top: '15%', left: '80%' }} onDoubleClick={() => activateWindow('projects')} />
            <DesktopFolder label="about me" initialPos={{ top: '35%', left: '75%' }} onDoubleClick={() => activateWindow('profile')} />
            {isLinkedIn && <DesktopFolder label="experience" initialPos={{ top: '15%', left: '40%' }} onDoubleClick={() => activateWindow('experience')} />}
            <DesktopFolder label="resume" initialPos={{ top: '55%', left: '45%' }} />
            {!isLinkedIn && <DesktopFolder label="graphic design" initialPos={{ top: '15%', left: '40%' }} />}

            {openWindows['profile'] && !minimizedWindows['profile'] && (
              <DraggableWindow id="win-profile" initialPos={{ x: 80, y: 100 }} width="w-[550px]" zIndex={zIndexMap['profile']} isActive={activeWindow === 'profile'} onActivate={() => activateWindow('profile')} onClose={() => closeWindow('profile')} onMinimize={() => minimizeWindow('profile')} title="tomlin.jpg">
                <ProfileWindowContent isLinkedIn={isLinkedIn} />
              </DraggableWindow>
            )}
            {isLinkedIn && openWindows['experience'] && !minimizedWindows['experience'] && (
              <DraggableWindow id="win-experience" initialPos={{ x: 200, y: 120 }} width="w-[850px]" zIndex={zIndexMap['experience']} isActive={activeWindow === 'experience'} onActivate={() => activateWindow('experience')} onClose={() => closeWindow('experience')} onMinimize={() => minimizeWindow('experience')} title="experience">
                <ExperienceWindowContent />
              </DraggableWindow>
            )}
            {openWindows['projects'] && !minimizedWindows['projects'] && (
              <DraggableWindow id="win-projects" initialPos={{ x: 350, y: 150 }} width="w-[850px]" zIndex={zIndexMap['projects']} isActive={activeWindow === 'projects'} onActivate={() => activateWindow('projects')} onClose={() => closeWindow('projects')} onMinimize={() => minimizeWindow('projects')} title="some of his major projects">
                <ProjectsWindowContent searchQuery={searchQuery} />
              </DraggableWindow>
            )}
          </main>
          {/* Dock */}
          <Dock>
            <DockItem tooltip="Projects" dot={openWindows['projects']} onClick={() => activateWindow('projects')}>
              <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853981255cc36b3a37af_finder.png" alt="Finder" className="w-full h-full object-contain" />
            </DockItem>
            {isLinkedIn && (
              <DockItem tooltip="Experience" dot={openWindows['experience']} onClick={() => activateWindow('experience')}>
                <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853943597517f128b9b4_launchpad.png" alt="Launchpad" className="w-full h-full object-contain" />
              </DockItem>
            )}
            <DockItem tooltip="About Me" dot={openWindows['profile']} onClick={() => activateWindow('profile')}>
              <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853743597518c528b9b3_contacts.png" alt="About Me" className="w-full h-full object-contain" />
            </DockItem>
            <div className="h-10 w-[1px] bg-black/10 mx-1"></div>
            <DockItem tooltip="Safari"><img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png" alt="Safari" className="w-full h-full object-contain" /></DockItem>
            <DockItem tooltip="Messages"><img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853a55558a68e192ee08_messages.png" alt="Messages" className="w-full h-full object-contain" /></DockItem>
            <DockItem tooltip="Trash" shake={true}><img src="https://findicons.com/files/icons/569/longhorn_objects/128/trash.png" alt="Trash" className="w-full h-full object-contain" /></DockItem>
          </Dock>
        </div>
      </div>
    </div>
  );
}
