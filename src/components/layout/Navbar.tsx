
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path 
      ? "text-pp-blue font-medium" 
      : "text-foreground hover:text-pp-blue transition-colors";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Globe className="h-6 w-6 text-pp-blue mr-2" />
          <span className="text-xl font-playfair font-bold text-pp-navy">
            PublicPress<span className="text-pp-blue">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/stories" className={isActive("/stories")}>
            Stories
          </Link>
          <Link to="/journalists" className={isActive("/journalists")}>
            Journalists
          </Link>
          <Link to="/about" className={isActive("/about")}>
            About
          </Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4 animate-fade-in">
          <Link 
            to="/" 
            className={`${isActive("/")} py-2`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/stories" 
            className={`${isActive("/stories")} py-2`}
            onClick={toggleMenu}
          >
            Stories
          </Link>
          <Link 
            to="/journalists" 
            className={`${isActive("/journalists")} py-2`}
            onClick={toggleMenu}
          >
            Journalists
          </Link>
          <Link 
            to="/about" 
            className={`${isActive("/about")} py-2`}
            onClick={toggleMenu}
          >
            About
          </Link>
          <div className="flex flex-col gap-2 mt-2">
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="outline" className="w-full">
                Log In
              </Button>
            </Link>
            <Link to="/signup" onClick={toggleMenu}>
              <Button className="w-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
