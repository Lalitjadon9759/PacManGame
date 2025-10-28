import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Gamepad2, Trophy, Info, LogIn, UserPlus, LogOut } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/game", label: "Play", icon: Gamepad2 },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <header className="bg-gray-800 border-b border-yellow-400">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
            <span className="text-2xl font-bold text-yellow-400">PAC-MAN</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === path
                    ? "bg-yellow-400 text-gray-900"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 transition"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-md hover:bg-yellow-300 transition font-medium"
                >
                  <UserPlus size={20} />
                  <span>Sign Up</span>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
