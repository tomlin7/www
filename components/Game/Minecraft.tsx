"use client";

import React, { useState } from "react";
import GameScene from "./Voxel/GameScene";
import MenuScene from "./Voxel/MenuScene";

const Minecraft = ({ onClose }: { onClose: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {isPlaying ? (
        <GameScene />
      ) : (
        <MenuScene onPlay={() => setIsPlaying(true)} onClose={onClose} />
      )}
    </div>
  );
};

export default Minecraft;
