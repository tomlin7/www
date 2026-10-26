"use client";

import React, { useEffect, useRef } from "react";

interface SpinePoint {
  x: number;
  y: number;
  angle: number;
}

interface Spot {
  segmentIndex: number;
  offsetPerp: number; // lateral offset multiplier (-0.8 to 0.8)
  radiusMult: number;  // size relative to segment radius (0.3 to 0.7)
  color: string;
}

interface Fish {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  size: number;
  colorTheme: {
    name: string;
    body: string;
    spots: string[];
    finColor: string;
  };
  spots: Spot[];
  segments: { x: number; y: number }[];
  tailPhase: number;
  speed: number;
  maxSpeed: number;
  targetSpeed: number;
  targetAngle: number;
  wanderAngle: number;
  eatingCooldown: number;
  targetFoodId: string | null;
}

interface Ripple {
  id: string;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

interface Food {
  id: string;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
}

interface Bubble {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  decay: number;
}

// Predefined Koi Color Themes
const KOI_THEMES = [
  {
    name: "Shiro Bekko", // White body with black spots
    body: "#f8fafc",
    spots: ["#18181b", "#09090b", "#27272a"],
    finColor: "rgba(248, 250, 252, 0.4)",
  },
  {
    name: "Karasu", // Black body with charcoal/gray spots
    body: "#18181b",
    spots: ["#71717a", "#a1a1aa", "#3f3f46"],
    finColor: "rgba(55, 65, 81, 0.4)",
  },
  {
    name: "Platinum Ogon", // Metallic silver solid
    body: "#e4e4e7",
    spots: [],
    finColor: "rgba(244, 244, 245, 0.5)",
  },
  {
    name: "Matsuba Monochrome", // Light gray with dark gray spots
    body: "#d4d4d8",
    spots: ["#27272a", "#52525b"],
    finColor: "rgba(212, 212, 216, 0.4)",
  },
  {
    name: "Sumi Monochrome", // White with large gray patches
    body: "#fafafa",
    spots: ["#71717a", "#3f3f46"],
    finColor: "rgba(250, 250, 250, 0.4)",
  }
];

export default function FishPond() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References to keep states inside the requestAnimationFrame loop without retriggering renders
  const stateRef = useRef<{
    fish: Fish[];
    ripples: Ripple[];
    foods: Food[];
    bubbles: Bubble[];
    mouse: { x: number; y: number; active: boolean; lastRippleX: number; lastRippleY: number };
    dimensions: { width: number; height: number };
  }>({
    fish: [],
    ripples: [],
    foods: [],
    bubbles: [],
    mouse: { x: 0, y: 0, active: false, lastRippleX: 0, lastRippleY: 0 },
    dimensions: { width: 300, height: 220 },
  });

  // Helper to calculate segment radius based on position (0 = head, 9 = tail end)
  const getRadius = (index: number, size: number): number => {
    const profile = [1.0, 1.15, 1.1, 0.95, 0.8, 0.65, 0.5, 0.38, 0.28, 0.18];
    return (profile[index] || 0.2) * 7.5 * size;
  };

  // Helper to create a single fish
  const createFish = (id: number, width: number, height: number): Fish => {
    const theme = KOI_THEMES[Math.floor(Math.random() * KOI_THEMES.length)];
    const size = Math.random() * 0.4 + 0.8; // size multiplier 0.8 to 1.2
    
    // Choose start position
    const x = Math.random() * width;
    const y = Math.random() * height;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.5 + 0.8;
    
    // Initialize spine segments
    const segments: { x: number; y: number }[] = [];
    const segmentLength = 5.5 * size;
    for (let i = 0; i < 10; i++) {
      segments.push({
        x: x - Math.cos(angle) * (i * segmentLength),
        y: y - Math.sin(angle) * (i * segmentLength),
      });
    }

    // Generate spots
    const spots: Spot[] = [];
    if (theme.spots && theme.spots.length > 0) {
      const count = Math.floor(Math.random() * 4) + 2; // 2 to 5 spots
      for (let i = 0; i < count; i++) {
        spots.push({
          segmentIndex: Math.floor(Math.random() * 6) + 1, // segments 1 to 6
          offsetPerp: (Math.random() - 0.5) * 0.8,
          radiusMult: Math.random() * 0.3 + 0.4,
          color: theme.spots[Math.floor(Math.random() * theme.spots.length)],
        });
      }
    }

    return {
      id,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      angle,
      size,
      colorTheme: theme,
      spots,
      segments,
      tailPhase: Math.random() * Math.PI * 2,
      speed,
      maxSpeed: 1.8 * size,
      targetSpeed: speed,
      targetAngle: angle,
      wanderAngle: angle,
      eatingCooldown: 0,
      targetFoodId: null,
    };
  };

  // Set up the canvas dimensions and initial simulation state
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }

      stateRef.current.dimensions = { width, height };

      // Initialize fish if not already initialized or bounds changed drastically
      if (stateRef.current.fish.length === 0) {
        const initialFish: Fish[] = [];
        for (let i = 0; i < 6; i++) {
          initialFish.push(createFish(i, width, height));
        }
        stateRef.current.fish = initialFish;
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Main Simulation Loop
  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const { width, height } = stateRef.current.dimensions;
      const { fish, ripples, foods, bubbles, mouse } = stateRef.current;

      // 1. CLEAR & BACKGROUND (POND GRADIENT)
      ctx.clearRect(0, 0, width, height);
      
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 20, 
        width / 2, height / 2, Math.max(width, height)
      );
      bgGrad.addColorStop(0, "#18181b"); // Deep charcoal gray
      bgGrad.addColorStop(0.5, "#09090b"); // Near black
      bgGrad.addColorStop(1, "#020202"); // Pure black depth
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw caustics grid / pond floor shadows for depth
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSpacing = 40;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.bezierCurveTo(x + 10, height / 3, x - 10, (height * 2) / 3, x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(width / 3, y + 10, (width * 2) / 3, y - 10, width, y);
        ctx.stroke();
      }

      // 2. UPDATE FOODS
      stateRef.current.foods = foods.filter((food) => {
        food.pulsePhase += 0.05;
        // Slowly submerge food (simulate sinking)
        food.opacity = Math.max(0.2, food.opacity - 0.0005);
        return true;
      });

      // 3. UPDATE BUBBLES
      stateRef.current.bubbles = bubbles.filter((bubble) => {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        // Float upwards slightly (simulate current)
        bubble.vy -= 0.02;
        bubble.vx += (Math.random() - 0.5) * 0.1;
        bubble.life -= bubble.decay;
        bubble.opacity = bubble.life;
        return bubble.life > 0;
      });

      // 4. UPDATE FISH PHYSICS (Steering, Flocking, Feeding)
      fish.forEach((f) => {
        // Decrease eating cooldown
        if (f.eatingCooldown > 0) f.eatingCooldown--;

        let steerX = 0;
        let steerY = 0;

        // --- Sensory Checks ---
        // Find nearest food pellet
        let closestFood: Food | null = null;
        let minDist = Infinity;
        
        foods.forEach((food) => {
          const d = Math.hypot(food.x - f.x, food.y - f.y);
          if (d < minDist) {
            minDist = d;
            closestFood = food;
          }
        });

        // Target food if nearby and not in cooldown
        if (closestFood && minDist < 250 && f.eatingCooldown === 0) {
          f.targetFoodId = (closestFood as Food).id;
          
          // Steering force towards food
          const desiredVx = ((closestFood as Food).x - f.x) / minDist;
          const desiredVy = ((closestFood as Food).y - f.y) / minDist;
          
          // Strong force towards food
          steerX += desiredVx * 2.0;
          steerY += desiredVy * 2.0;
          
          // Accelerate to chase food
          f.targetSpeed = f.maxSpeed * 1.4;
          
          // EAT FOOD CHECK
          if (minDist < f.size * 12) {
            // Eat the food!
            stateRef.current.foods = stateRef.current.foods.filter(
              (food) => food.id !== (closestFood as Food).id
            );
            f.eatingCooldown = 180; // wait before feeding again
            f.targetFoodId = null;
            f.targetSpeed = f.speed * 0.6; // slow down after eating
            
            // Create bubble burst
            for (let i = 0; i < 8; i++) {
              stateRef.current.bubbles.push({
                id: Math.random().toString(),
                x: f.x + Math.cos(f.angle) * 5,
                y: f.y + Math.sin(f.angle) * 5,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5 - 0.5,
                radius: Math.random() * 2 + 1,
                opacity: 0.8,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.02,
              });
            }

            // Temporarily swell size slightly to show consumption
            const originalSize = f.size;
            f.size = originalSize * 1.15;
            setTimeout(() => {
              f.size = originalSize;
            }, 600);
          }
        } else {
          f.targetFoodId = null;
          f.targetSpeed = 0.8 * f.size;

          // --- BOIDS FLOCKING ALGORITHM ---
          let sepX = 0, sepY = 0, sepCount = 0;
          let alignX = 0, alignY = 0, alignCount = 0;
          let cohX = 0, cohY = 0, cohCount = 0;

          fish.forEach((other) => {
            if (other.id === f.id) return;
            const dist = Math.hypot(other.x - f.x, other.y - f.y);

            // Separation (Avoid crowding)
            if (dist < 35 * f.size) {
              sepX += f.x - other.x;
              sepY += f.y - other.y;
              sepCount++;
            }
            // Alignment (Match heading)
            if (dist < 80 * f.size) {
              alignX += other.vx;
              alignY += other.vy;
              alignCount++;
            }
            // Cohesion (Move to center of group)
            if (dist < 80 * f.size) {
              cohX += other.x;
              cohY += other.y;
              cohCount++;
            }
          });

          if (sepCount > 0) {
            steerX += (sepX / sepCount) * 1.5;
            steerY += (sepY / sepCount) * 1.5;
          }
          if (alignCount > 0) {
            alignX = alignX / alignCount;
            alignY = alignY / alignCount;
            const alignMag = Math.hypot(alignX, alignY);
            if (alignMag > 0) {
              steerX += (alignX / alignMag) * 0.4;
              steerY += (alignY / alignMag) * 0.4;
            }
          }
          if (cohCount > 0) {
            cohX = cohX / cohCount - f.x;
            cohY = cohY / cohCount - f.y;
            const cohMag = Math.hypot(cohX, cohY);
            if (cohMag > 0) {
              steerX += (cohX / cohMag) * 0.3;
              steerY += (cohY / cohMag) * 0.3;
            }
          }

          // Wander behavior
          f.wanderAngle += (Math.random() - 0.5) * 0.25;
          steerX += Math.cos(f.wanderAngle) * 0.25;
          steerY += Math.sin(f.wanderAngle) * 0.25;
        }

        // --- Boundary Avoidance ---
        const padding = 35;
        if (f.x < padding) steerX += (padding - f.x) * 0.1;
        if (f.x > width - padding) steerX += (width - padding - f.x) * 0.1;
        if (f.y < padding) steerY += (padding - f.y) * 0.1;
        if (f.y > height - padding) steerY += (height - padding - f.y) * 0.1;

        // Apply forces to velocity
        f.vx += steerX * 0.06;
        f.vy += steerY * 0.06;

        // Clamp speed
        const speed = Math.hypot(f.vx, f.vy);
        const currentMaxSpeed = f.targetFoodId ? f.maxSpeed * 1.4 : f.maxSpeed;
        
        // Blend current speed towards target speed
        const newSpeed = speed * 0.95 + f.targetSpeed * 0.05;
        const clampedSpeed = Math.min(Math.max(newSpeed, 0.4), currentMaxSpeed);
        
        if (speed > 0) {
          f.vx = (f.vx / speed) * clampedSpeed;
          f.vy = (f.vy / speed) * clampedSpeed;
        }

        // Update Position
        f.x += f.vx;
        f.y += f.vy;

        // Update Heading Angle smoothly
        const currentAngle = Math.atan2(f.vy, f.vx);
        // Angle wrapping correction
        let angleDiff = currentAngle - f.angle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        f.angle += angleDiff * 0.1;

        // Update tail phase cycle based on actual velocity
        f.tailPhase += clampedSpeed * 0.18;

        // Update spine segments
        f.segments[0] = { x: f.x, y: f.y };
        const segmentLength = 5.0 * f.size;
        for (let i = 1; i < f.segments.length; i++) {
          const prev = f.segments[i - 1];
          const curr = f.segments[i];
          const dx = curr.x - prev.x;
          const dy = curr.y - prev.y;
          const d = Math.hypot(dx, dy);
          if (d > segmentLength) {
            const segAngle = Math.atan2(dy, dx);
            curr.x = prev.x + Math.cos(segAngle) * segmentLength;
            curr.y = prev.y + Math.sin(segAngle) * segmentLength;
          }
        }
      });

      // 5. RENDER SHADOWS FIRST (FOR POND DEPTH)
      fish.forEach((f) => {
        drawFish(ctx, f, true);
      });

      // 6. RENDER FOOD PELLETS
      foods.forEach((food) => {
        ctx.save();
        const pulse = Math.sin(food.pulsePhase) * 1;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#ffffff";
        ctx.fillStyle = `rgba(228, 228, 231, ${food.opacity})`;
        ctx.beginPath();
        ctx.arc(food.x, food.y, food.radius + pulse * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 7. RENDER FISH BODIES
      fish.forEach((f) => {
        drawFish(ctx, f, false);
      });

      // 8. RENDER BUBBLES
      bubbles.forEach((b) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.25})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.05})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // 9. UPDATE AND RENDER WATER RIPPLES
      stateRef.current.ripples = ripples.filter((r) => {
        r.radius += r.speed;
        r.opacity = 1 - r.radius / r.maxRadius;
        
        if (r.opacity <= 0) return false;

        // Render double-ring ripple for realistic refraction (monochrome)
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.16})`; // White ripple
        ctx.lineWidth = 1.5 * r.opacity;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
 
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.06})`;
        ctx.lineWidth = 0.8 * r.opacity;
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius - 4), 0, Math.PI * 2);
        ctx.stroke();

        return true;
      });

      // Mouse drag ripple generation
      if (mouse.active) {
        const d = Math.hypot(mouse.x - mouse.lastRippleX, mouse.y - mouse.lastRippleY);
        if (d > 22) {
          stateRef.current.ripples.push({
            id: Math.random().toString(),
            x: mouse.x,
            y: mouse.y,
            radius: 1,
            maxRadius: 32,
            opacity: 0.4,
            speed: 0.8,
          });
          stateRef.current.mouse.lastRippleX = mouse.x;
          stateRef.current.mouse.lastRippleY = mouse.y;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    // Helper to draw fish (can be used for drawing shadow or actual fish)
    const drawFish = (ctx: CanvasRenderingContext2D, f: Fish, isShadow: boolean) => {
      const { size, segments, tailPhase, angle, colorTheme, spots } = f;
      
      ctx.save();

      // Shadow drawing style modifications
      if (isShadow) {
        // Shift shadow offset downwards and right to simulate depth
        ctx.translate(6 * size, 10 * size);
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.filter = "blur(3px)";
      }

      // Compute deformed spine points with wiggle offset
      const spine: SpinePoint[] = segments.map((seg, i) => {
        if (i === 0) return { x: seg.x, y: seg.y, angle };

        // Angle of this segment relative to the previous one
        const prev = segments[i - 1];
        const dx = prev.x - seg.x;
        const dy = prev.y - seg.y;
        const segAngle = Math.atan2(dy, dx);

        // Apply tail waving offset perpendicular to spine
        // Segment 0 wiggles 0%, Segment 9 wiggles 100%
        const wiggle = Math.sin(tailPhase - i * 0.45) * 3.2 * (i / segments.length) * size;

        return {
          x: seg.x - Math.sin(segAngle) * wiggle,
          y: seg.y + Math.cos(segAngle) * wiggle,
          angle: segAngle,
        };
      });

      // Get outline coordinates for left and right sides
      const leftSide: { x: number; y: number }[] = [];
      const rightSide: { x: number; y: number }[] = [];

      for (let i = 0; i < spine.length; i++) {
        const pt = spine[i];
        const r = getRadius(i, size);
        const perpAngle = pt.angle + Math.PI / 2;

        leftSide.push({
          x: pt.x + Math.cos(perpAngle) * r,
          y: pt.y + Math.sin(perpAngle) * r,
        });

        rightSide.push({
          x: pt.x - Math.cos(perpAngle) * r,
          y: pt.y - Math.sin(perpAngle) * r,
        });
      }

      // --- Draw Pectoral Fins (Only if not shadow) ---
      if (!isShadow) {
        ctx.fillStyle = colorTheme.finColor;
        
        // Left Pectoral Fin (attached to segment 1)
        const leftAttach = leftSide[1];
        const leftFinAngle = spine[1].angle + 0.9 + Math.sin(tailPhase * 0.5) * 0.15;
        const leftFinLength = size * 10;
        
        ctx.beginPath();
        ctx.moveTo(leftAttach.x, leftAttach.y);
        ctx.quadraticCurveTo(
          leftAttach.x + Math.cos(leftFinAngle - 0.4) * leftFinLength,
          leftAttach.y + Math.sin(leftFinAngle - 0.4) * leftFinLength,
          leftAttach.x + Math.cos(leftFinAngle) * leftFinLength * 1.3,
          leftAttach.y + Math.sin(leftFinAngle) * leftFinLength * 1.3
        );
        ctx.quadraticCurveTo(
          leftAttach.x + Math.cos(leftFinAngle + 0.4) * leftFinLength,
          leftAttach.y + Math.sin(leftFinAngle + 0.4) * leftFinLength,
          leftSide[2].x, leftSide[2].y
        );
        ctx.closePath();
        ctx.fill();

        // Right Pectoral Fin
        const rightAttach = rightSide[1];
        const rightFinAngle = spine[1].angle - 0.9 - Math.sin(tailPhase * 0.5) * 0.15;
        const rightFinLength = size * 10;

        ctx.beginPath();
        ctx.moveTo(rightAttach.x, rightAttach.y);
        ctx.quadraticCurveTo(
          rightAttach.x + Math.cos(rightFinAngle + 0.4) * rightFinLength,
          rightAttach.y + Math.sin(rightFinAngle + 0.4) * rightFinLength,
          rightAttach.x + Math.cos(rightFinAngle) * rightFinLength * 1.3,
          rightAttach.y + Math.sin(rightFinAngle) * rightFinLength * 1.3
        );
        ctx.quadraticCurveTo(
          rightAttach.x + Math.cos(rightFinAngle - 0.4) * rightFinLength,
          rightAttach.y + Math.sin(rightFinAngle - 0.4) * rightFinLength,
          rightSide[2].x, rightSide[2].y
        );
        ctx.closePath();
        ctx.fill();

        // Ventral fins (smaller, near segment 5)
        ctx.beginPath();
        ctx.moveTo(leftSide[5].x, leftSide[5].y);
        ctx.lineTo(leftSide[5].x + Math.cos(spine[5].angle + 1.2) * (size * 4), leftSide[5].y + Math.sin(spine[5].angle + 1.2) * (size * 4));
        ctx.lineTo(leftSide[6].x, leftSide[6].y);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(rightSide[5].x, rightSide[5].y);
        ctx.lineTo(rightSide[5].x + Math.cos(spine[5].angle - 1.2) * (size * 4), rightSide[5].y + Math.sin(spine[5].angle - 1.2) * (size * 4));
        ctx.lineTo(rightSide[6].x, rightSide[6].y);
        ctx.closePath();
        ctx.fill();
      }

      // --- Draw Tail Fin (Caudal Fin) ---
      const tailBase = spine[spine.length - 1];
      const tailAngle = tailBase.angle + Math.PI + Math.sin(tailPhase - 10 * 0.4) * 0.45;
      const tailLength = size * 14;
      
      const leftTipX = tailBase.x + Math.cos(tailAngle - 0.32) * tailLength;
      const leftTipY = tailBase.y + Math.sin(tailAngle - 0.32) * tailLength;
      
      const rightTipX = tailBase.x + Math.cos(tailAngle + 0.32) * tailLength;
      const rightTipY = tailBase.y + Math.sin(tailAngle + 0.32) * tailLength;
      
      const tailNotchX = tailBase.x + Math.cos(tailAngle) * (tailLength * 0.62);
      const tailNotchY = tailBase.y + Math.sin(tailAngle) * (tailLength * 0.62);

      if (isShadow) {
        ctx.beginPath();
        ctx.moveTo(tailBase.x, tailBase.y);
        ctx.quadraticCurveTo(
          tailBase.x + Math.cos(tailAngle - 0.45) * (tailLength * 0.6),
          tailBase.y + Math.sin(tailAngle - 0.45) * (tailLength * 0.6),
          leftTipX, leftTipY
        );
        ctx.lineTo(tailNotchX, tailNotchY);
        ctx.lineTo(rightTipX, rightTipY);
        ctx.quadraticCurveTo(
          tailBase.x + Math.cos(tailAngle + 0.45) * (tailLength * 0.6),
          tailBase.y + Math.sin(tailAngle + 0.45) * (tailLength * 0.6),
          tailBase.x, tailBase.y
        );
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillStyle = colorTheme.finColor;
        ctx.beginPath();
        ctx.moveTo(tailBase.x, tailBase.y);
        ctx.quadraticCurveTo(
          tailBase.x + Math.cos(tailAngle - 0.45) * (tailLength * 0.6),
          tailBase.y + Math.sin(tailAngle - 0.45) * (tailLength * 0.6),
          leftTipX, leftTipY
        );
        ctx.lineTo(tailNotchX, tailNotchY);
        ctx.lineTo(rightTipX, rightTipY);
        ctx.quadraticCurveTo(
          tailBase.x + Math.cos(tailAngle + 0.45) * (tailLength * 0.6),
          tailBase.y + Math.sin(tailAngle + 0.45) * (tailLength * 0.6),
          tailBase.x, tailBase.y
        );
        ctx.closePath();
        ctx.fill();
      }

      // --- Draw Main Body Skin ---
      ctx.beginPath();
      ctx.moveTo(leftSide[0].x, leftSide[0].y);
      for (let i = 1; i < leftSide.length; i++) {
        ctx.lineTo(leftSide[i].x, leftSide[i].y);
      }
      ctx.lineTo(rightSide[rightSide.length - 1].x, rightSide[rightSide.length - 1].y);
      for (let i = rightSide.length - 2; i >= 0; i--) {
        ctx.lineTo(rightSide[i].x, rightSide[i].y);
      }
      ctx.closePath();
      
      if (isShadow) {
        ctx.fill();
      } else {
        ctx.fillStyle = colorTheme.body;
        ctx.fill();

        // Clip textures/spots to the fish body outline!
        ctx.save();
        ctx.clip();

        // Render Spots
        spots.forEach((spot) => {
          const pt = spine[spot.segmentIndex];
          const r = getRadius(spot.segmentIndex, size);
          const perpAngle = pt.angle + Math.PI / 2;
          
          const spotX = pt.x + Math.cos(perpAngle) * (r * spot.offsetPerp);
          const spotY = pt.y + Math.sin(perpAngle) * (r * spot.offsetPerp);
          const spotR = r * spot.radiusMult;

          ctx.fillStyle = spot.color;
          ctx.beginPath();
          ctx.arc(spotX, spotY, spotR, 0, Math.PI * 2);
          ctx.fill();
        });

        // Dorsal Ridge / Spine highlight (simulates 3D rounding)
        const spineGrad = ctx.createLinearGradient(
          spine[0].x, spine[0].y, 
          spine[spine.length - 1].x, spine[spine.length - 1].y
        );
        spineGrad.addColorStop(0, "rgba(255, 255, 255, 0.15)");
        spineGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.08)");
        spineGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.12)");
        ctx.strokeStyle = spineGrad;
        ctx.lineWidth = 1.5 * size;
        ctx.beginPath();
        ctx.moveTo(spine[0].x, spine[0].y);
        for (let i = 1; i < spine.length - 1; i++) {
          ctx.lineTo(spine[i].x, spine[i].y);
        }
        ctx.stroke();

        ctx.restore(); // Exit clipping region

        // --- Draw Eyes ---
        const head = spine[0];
        const eyeOffsetAngle = 0.65;
        const eyeDist = size * 4.6;
        const eyeRadius = size * 1.0;

        const leftEyeX = head.x + Math.cos(head.angle + eyeOffsetAngle) * eyeDist;
        const leftEyeY = head.y + Math.sin(head.angle + eyeOffsetAngle) * eyeDist;
        const rightEyeX = head.x + Math.cos(head.angle - eyeOffsetAngle) * eyeDist;
        const rightEyeY = head.y + Math.sin(head.angle - eyeOffsetAngle) * eyeDist;

        ctx.fillStyle = "#18181b"; // dark charcoal eyes
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyeRadius, 0, Math.PI * 2);
        ctx.arc(rightEyeX, rightEyeY, eyeRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(leftEyeX - size * 0.3 * Math.cos(head.angle), leftEyeY - size * 0.3 * Math.sin(head.angle), eyeRadius * 0.35, 0, Math.PI * 2);
        ctx.arc(rightEyeX - size * 0.3 * Math.cos(head.angle), rightEyeY - size * 0.3 * Math.sin(head.angle), eyeRadius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle Event Input: Hover Ripple spawning
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    stateRef.current.mouse.x = x;
    stateRef.current.mouse.y = y;
    stateRef.current.mouse.active = true;
  };

  const handleMouseLeave = () => {
    stateRef.current.mouse.active = false;
  };

  // Click drops food and triggers a large wave ripple
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Trigger strong ripple
    stateRef.current.ripples.push({
      id: Math.random().toString(),
      x,
      y,
      radius: 1,
      maxRadius: 75,
      opacity: 0.65,
      speed: 1.3,
    });

    // Add food pellet
    const foodId = Math.random().toString();
    stateRef.current.foods.push({
      id: foodId,
      x,
      y,
      radius: Math.random() * 1.5 + 3.2,
      opacity: 0.9,
      pulsePhase: Math.random() * Math.PI,
    });

    // Bubble splat
    for (let i = 0; i < 4; i++) {
      stateRef.current.bubbles.push({
        id: Math.random().toString(),
        x,
        y,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        radius: Math.random() * 1.5 + 0.8,
        opacity: 0.7,
        life: 1.0,
        decay: Math.random() * 0.04 + 0.03,
      });
    }

    // Alarm nearby fish to swim faster!
    stateRef.current.fish.forEach((f) => {
      const d = Math.hypot(f.x - x, f.y - y);
      if (d < 120) {
        // Startled, turn and double speed!
        f.targetAngle = Math.atan2(f.y - y, f.x - x) + (Math.random() - 0.5) * 0.5;
        f.vx = Math.cos(f.targetAngle) * (f.maxSpeed * 1.3);
        f.vy = Math.sin(f.targetAngle) * (f.maxSpeed * 1.3);
        f.wanderAngle = f.targetAngle;
      }
    });
  };

  const resetPond = () => {
    const { width, height } = stateRef.current.dimensions;
    const newFish: Fish[] = [];
    for (let i = 0; i < 6; i++) {
      newFish.push(createFish(i, width, height));
    }
    stateRef.current.fish = newFish;
    stateRef.current.ripples = [];
    stateRef.current.foods = [];
    stateRef.current.bubbles = [];
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-[24px] select-none group/pond bg-[#09090b]"
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
        className="block cursor-pointer absolute inset-0 z-10"
      />

      {/* Depth vignette shadow overlay */}
      <div className="absolute inset-0 pointer-events-none z-15 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
