import React from "react";

import { Heart } from "lucide-react";

const ScoreBoard = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Score</span>
        <span className="text-2xl font-bold text-yellow-400">12</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-400">High Score</span>
        <span className="text-xl font-bold text-green-400">
          {/* High Score */} 1000
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-400">Level</span>
        <span className="text-xl font-bold">{state.level}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-400">Lives</span>
        <div className="flex space-x-1">{/* Lives */} 3</div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-400">Dots</span>
        <span className="text-lg">{state.dotsRemaining}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
