import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { GHOST_COLORS, GHOST_GIFS, GHOST_NAMES } from "@/utils/gameConstants";

const Ghost = ({ position, color, isScared, id, name }) => {
  const [imageError, setImageError] = useState(false);

  // Map colors to ghost names
  const colorToName = {
    red: "blinky",
    pink: "pinky",
    cyan: "inky",
    orange: "clyde",
  };

  const ghostName = name || colorToName[color] || "blinky";

  // CSS fallback colors
  const ghostColors = {
    red: "bg-ghost-red",
    pink: "bg-ghost-pink",
    cyan: "bg-ghost-cyan",
    orange: "bg-ghost-orange",
  };

  // Select appropriate GIF
  const getGhostGif = () => {
    if (isScared) {
      return GHOST_GIFS.frightened;
    }
    return GHOST_GIFS[ghostName] || GHOST_GIFS.blinky;
  };

  // If image fails to load, show CSS version
  if (imageError) {
    return (
      <div
        className={cn(
          "absolute w-4 h-4 transition-all duration-200 animate-ghost-move z-10"
        )}
        style={{
          left: `${position.x * 20 + 2}px`,
          top: `${position.y * 20 + 2}px`,
        }}
      >
        <div
          className={cn(
            "w-full h-full rounded-t-full relative",
            isScared ? "bg-blue-600" : ghostColors[color]
          )}
        >
          <div className="absolute bottom-0 w-full h-1 flex">
            <div className="w-1/3 h-full rounded-bl-full bg-inherit"></div>
            <div className="w-1/3 h-full bg-inherit"></div>
            <div className="w-1/3 h-full rounded-br-full bg-inherit"></div>
          </div>
          <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1.5 left-1 w-0.5 h-0.5 bg-black rounded-full"></div>
          <div className="absolute top-1.5 right-1 w-0.5 h-0.5 bg-black rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute transition-all duration-200 z-10",
        isScared && "animate-pulse"
      )}
      style={{
        width: "20px",
        height: "20px",
        left: `${position.x * 20}px`,
        top: `${position.y * 20}px`,
      }}
    >
      <img
        src={getGhostGif()}
        alt={`${ghostName} ghost`}
        className="w-full h-full object-contain"
        onError={() => setImageError(true)}
        style={{
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
};

export default Ghost;
