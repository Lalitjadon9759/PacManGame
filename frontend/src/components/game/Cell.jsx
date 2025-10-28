import React from 'react';
import { CELL_TYPES, CELL_SIZE } from '../../utils/gameConstants';

const Cell = ({ type, x, y }) => {
  const getCellContent = () => {
    switch (type) {
      case CELL_TYPES.WALL:
        return <div className="w-full h-full bg-blue-600"></div>;
      
      case CELL_TYPES.DOT:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        );
      
      case CELL_TYPES.POWER_PELLET:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        );
      
      case CELL_TYPES.GHOST_HOUSE:
        return <div className="w-full h-full bg-pink-900 opacity-50"></div>;
      
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute"
      style={{
        left: `${x * CELL_SIZE}px`,
        top: `${y * CELL_SIZE}px`,
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`
      }}
    >
      {getCellContent()}
    </div>
  );
};

export default Cell;