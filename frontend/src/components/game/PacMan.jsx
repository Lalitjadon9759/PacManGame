import React from "react";
import { cn } from "../../utils/cn";

const pacmanGif = "https://media.tenor.com/JowhCmKT628AAAAi/oacmn.gif";

const PacMan = ({ position, direction, isMoving }) => {
  const getRotation = () => {
    switch (direction) {
      case "RIGHT":
        return "rotate-0 scale-x-100";
      case "DOWN":
        return "rotate-90";
      case "LEFT":
        return "rotate-0 scale-x-[-1]"; // Flip horizontally for left
      case "UP":
        return "-rotate-90";
      default:
        return "rotate-0";
    }
  };

  return (
    <div
      className={cn("absolute w-5 h-5 transition-all duration-200 z-10")}
      style={{
        left: `${position.x * 20}px`,
        top: `${position.y * 20}px`,
      }}
    >
      <img
        src={pacmanGif}
        alt="Pac-Man"
        className={cn("w-full h-full object-contain", getRotation())}
      />
    </div>
  );
};

export default PacMan;
