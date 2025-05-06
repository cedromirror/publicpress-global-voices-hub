
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Mail, 
  MessageCircle, 
  Share2
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pp-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-pp-blue mr-2" />
              <span className="text-xl font-playfair font-bold">
                PublicPress<span className="text-pp-blue">.</span>
              </span>
            </div>
            <p className="text-sm mb-4 text-gray-300">
              The next-generation platform empowering journalists to create, share, and monetize impactful stories worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/stories" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Stories
                </Link>
              </li>
              <li>
                <Link to="/journalists" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Journalists
                </Link>
              </li>
              <li>
                <Link to="/topics" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Topics
                </Link>
              </li>
              <li>
                <Link to="/regions" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Regions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Journalists</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/publish" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Publish Your Story
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Storytelling Tools
                </Link>
              </li>
              <li>
                <Link to="/monetize" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Monetization
                </Link>
              </li>
              <li>
                <Link to="/verification" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Get Verified
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} PublicPress. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
