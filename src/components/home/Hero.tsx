
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe, ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pp-navy to-pp-blue text-white py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute h-full w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <Globe 
              key={i} 
              className="absolute text-white" 
              style={{
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                transform: `scale(${Math.random() * 1.5 + 0.5})`,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-playfair">
          Empowering Journalists. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Amplifying Global Voices.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
          The next-generation publishing platform where independent journalists create, share, and monetize impactful stories with powerful multimedia tools.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-pp-navy hover:bg-gray-100 px-6">
            Start Publishing
          </Button>
          
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-6">
            Explore Stories <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
