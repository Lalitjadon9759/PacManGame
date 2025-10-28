import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "../components/game/GameBoard";
import PacMan from "../components/game/PacMan";
import Ghost from "../components/game/Ghost";
import GameStats from "../components/game/GameStats";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

import { INITIAL_MAZE, DIRECTIONS } from "../utils/gameConstants";
import {
  Play,
  Pause,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import axios from "axios";

const Game = () => {
  const [maze, setMaze] = useState(INITIAL_MAZE);
  const [pacmanPos, setPacmanPos] = useState({ x: 14, y: 23 });
  const [pacmanDir, setPacmanDir] = useState("RIGHT");
  // Initialize ghosts with names
  const [ghosts, setGhosts] = useState([
    { id: 1, position: { x: 14, y: 11 }, color: "red", name: "blinky" },
    { id: 2, position: { x: 13, y: 14 }, color: "pink", name: "pinky" },
    { id: 3, position: { x: 14, y: 14 }, color: "cyan", name: "inky" },
    { id: 4, position: { x: 15, y: 14 }, color: "orange", name: "clyde" },
  ]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState("ready");
  const [isMoving, setIsMoving] = useState(false);
  const [powerMode, setPowerMode] = useState(false);

  const checkCollision = (position) => {
    return maze[position.y] && maze[position.y][position.x] !== 1;
  };

  const movePacman = useCallback(
    (direction) => {
      if (gameState !== "playing") return;

      const dirMap = {
        UP: DIRECTIONS.UP,
        DOWN: DIRECTIONS.DOWN,
        LEFT: DIRECTIONS.LEFT,
        RIGHT: DIRECTIONS.RIGHT,
      };

      const dir = dirMap[direction];
      if (!dir) return;

      setPacmanDir(direction);
      const newPos = {
        x: pacmanPos.x + dir.x,
        y: pacmanPos.y + dir.y,
      };

      // Handle tunnel
      if (newPos.x < 0) newPos.x = 27;
      if (newPos.x > 27) newPos.x = 0;

      if (checkCollision(newPos)) {
        setPacmanPos(newPos);
        setIsMoving(true);

        // Check for pellets
        const cell = maze[newPos.y][newPos.x];
        if (cell === 2) {
          setScore((prev) => prev + 10);
          const newMaze = [...maze];
          newMaze[newPos.y][newPos.x] = 0;
          setMaze(newMaze);
        } else if (cell === 3) {
          setScore((prev) => prev + 50);
          setPowerMode(true);
          setTimeout(() => setPowerMode(false), 10000);
          const newMaze = [...maze];
          newMaze[newPos.y][newPos.x] = 0;
          setMaze(newMaze);
        }
      }
    },
    [pacmanPos, gameState, maze]
  );

  const moveGhosts = useCallback(() => {
    if (gameState !== "playing") return;

    setGhosts((prevGhosts) =>
      prevGhosts.map((ghost) => {
        const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
        const randomDir =
          directions[Math.floor(Math.random() * directions.length)];
        const dirMap = {
          UP: DIRECTIONS.UP,
          DOWN: DIRECTIONS.DOWN,
          LEFT: DIRECTIONS.LEFT,
          RIGHT: DIRECTIONS.RIGHT,
        };
        const dir = dirMap[randomDir];

        const newPos = {
          x: ghost.position.x + dir.x,
          y: ghost.position.y + dir.y,
        };

        // Handle tunnel
        if (newPos.x < 0) newPos.x = 27;
        if (newPos.x > 27) newPos.x = 0;

        if (checkCollision(newPos)) {
          return { ...ghost, position: newPos };
        }
        return ghost;
      })
    );
  }, [gameState]);

  const checkGhostCollision = useCallback(() => {
    ghosts.forEach((ghost) => {
      if (
        ghost.position.x === pacmanPos.x &&
        ghost.position.y === pacmanPos.y
      ) {
        if (powerMode) {
          setScore((prev) => prev + 200);
          setGhosts((prev) => prev.filter((g) => g.id !== ghost.id));
        } else {
          setLives((prev) => prev - 1);
          setPacmanPos({ x: 14, y: 23 });
          if (lives <= 1) {
            setGameState("gameOver");
          }
        }
      }
    });
  }, [ghosts, pacmanPos, powerMode, lives]);
  
useEffect(() => {
  if (gameState === "gameOver") {
    const saveScore = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("⚠️ No token found. Score not saved.");
          return;
        }

        const payload = {
          player: user?.name || "Guest",
          score,
          level,
          date: new Date().toISOString(),
        };

        const response = await axios.post(
          "http://localhost:3000/api/score/newScore",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Score saved successfully:", response.data);
      } catch (error) {
        console.error("❌ Error saving score:", error.response?.data || error);
      }
    };

    saveScore();
  }
}, [gameState, score, level]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setLives(3);
    setLevel(1);
    setPacmanPos({ x: 14, y: 23 });
    setMaze(INITIAL_MAZE);
    setGhosts([
      { id: 1, position: { x: 14, y: 11 }, color: "red" },
      { id: 2, position: { x: 13, y: 14 }, color: "pink" },
      { id: 3, position: { x: 14, y: 14 }, color: "cyan" },
      { id: 4, position: { x: 15, y: 14 }, color: "orange" },
    ]);
  };

  const pauseGame = () => {
    setGameState(gameState === "paused" ? "playing" : "paused");
  };

  const resetGame = () => {
    setGameState("ready");
    startGame();
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      const keyMap = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT",
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        movePacman(keyMap[e.key]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePacman]);

  // Ghost movement interval
  useEffect(() => {
    const interval = setInterval(moveGhosts, 500);
    return () => clearInterval(interval);
  }, [moveGhosts]);

  // Check collisions
  useEffect(() => {
    checkGhostCollision();
  }, [pacmanPos, ghosts, checkGhostCollision]);

  // Check win condition
  useEffect(() => {
    const pelletCount = maze
      .flat()
      .filter((cell) => cell === 2 || cell === 3).length;
    if (pelletCount === 0 && gameState === "playing") {
      setLevel((prev) => prev + 1);
      setMaze(INITIAL_MAZE);
      setPacmanPos({ x: 14, y: 23 });
    }
  }, [maze, gameState]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="bg-gray-800 border-maze-blue">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-pacman-yellow">
              PAC-MAN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GameStats score={score} lives={lives} level={level} />

            <div className="flex justify-center mb-4">
              <GameBoard maze={maze}>
                <PacMan
                  position={pacmanPos}
                  direction={pacmanDir}
                  isMoving={isMoving}
                />
                {ghosts.map((ghost) => (
                  <Ghost key={ghost.id} {...ghost} isScared={powerMode} />
                ))}
              </GameBoard>
            </div>

            <div className="flex justify-center gap-4 mb-4">
              {gameState === "ready" && (
                <Button
                  onClick={startGame}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="mr-2" /> Start Game
                </Button>
              )}

              {(gameState === "playing" || gameState === "paused") && (
                <>
                  <Button
                    onClick={pauseGame}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    {gameState === "paused" ? (
                      <Play className="mr-2" />
                    ) : (
                      <Pause className="mr-2" />
                    )}
                    {gameState === "paused" ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    onClick={resetGame}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <RotateCcw className="mr-2" /> Reset
                  </Button>
                </>
              )}

              {gameState === "gameOver" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-red-500 mb-4">
                    Game Over!
                  </h2>
                  <p className="text-white mb-4">Final Score: {score}</p>
                  <Button
                    onClick={startGame}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <RotateCcw className="mr-2" /> Play Again
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <Button
                  onClick={() => movePacman("UP")}
                  className="bg-gray-700 hover:bg-gray-600"
                  disabled={gameState !== "playing"}
                >
                  <ArrowUp />
                </Button>
                <div></div>
                <Button
                  onClick={() => movePacman("LEFT")}
                  className="bg-gray-700 hover:bg-gray-600"
                  disabled={gameState !== "playing"}
                >
                  <ArrowLeft />
                </Button>
                <Button
                  onClick={() => movePacman("DOWN")}
                  className="bg-gray-700 hover:bg-gray-600"
                  disabled={gameState !== "playing"}
                >
                  <ArrowDown />
                </Button>
                <Button
                  onClick={() => movePacman("RIGHT")}
                  className="bg-gray-700 hover:bg-gray-600"
                  disabled={gameState !== "playing"}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>

            <div className="text-center mt-4 text-gray-400">
              <p>Use Arrow Keys or WASD to move</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Game;
