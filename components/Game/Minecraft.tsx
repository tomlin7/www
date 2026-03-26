"use client";

import React, { useState } from "react";
import GameScene from "./Voxel/GameScene";
import MenuScene from "./Voxel/MenuScene";

const Minecraft = ({ onClose }: { onClose: () => void }) => {
  // Start directly in the game to skip menu animations
  const [isPlaying] = useState(true);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <GameScene />
    </div>
  );
};

export default Minecraft;
