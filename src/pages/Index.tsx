
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturesList from '@/components/home/FeaturesList';
import TrustedBy from '@/components/home/TrustedBy';
import CallToAction from '@/components/home/CallToAction';
import StoryCard from '@/components/stories/StoryCard';
import { Button } from '@/components/ui/button';
import { featuredStories, topCategories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Get top featured stories for the main display
  const topFeaturedStories = featuredStories
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 6)
    .map(story => ({...story, featured: true}));
    
  // Filter stories based on the selected category
  const displayedStories = activeCategory === "All" 
    ? topFeaturedStories
    : topFeaturedStories.filter(story => story.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2 font-playfair">Featured Stories</h2>
                <p className="text-muted-foreground">The latest and most impactful journalism from around the world</p>
              </div>
              <Link to="/stories">
                <Button variant="outline" className="hidden md:flex items-center">
                  View All Stories <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="mb-8 flex flex-wrap gap-2">
              <Badge 
                className={`cursor-pointer ${activeCategory === 'All' ? 'bg-pp-navy hover:bg-pp-navy/90 text-white' : 'bg-secondary text-foreground hover:bg-muted'}`}
                onClick={() => setActiveCategory('All')}
              >
                All
              </Badge>
              {topCategories.slice(0, 7).map((category) => (
                <Badge 
                  key={category}
                  className={`cursor-pointer ${activeCategory === category ? 'bg-pp-navy hover:bg-pp-navy/90 text-white' : 'bg-secondary text-foreground hover:bg-muted'}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              ))}
              <Link to="/stories">
                <Badge variant="outline" className="hover:bg-muted">More...</Badge>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedStories.length > 0 ? (
                displayedStories.map((story) => (
                  <StoryCard 
                    key={story.id} 
                    {...story} 
                    featured={story.featured}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-muted-foreground">No stories found for this category.</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link to="/stories">
                <Button variant="outline" className="w-full">
                  View All Stories
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <FeaturesList />
        <TrustedBy />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
