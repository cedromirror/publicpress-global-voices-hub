
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { regions, topCategories } from '@/lib/data';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

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

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {topCategories.map((category) => (
                      <li key={category}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/stories?category=${category}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{category}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Regions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {regions.map((region) => (
                      <li key={region}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/stories?region=${region}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{region}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4 animate-fade-in z-50">
          <Link 
            to="/" 
            className={`${isActive("/")} py-2`}
            onClick={toggleMenu}
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center py-2">
              <span className={`${isActive("/categories")} flex items-center`}>Categories <ChevronDown className="ml-1 h-4 w-4" /></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {topCategories.map((category) => (
                <DropdownMenuItem key={category} asChild>
                  <Link to={`/stories?category=${category}`} onClick={toggleMenu}>
                    {category}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center py-2">
              <span className={`${isActive("/regions")} flex items-center`}>Regions <ChevronDown className="ml-1 h-4 w-4" /></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {regions.map((region) => (
                <DropdownMenuItem key={region} asChild>
                  <Link to={`/stories?region=${region}`} onClick={toggleMenu}>
                    {region}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
