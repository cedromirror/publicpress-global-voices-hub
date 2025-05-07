
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, ChevronRight, Volume2, Newspaper, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSources = [
    "/audio/en-welcome.mp3",
    "/audio/es-welcome.mp3",
    "/audio/fr-welcome.mp3",
  ];
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSources[currentAudioIndex]);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        // Move to the next audio in the playlist
        const nextIndex = (currentAudioIndex + 1) % audioSources.length;
        setCurrentAudioIndex(nextIndex);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Load the current audio
      audioRef.current.src = audioSources[currentAudioIndex];
      audioRef.current.play().catch(error => {
        console.error("Audio playback error:", error);
        toast({
          title: "Audio Error",
          description: "Could not play the audio file. Please try again.",
          variant: "destructive"
        });
        setIsPlaying(false);
      });
      setIsPlaying(true);
      
      toast({
        title: "Playing Global Voice",
        description: `Now playing welcome message in ${currentAudioIndex === 0 ? 'English' : currentAudioIndex === 1 ? 'Spanish' : 'French'}`,
        variant: "default"
      });
    }
  };

  const handlePublish = () => {
    toast({
      title: "Publishing Platform",
      description: "Start publishing your stories to a global audience today!",
      variant: "default"
    });
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Modern gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-pp-navy via-[#1E5F8C] to-pp-blue"></div>
      
      {/* Animated patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute h-full w-full">
          {Array.from({ length: 30 }).map((_, i) => (
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
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white text-center md:text-left mb-10 md:mb-0">
            <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Newspaper className="h-4 w-4 mr-2 text-pp-red" />
              <span className="text-sm font-medium">Global News Network</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-playfair">
              <span className="block">Empowering</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Global Voices
              </span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-200">
              The next-generation publishing platform where independent journalists create, share, and monetize 
              impactful stories with powerful multimedia tools.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-white text-pp-navy hover:bg-gray-100 px-6 shadow-lg"
                      onClick={handlePublish}
                    >
                      Start Publishing
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Publish stories to a global audience</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="text-white border-white hover:bg-white/10 px-6 gap-2"
                      onClick={toggleAudio}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                      Global Voices
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPlaying ? "Pause" : "Play"} welcome message in different languages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Modern 3D Globe Illustration */}
          <motion.div 
            className="md:w-1/2 flex justify-center md:justify-end"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ 
              duration: isPlaying ? 20 : 0,
              repeat: isPlaying ? Infinity : 0,
              ease: "linear" 
            }}
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              {/* Stylized globe visualization */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-700/50 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.3)]"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-tl from-blue-900/40 via-transparent to-blue-300/30 backdrop-blur-sm"></div>
              
              {/* News points on globe */}
              <div className="absolute h-3 w-3 rounded-full bg-pp-red top-[30%] left-[20%] shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
              <div className="absolute h-2 w-2 rounded-full bg-pp-red top-[60%] left-[70%] shadow-[0_0_8px_rgba(220,38,38,0.7)]"></div>
              <div className="absolute h-2 w-2 rounded-full bg-pp-red top-[20%] left-[60%] shadow-[0_0_8px_rgba(220,38,38,0.7)]"></div>
              <div className="absolute h-4 w-4 rounded-full bg-pp-red top-[45%] left-[35%] shadow-[0_0_12px_rgba(220,38,38,0.9)]"></div>
              
              {/* Longitude/Latitude lines */}
              <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/5" style={{transform: 'rotateX(60deg)'}}></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/5" style={{transform: 'rotateY(60deg)'}}></div>
              
              {/* Globe overlay */}
              <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50 h-24 w-24" />
            </div>
          </motion.div>
        </div>
        
        {/* Floating news tags */}
        <div className="mt-8 md:mt-16 flex flex-wrap justify-center gap-4">
          {["Politics", "Environment", "Technology", "Health", "Economy"].map((tag) => (
            <motion.div 
              key={tag}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
