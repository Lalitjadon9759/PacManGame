import React from "react";
import { Card, CardContent } from "../ui/card";
import { Heart, Trophy, Zap } from "lucide-react";

const GameStats = ({ score, lives, level }) => {
  return (
    <div className="flex gap-4 mb-4">
      <Card className="bg-black border-maze-blue">
        <CardContent className="flex items-center gap-2 p-3">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">Score: {score}</span>
        </CardContent>
      </Card>

      <Card className="bg-black border-maze-blue">
        <CardContent className="flex items-center gap-2 p-3">
          <Heart className="w-5 h-5 text-red-500" />
          <span className="text-white font-bold">Lives: {lives}</span>
        </CardContent>
      </Card>

      <Card className="bg-black border-maze-blue">
        <CardContent className="flex items-center gap-2 p-3">
          <Zap className="w-5 h-5 text-blue-400" />
          <span className="text-white font-bold">Level: {level}</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameStats;
