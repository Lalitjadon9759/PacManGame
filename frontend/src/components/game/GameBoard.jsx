import React from "react";

const GameBoard = ({ maze, children }) => {
  const renderCell = (cell, x, y) => {
    switch (cell) {
      case 1: // Wall
        return (
          <div
            key={`${x}-${y}`}
            className="w-5 h-5 bg-blue-600 border border-blue-800"
          />
        );
      case 2: // Regular Pellet
        return (
          <div
            key={`${x}-${y}`}
            className="w-5 h-5 flex items-center justify-center bg-black"
          >
            <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
          </div>
        );
      case 3: // Power Pellet
        return (
          <div
            key={`${x}-${y}`}
            className="w-5 h-5 flex items-center justify-center bg-black"
          >
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        );
      case 4: // Ghost House (from your maze data)
        return <div key={`${x}-${y}`} className="w-5 h-5 bg-gray-800" />;
      case 5: // Tunnel (from your maze data)
        return <div key={`${x}-${y}`} className="w-5 h-5 bg-black" />;
      case 0: // Empty space
      default:
        return <div key={`${x}-${y}`} className="w-5 h-5 bg-black" />;
    }
  };

  return (
    <div className="relative bg-black p-4 rounded-lg inline-block">
      <div className="grid grid-cols-28 gap-0">
        {maze.map((row, y) => row.map((cell, x) => renderCell(cell, x, y)))}
      </div>
      <div className="absolute top-4 left-4">{children}</div>
    </div>
  );
};

export default GameBoard;
