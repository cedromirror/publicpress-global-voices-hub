
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
import { ChevronRight, Flame, TrendingUp, Clock, Eye, MessageCircle } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("popular"); // popular, newest, mostCommented
  
  // Get all featured stories
  const allFeaturedStories = featuredStories.map(story => ({...story, featured: true}));
  
  // Sort stories based on current sorting option
  const sortStories = (stories: any[]) => {
    if (sortBy === "newest") {
      return [...stories].sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (sortBy === "mostCommented") {
      return [...stories].sort((a, b) => b.commentsCount - a.commentsCount);
    } else {
      // Default: popular - sort by views
      return [...stories].sort((a, b) => b.viewsCount - a.viewsCount);
    }
  };
  
  // Get top featured stories for the main display
  const topFeaturedStories = sortStories(allFeaturedStories).slice(0, 6);
    
  // Filter stories based on the selected category
  const displayedStories = activeCategory === "All" 
    ? topFeaturedStories
    : topFeaturedStories.filter(story => story.category === activeCategory);
    
  // Get trending stories (top 3 by views in the last period)
  const trendingStories = [...allFeaturedStories]
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Trending Stories Section */}
        <section className="py-10 bg-gradient-to-r from-pp-gray/20 to-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-6 gap-2">
              <Flame className="text-red-500 h-5 w-5" />
              <h2 className="text-2xl font-semibold">Trending Now</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trendingStories.map((story, index) => (
                <Link 
                  key={story.id}
                  to={`/stories/${story.id}`}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-pp-blue/10 text-pp-blue rounded-full font-bold">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-2">{story.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {story.viewsCount.toLocaleString()}
                      </span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs h-5">
                        {story.category}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2 font-playfair">Featured Stories</h2>
                <p className="text-muted-foreground">The latest and most impactful journalism from around the world</p>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      {sortBy === "popular" && <TrendingUp className="h-4 w-4" />}
                      {sortBy === "newest" && <Clock className="h-4 w-4" />}
                      {sortBy === "mostCommented" && <MessageCircle className="h-4 w-4" />}
                      Sort: {sortBy === "popular" ? "Popular" : sortBy === "newest" ? "Newest" : "Most Commented"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("popular")}>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      <span>Popular</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Newest</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("mostCommented")}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      <span>Most Commented</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link to="/stories" className="hidden md:block">
                  <Button variant="outline" className="flex items-center">
                    View All Stories <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
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
