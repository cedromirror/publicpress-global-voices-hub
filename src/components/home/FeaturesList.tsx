
import React from 'react';
import { 
  Image, 
  Video, 
  MapPin, 
  BarChart2, 
  Globe, 
  UserCheck, 
  MessageCircle, 
  Languages, 
  BadgeCheck
} from "lucide-react";

const features = [
  {
    icon: <Image className="h-6 w-6 text-pp-blue" />,
    title: "Multimedia Storytelling",
    description: "Create rich stories with text, images, videos, audio, timelines, maps, and interactive elements."
  },
  {
    icon: <UserCheck className="h-6 w-6 text-pp-blue" />,
    title: "Journalist Profiles",
    description: "Build verified profiles showcasing your expertise, published work, and growing audience."
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-pp-blue" />,
    title: "Audience Engagement",
    description: "Connect directly with readers through comments, polls, Q&As, and live events."
  },
  {
    icon: <Languages className="h-6 w-6 text-pp-blue" />,
    title: "Global Reach",
    description: "Translate stories to multiple languages and target specific regional audiences."
  },
  {
    icon: <BadgeCheck className="h-6 w-6 text-pp-blue" />,
    title: "Trust & Verification",
    description: "Build credibility with transparent sourcing, verification badges, and trust metrics."
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-pp-blue" />,
    title: "Analytics & Insights",
    description: "Access detailed performance metrics to understand your audience and optimize content."
  }
];

const FeaturesList = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-pp-blue/10 text-pp-blue rounded-full text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair">
            Powerful Tools for Modern Journalism
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create engaging stories, build your audience, and monetize your work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-card hover:shadow-hover transition-shadow transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="bg-pp-blue/10 p-4 rounded-xl inline-block mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-pp-blue font-medium hover:text-pp-navy transition-colors"
          >
            Explore all features
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
