import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">
        About Pac-Man
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">The Game</h2>
          <p className="text-gray-300 mb-4">
            Pac-Man is a classic arcade game that was first released in 1980.
            This web version brings the timeless gameplay to your browser with
            modern web technologies.
          </p>
          <p className="text-gray-300">
            Navigate through the maze, eat all the dots, avoid the ghosts, and
            use power pellets strategically to turn the tables on your pursuers!
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-400">
            Technologies
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              • <span className="font-semibold">React</span> - UI Framework
            </li>
            <li>
              • <span className="font-semibold">Vite</span> - Build Tool
            </li>
            <li>
              • <span className="font-semibold">Tailwind CSS</span> - Styling
            </li>
            <li>
              • <span className="font-semibold">Shadcn UI</span> - Components
            </li>
            <li>
              • <span className="font-semibold">Node.js & Express</span> -
              Backend
            </li>
            <li>
              • <span className="font-semibold">MongoDB</span> - Database
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">
          Game Controls
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <h3 className="font-semibold mb-2">Movement</h3>
            <ul className="space-y-1">
              <li>↑ Arrow Up - Move Up</li>
              <li>↓ Arrow Down - Move Down</li>
              <li>← Arrow Left - Move Left</li>
              <li>→ Arrow Right - Move Right</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Game</h3>
            <ul className="space-y-1">
              <li>Space - Pause/Resume</li>
              <li>Enter - Start Game</li>
              <li>Esc - Exit to Menu</li>
              <li>M - Mute/Unmute Sound</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Ghost Behaviors
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <h3 className="font-semibold text-red-500">Blinky (Red)</h3>
            <p>The aggressive one - directly chases Pac-Man</p>
          </div>
          <div>
            <h3 className="font-semibold text-pink-400">Pinky (Pink)</h3>
            <p>The ambusher - tries to get ahead of Pac-Man</p>
          </div>
          <div>
            <h3 className="font-semibold text-cyan-400">Inky (Cyan)</h3>
            <p>The unpredictable one - uses complex targeting</p>
          </div>
          <div>
            <h3 className="font-semibold text-orange-400">Clyde (Orange)</h3>
            <p>The random one - alternates between chase and scatter</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com"
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://twitter.com"
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:contact@example.com"
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
