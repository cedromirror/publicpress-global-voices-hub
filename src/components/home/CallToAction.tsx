
import React from 'react';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-pp-blue to-pp-navy text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
          Ready to Share Your Stories with the World?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
          Join PublicPress today and become part of a global community of journalists creating impactful, multimedia-rich stories.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-pp-navy hover:bg-gray-100 px-8">
            Create Account
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-8">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
