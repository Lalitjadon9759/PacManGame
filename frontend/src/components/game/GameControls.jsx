import React from "react";

import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

const GameControls = () => {
  const handleStartGame = () => {
    dispatch({ type: "START_GAME" });
  };

  const handlePauseGame = () => {
    dispatch({ type: "PAUSE_GAME" });
  };

  const handleResetGame = () => {
    dispatch({ type: "START_GAME" });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {state.gameStatus === "idle" || state.gameStatus === "gameOver" ? (
          <Button
            onClick={handleStartGame}
            className="col-span-2 bg-green-600 hover:bg-green-700"
          >
            <Play className="mr-2" size={20} />
            Start Game
          </Button>
        ) : (
          <>
            <Button
              onClick={handlePauseGame}
              variant={state.gameStatus === "paused" ? "default" : "secondary"}
            >
              {state.gameStatus === "paused" ? (
                <Play size={20} />
              ) : (
                <Pause size={20} />
              )}
            </Button>

            <Button onClick={handleResetGame} variant="destructive">
              <RotateCcw size={20} />
            </Button>
          </>
        )}
      </div>

      <div className="text-center text-sm text-gray-400">
        <p>Use arrow keys to move</p>
        <p>Press SPACE to pause</p>
      </div>
    </div>
  );
};

export default GameControls;
