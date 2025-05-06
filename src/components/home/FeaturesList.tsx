
import React from 'react';
import { 
  Image, 
  Video, 
  Map, 
  Timeline, 
  Globe, 
  UserCheck, 
  MessageCircle, 
  Translate, 
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
    icon: <Translate className="h-6 w-6 text-pp-blue" />,
    title: "Global Reach",
    description: "Translate stories to multiple languages and target specific regional audiences."
  },
  {
    icon: <BadgeCheck className="h-6 w-6 text-pp-blue" />,
    title: "Trust & Verification",
    description: "Build credibility with transparent sourcing, verification badges, and trust metrics."
  },
  {
    icon: <Timeline className="h-6 w-6 text-pp-blue" />,
    title: "Analytics & Insights",
    description: "Access detailed performance metrics to understand your audience and optimize content."
  }
];

const FeaturesList = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
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
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-card hover:shadow-hover transition-shadow"
            >
              <div className="bg-pp-blue/10 p-3 rounded-full inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
