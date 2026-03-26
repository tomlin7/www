import { useRef, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

const GRAVITY = -20;
const JUMP_FORCE = 8;
const PLAYER_HEIGHT = 1.6;
const PLAYER_RADIUS = 0.25;
const MOVE_SPEED = 6;
const SPRINT_MULTIPLIER = 1.6;

interface PlayerControlsProps {
  hasBlock: (x: number, y: number, z: number) => boolean;
  onPositionChange?: (x: number, z: number) => void;
}

export default function PlayerControls({ hasBlock, onPositionChange }: PlayerControlsProps) {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const keys = useRef<Set<string>>(new Set());
  const controlsRef = useRef<any>(null);
  const isGrounded = useRef(false);
  const lastChunkCheck = useRef({ x: 0, z: 0 });

  useEffect(() => {
    camera.position.set(32, 21, 32);

    const onKeyDown = (e: KeyboardEvent) => keys.current.add(e.code);
    const onKeyUp = (e: KeyboardEvent) => keys.current.delete(e.code);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [camera]);

  const checkCollision = useCallback((px: number, headY: number, pz: number): boolean => {
    const feetY = headY - PLAYER_HEIGHT;
    const minBx = Math.floor(px - PLAYER_RADIUS + 0.5);
    const maxBx = Math.floor(px + PLAYER_RADIUS + 0.5);
    const minBz = Math.floor(pz - PLAYER_RADIUS + 0.5);
    const maxBz = Math.floor(pz + PLAYER_RADIUS + 0.5);
    const minBy = Math.floor(feetY + 0.5);
    const maxBy = Math.floor(headY + 0.5);

    for (let bx = minBx; bx <= maxBx; bx++) {
      for (let bz = minBz; bz <= maxBz; bz++) {
        for (let by = minBy; by <= maxBy; by++) {
          if (!hasBlock(bx, by, bz)) continue;
          const blockMinX = bx - 0.5, blockMaxX = bx + 0.5;
          const blockMinY = by - 0.5, blockMaxY = by + 0.5;
          const blockMinZ = bz - 0.5, blockMaxZ = bz + 0.5;
          if (
            px + PLAYER_RADIUS > blockMinX && px - PLAYER_RADIUS < blockMaxX &&
            headY > blockMinY && feetY < blockMaxY &&
            pz + PLAYER_RADIUS > blockMinZ && pz - PLAYER_RADIUS < blockMaxZ
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, [hasBlock]);

  const getGroundY = useCallback((px: number, headY: number, pz: number): number | null => {
    const feetY = headY - PLAYER_HEIGHT;
    const minBx = Math.floor(px - PLAYER_RADIUS + 0.5);
    const maxBx = Math.floor(px + PLAYER_RADIUS + 0.5);
    const minBz = Math.floor(pz - PLAYER_RADIUS + 0.5);
    const maxBz = Math.floor(pz + PLAYER_RADIUS + 0.5);
    
    const checkY = Math.floor(feetY - 0.01 + 0.5);
    for (let bx = minBx; bx <= maxBx; bx++) {
      for (let bz = minBz; bz <= maxBz; bz++) {
        if (hasBlock(bx, checkY, bz)) {
          const blockTop = checkY + 0.5;
          if (
            px + PLAYER_RADIUS > bx - 0.5 && px - PLAYER_RADIUS < bx + 0.5 &&
            pz + PLAYER_RADIUS > bz - 0.5 && pz - PLAYER_RADIUS < bz + 0.5 &&
            feetY < blockTop + 0.05 && feetY > blockTop - 0.2
          ) {
            return blockTop;
          }
        }
      }
    }
    return null;
  }, [hasBlock]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    const dir = new THREE.Vector3();
    const right = new THREE.Vector3();

    camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();
    right.crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize();

    const sprinting = keys.current.has('ControlLeft') || keys.current.has('ShiftLeft');
    const speed = MOVE_SPEED * (sprinting ? SPRINT_MULTIPLIER : 1);

    const moveDir = new THREE.Vector3(0, 0, 0);
    if (keys.current.has('KeyW')) moveDir.add(dir);
    if (keys.current.has('KeyS')) moveDir.sub(dir);
    if (keys.current.has('KeyA')) moveDir.sub(right);
    if (keys.current.has('KeyD')) moveDir.add(right);
    if (moveDir.length() > 0) moveDir.normalize();

    if (keys.current.has('Space') && isGrounded.current) {
      velocity.current.y = JUMP_FORCE;
      isGrounded.current = false;
    }

    if (!isGrounded.current) {
      velocity.current.y += GRAVITY * dt;
    }

    const pos = camera.position.clone();

    const newX = pos.x + moveDir.x * speed * dt;
    if (!checkCollision(newX, pos.y, pos.z)) {
      pos.x = newX;
    }

    const newZ = pos.z + moveDir.z * speed * dt;
    if (!checkCollision(pos.x, pos.y, newZ)) {
      pos.z = newZ;
    }

    const newY = pos.y + velocity.current.y * dt;
    if (!checkCollision(pos.x, newY, pos.z)) {
      pos.y = newY;
      if (velocity.current.y <= 0) {
        const ground = getGroundY(pos.x, pos.y, pos.z);
        if (ground !== null) {
          pos.y = ground + PLAYER_HEIGHT;
          velocity.current.y = 0;
          isGrounded.current = true;
        } else {
          isGrounded.current = false;
        }
      } else {
        isGrounded.current = false;
      }
    } else {
      if (velocity.current.y < 0) {
        const landingY = getGroundY(pos.x, newY, pos.z);
        if (landingY !== null) {
          pos.y = landingY + PLAYER_HEIGHT;
          isGrounded.current = true;
        } else {
          isGrounded.current = false;
        }
      } else {
        isGrounded.current = false;
      }
      velocity.current.y = 0;
    }

    if (pos.y < -10) {
      pos.set(8, 25, 8);
      velocity.current.set(0, 0, 0);
    }

    camera.position.copy(pos);

    if (onPositionChange) {
      const cx = Math.floor(pos.x);
      const cz = Math.floor(pos.z);
      if (Math.abs(cx - lastChunkCheck.current.x) > 8 || Math.abs(cz - lastChunkCheck.current.z) > 8) {
        lastChunkCheck.current = { x: cx, z: cz };
        onPositionChange(pos.x, pos.z);
      }
    }
  });

  return <PointerLockControls ref={controlsRef} />;
}
