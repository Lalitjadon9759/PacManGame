import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Gamepad2, Trophy, Info, Github } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-yellow-400 mb-4 animate-pulse">
          PAC-MAN
        </h1>
        <p className="text-xl text-gray-300">
          The classic arcade game reimagined for the web
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-800 rounded-lg p-6 border-2 border-yellow-400">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">How to Play</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Use arrow keys to move Pac-Man</li>
            <li>• Eat all dots to complete the level</li>
            <li>• Avoid ghosts or they'll catch you!</li>
            <li>• Eat power pellets to turn the tables</li>
            <li>• Score points and beat your high score</li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border-2 border-blue-400">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Features</h2>
          <ul className="space-y-2 text-gray-300">
            <li>✨ Classic gameplay mechanics</li>
            <li>👻 Four unique ghost AI behaviors</li>
            <li>🏆 Global leaderboard system</li>
            <li>🎮 Smooth controls and animations</li>
            <li>📱 Responsive design</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/game">
          <Button className="w-full h-20 text-lg bg-green-600 hover:bg-green-700">
            <Gamepad2 className="mr-2" size={24} />
            Play Now
          </Button>
        </Link>
        
        <Link to="/leaderboard">
          <Button className="w-full h-20 text-lg bg-purple-600 hover:bg-purple-700">
            <Trophy className="mr-2" size={24} />
            Leaderboard
          </Button>
        </Link>
        
        <Link to="/about">
          <Button className="w-full h-20 text-lg bg-blue-600 hover:bg-blue-700">
            <Info className="mr-2" size={24} />
            About
          </Button>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex space-x-8">
          {['blinky', 'pinky', 'inky', 'clyde'].map((ghost, index) => (
            <div
              key={ghost}
              className="w-12 h-12 animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <svg viewBox="0 0 20 20">
                <path
                  d="M 10 4 C 6 4 4 7 4 10 L 4 16 L 5 15 L 6 16 L 7 15 L 8 16 L 9 15 L 10 16 L 11 15 L 12 16 L 13 15 L 14 16 L 15 15 L 16 16 L 16 10 C 16 7 14 4 10 4"
                  fill={['#FF0000', '#FFB8FF', '#00FFFF', '#FFB851'][index]}
                />
                <circle cx="7" cy="8" r="1.5" fill="white" />
                <circle cx="13" cy="8" r="1.5" fill="white" />
                <circle cx="7" cy="8" r="1" fill="black" />
                <circle cx="13" cy="8" r="1" fill="black" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;