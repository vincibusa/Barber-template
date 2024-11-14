import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiCalendar, FiUser, FiMenu, FiX, FiScissors } from "react-icons/fi";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-900 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FiScissors className="text-2xl" />
          <span className="text-xl font-bold">BarberBook Pro</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <FiHome /> <span>Home</span>
          </Link>
          <Link to="/booking" className="flex items-center space-x-2">
            <FiCalendar /> <span>Book Now</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-2">
            <FiUser /> <span>Profile</span>
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-blue-900 bg-opacity-95 z-40 pt-20">
          <div className="flex flex-col items-center space-y-6 p-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white flex items-center space-x-2">
              <FiHome /> <span>Home</span>
            </Link>
            <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="text-white flex items-center space-x-2">
              <FiCalendar /> <span>Book Now</span>
            </Link>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-white flex items-center space-x-2">
              <FiUser /> <span>Profile</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;