
import React from 'react';
import { Badge } from "@/components/ui/badge";

const regions = [
  "North America", "Europe", "Asia", "Africa", "South America", "Australia"
];

const TrustedBy = () => {
  return (
    <section className="py-16 bg-pp-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-playfair">
            Trusted by Journalists Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professional and independent journalists from around the globe.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {regions.map((region) => (
            <Badge 
              key={region}
              variant="outline" 
              className="bg-white text-foreground border-gray-200 py-2 px-4 text-sm"
            >
              {region}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pp-blue/20 rounded-full flex items-center justify-center text-pp-blue font-bold">
                JD
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">James Doe</h4>
                <p className="text-sm text-muted-foreground">Investigative Journalist, USA</p>
              </div>
            </div>
            <p className="italic text-gray-600">
              "PublicPress has transformed how I publish my investigative pieces, with powerful multimedia tools and direct reader engagement."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pp-blue/20 rounded-full flex items-center justify-center text-pp-blue font-bold">
                MS
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Maria Santos</h4>
                <p className="text-sm text-muted-foreground">Environmental Reporter, Brazil</p>
              </div>
            </div>
            <p className="italic text-gray-600">
              "The translation features allow my stories about the Amazon to reach global audiences while still connecting with local communities."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pp-blue/20 rounded-full flex items-center justify-center text-pp-blue font-bold">
                AK
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Ahmed Khan</h4>
                <p className="text-sm text-muted-foreground">Independent Journalist, Kenya</p>
              </div>
            </div>
            <p className="italic text-gray-600">
              "The monetization tools have allowed me to sustain my independent reporting and build a dedicated global readership."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
