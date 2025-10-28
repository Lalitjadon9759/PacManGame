import { useCallback, useEffect } from "react";
import { useGame } from "../context/GameContext";
import { CELL_TYPES, DIRECTIONS } from "../utils/gameConstants";

const useGameLogic = () => {
  const { state, dispatch } = useGame();

  const checkCollision = useCallback((position, maze) => {
    const cell = maze[position.y]?.[position.x];
    return cell === CELL_TYPES.WALL;
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      if (
        state.gameStatus !== "playing" &&
        e.key !== " " &&
        e.key !== "Enter"
      ) {
        return;
      }

      const keyMap = {
        ArrowUp: DIRECTIONS.UP,
        ArrowDown: DIRECTIONS.DOWN,
        ArrowLeft: DIRECTIONS.LEFT,
        ArrowRight: DIRECTIONS.RIGHT,
        w: DIRECTIONS.UP,
        s: DIRECTIONS.DOWN,
        a: DIRECTIONS.LEFT,
        d: DIRECTIONS.RIGHT,
      };

      if (e.key === " ") {
        e.preventDefault();
        dispatch({ type: "PAUSE_GAME" });
        return;
      }

      if (e.key === "Enter" && state.gameStatus === "idle") {
        dispatch({ type: "START_GAME" });
        return;
      }

      const direction = keyMap[e.key];
      if (direction) {
        e.preventDefault();
        const newPosition = {
          x: state.pacmanPosition.x + direction.x,
          y: state.pacmanPosition.y + direction.y,
        };

        // Handle tunnel wrapping
        if (newPosition.x < 0) newPosition.x = state.maze[0].length - 1;
        if (newPosition.x >= state.maze[0].length) newPosition.x = 0;

        if (!checkCollision(newPosition, state.maze)) {
          dispatch({
            type: "MOVE_PACMAN",
            payload: { position: newPosition, direction },
          });
        }
      }
    },
    [state, dispatch, checkCollision]
  );

  const moveGhosts = useCallback(() => {
    state.ghosts.forEach((ghost) => {
      // Simple AI: Random movement for now
      const possibleDirections = [
        DIRECTIONS.UP,
        DIRECTIONS.DOWN,
        DIRECTIONS.LEFT,
        DIRECTIONS.RIGHT,
      ];

      const validDirections = possibleDirections.filter((dir) => {
        const newPos = {
          x: ghost.position.x + dir.x,
          y: ghost.position.y + dir.y,
        };
        return !checkCollision(newPos, state.maze);
      });

      if (validDirections.length > 0) {
        const randomDir =
          validDirections[Math.floor(Math.random() * validDirections.length)];
        const newPosition = {
          x: ghost.position.x + randomDir.x,
          y: ghost.position.y + randomDir.y,
        };

        dispatch({
          type: "MOVE_GHOST",
          payload: {
            name: ghost.name,
            position: newPosition,
            direction: randomDir,
          },
        });
      }
    });
  }, [state.ghosts, state.maze, dispatch, checkCollision]);

  const checkDotCollection = useCallback(() => {
    const { x, y } = state.pacmanPosition;
    const cell = state.maze[y][x];

    if (cell === CELL_TYPES.DOT) {
      dispatch({ type: "EAT_DOT", payload: { x, y } });
    } else if (cell === CELL_TYPES.POWER_PELLET) {
      dispatch({ type: "EAT_POWER_PELLET", payload: { x, y } });
    }

    if (state.dotsRemaining === 0) {
      dispatch({ type: "NEXT_LEVEL" });
    }
  }, [state.pacmanPosition, state.maze, state.dotsRemaining, dispatch]);

  const checkGhostCollision = useCallback(() => {
    state.ghosts.forEach((ghost) => {
      if (
        ghost.position.x === state.pacmanPosition.x &&
        ghost.position.y === state.pacmanPosition.y
      ) {
        if (state.powerMode && !ghost.isEaten) {
          dispatch({ type: "EAT_GHOST", payload: ghost.name });
        } else if (!ghost.isEaten) {
          dispatch({ type: "LOSE_LIFE" });
        }
      }
    });
  }, [state.ghosts, state.pacmanPosition, state.powerMode, dispatch]);

  const updateGame = useCallback(() => {
    if (state.gameStatus !== "playing") return;

    checkDotCollection();
    checkGhostCollision();
    moveGhosts();

    if (state.powerMode) {
      dispatch({ type: "UPDATE_POWER_MODE", payload: 100 });
    }
  }, [
    state.gameStatus,
    state.powerMode,
    checkDotCollection,
    checkGhostCollision,
    moveGhosts,
    dispatch,
  ]);

  return {
    handleKeyPress,
    updateGame,
  };
};

export default useGameLogic;
