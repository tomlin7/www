'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

interface DockItemProps {
  tooltip: string;
  children: React.ReactNode;
  dot?: boolean;
  onClick?: () => void;
  mouseX?: MotionValue<number>;
}

export const DockItem = ({ 
  tooltip, 
  children, 
  dot,
  onClick,
  mouseX
}: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const defaultMouseX = useMotionValue(Infinity);
  const distance = useTransform(mouseX || defaultMouseX, (val: number) => {
    if (!ref.current) return Infinity;
    const bounds = ref.current.getBoundingClientRect();
    const center = bounds.x + bounds.width / 2;
    return val - center;
  });

  // Scale influence range: one element to the left and right (approx 100-120px)
  const scaleSync = useTransform(distance, [-120, 0, 120], [1, 1.7, 1]);
  const scale = useSpring(scaleSync, { 
    mass: 0.1, 
    stiffness: 150, 
    damping: 12 
  });

  // Subtle Y lift
  const ySync = useTransform(distance, [-120, 0, 120], [0, -12, 0]);
  const y = useSpring(ySync, { 
    mass: 0.1, 
    stiffness: 150, 
    damping: 12 
  });

  return (
    <div className="relative flex flex-col items-center justify-end" style={{ width: '44px', height: '44px' }}>
      <motion.div
        ref={ref}
        style={{ scale, y }}
        className="dock-item group w-full h-full cursor-pointer flex items-center justify-center relative origin-bottom will-change-transform"
        onClick={onClick}
      >
        <div className="dock-item-tooltip absolute -top-14 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white text-[12px] px-3 py-1.5 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 font-medium border border-white/10 whitespace-nowrap scale-90 group-hover:scale-100">
          {tooltip}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 border-b border-r border-white/10 rotate-45" />
        </div>
        <div className="w-full h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
          {children}
        </div>
      </motion.div>
      {dot && (
        <div className="w-1.5 h-1.5 bg-black/60 dark:bg-white/60 rounded-full absolute -bottom-3 left-1/2 -translate-x-1/2 transition-opacity duration-300"></div>
      )}
    </div>
  );
};

export const Dock = ({ children }: { children: React.ReactNode }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <motion.div 
        className="flex items-end space-x-3 px-4 py-3 rounded-[2.2rem] pointer-events-auto border border-white/20 relative shadow-2xl group/dock"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{ 
          // The glass effect
          background: 'rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(40px) saturate(210%)',
          WebkitBackdropFilter: 'blur(40px) saturate(210%)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.4) inset, 0 1px 0 rgba(255,255,255,0.3) inset',
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 25 }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const props = child.props as any;
            // Check for separators or generic divs
            if (typeof child.type === 'string' && child.type === 'div' && props.className?.includes('bg-black/10')) {
              return (
                <div key="sep" className="h-10 w-[1.5px] bg-black/15 mx-1.5 self-center rounded-full opacity-60" />
              );
            }
            // Inject mouseX into DockItem components
            // Note: If child is DockItem, it will receive mouseX
            return React.cloneElement(child, { mouseX } as any);
          }
          return child;
        })}
      </motion.div>
    </div>
  );
};
