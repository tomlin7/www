'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, useAnimation, useMotionValueEvent } from 'framer-motion';

interface DockItemProps {
  tooltip: string;
  children: React.ReactNode;
  dot?: boolean;
  onClick?: () => void;
  mouseX?: MotionValue<number>;
  shake?: boolean;
}

export const DockItem = ({ 
  tooltip, 
  children, 
  dot,
  onClick,
  mouseX,
  shake
}: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [hasShaken, setHasShaken] = useState(false);

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

  // Trigger shake when mouse is very close to center
  useMotionValueEvent(distance, "change", (latest) => {
    if (shake && Math.abs(latest) < 10 && !hasShaken) {
      setHasShaken(true);
      controls.start({
        rotate: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4, ease: "easeInOut" }
      });
    } else if (Math.abs(latest) > 60) {
      setHasShaken(false);
    }
  });

  return (
    <div className="relative flex flex-col items-center justify-end" style={{ width: '44px', height: '44px' }}>
      <motion.div
        ref={ref}
        style={{ scale, y, backfaceVisibility: "hidden" }}
        animate={controls}
        className="dock-item group w-full h-full cursor-pointer flex items-center justify-center relative origin-bottom"
        onClick={onClick}
      >
        <div className="dock-item-tooltip absolute -top-14 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white text-[12px] px-3 py-1.5 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 font-medium whitespace-nowrap scale-90 group-hover:scale-100">
          {tooltip}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
        </div>
        <div className="w-full h-full rounded-[13px] overflow-hidden" style={{ transform: "translateZ(0)" }}>
          {children}
        </div>
      </motion.div>
      {dot && (
        <div className="w-1.5 h-1.5 bg-white/80 rounded-full absolute -bottom-3 left-1/2 -translate-x-1/2 transition-opacity duration-300"></div>
      )}
    </div>
  );
};

export const Dock = ({ children }: { children: React.ReactNode }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <motion.div 
        className="glass flex items-end space-x-3 px-4 py-4 rounded-[32px] pointer-events-auto relative shadow-2xl group/dock"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{ 
          // Match the top bar's specific glass tone but with our premium shadows
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 25 }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const props = child.props as any;
            // Check for separators or generic divs
            if (typeof child.type === 'string' && child.type === 'div' && (props.className?.includes('bg-black/10') || props.className?.includes('bg-white/10'))) {
              return (
                <div key="sep" className="h-10 w-[1.5px] bg-white/20 mx-1.5 self-center rounded-full opacity-60" />
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
