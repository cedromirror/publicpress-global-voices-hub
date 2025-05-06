
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
import { featuredStories, topCategories, journalists } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronRight, 
  Flame, 
  TrendingUp, 
  Clock, 
  Eye, 
  MessageCircle,
  Award,
  ScrollText,
  UserCheck,
  Globe,
  GlobeSearch
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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

  // Get verified journalists
  const verifiedJournalists = journalists
    .filter(j => j.verified)
    .sort((a, b) => b.storiesCount - a.storiesCount)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Main Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Column */}
              <div className="lg:w-2/3">
                {/* Featured Story */}
                <div className="mb-12">
                  <div className="mb-4 flex items-center">
                    <h2 className="text-2xl font-bold">Featured Story</h2>
                    <div className="ml-3 flex items-center">
                      <Badge className="bg-amber-500">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                  </div>
                  <Link to={`/stories/${allFeaturedStories[0].id}`}>
                    <div className="relative overflow-hidden rounded-xl group">
                      <img 
                        src={allFeaturedStories[0].coverImage} 
                        alt={allFeaturedStories[0].title} 
                        className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <Badge className="self-start mb-3 bg-pp-blue">
                          {allFeaturedStories[0].category}
                        </Badge>
                        <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">
                          {allFeaturedStories[0].title}
                        </h3>
                        <p className="text-white/80 mb-4 line-clamp-2">
                          {allFeaturedStories[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border border-white">
                              <AvatarImage src={allFeaturedStories[0].author.avatar} alt={allFeaturedStories[0].author.name} />
                              <AvatarFallback className="bg-pp-blue/20 text-pp-blue">
                                {allFeaturedStories[0].author.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-white text-sm">
                                {allFeaturedStories[0].author.name}
                                {allFeaturedStories[0].author.verified && (
                                  <span className="ml-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-sm">✓</span>
                                )}
                              </div>
                              <div className="text-white/70 text-xs flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {allFeaturedStories[0].readTime} min read
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-white/70 text-sm">
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {allFeaturedStories[0].viewsCount.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {allFeaturedStories[0].commentsCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
            
                {/* Top Stories */}
                <div className="mb-12">
                  <Tabs defaultValue="all" className="w-full">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Latest Stories</h2>
                      <div className="flex items-center">
                        <TabsList>
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="world">World</TabsTrigger>
                          <TabsTrigger value="tech">Tech</TabsTrigger>
                          <TabsTrigger value="science">Science</TabsTrigger>
                        </TabsList>
                      </div>
                    </div>
                    
                    <TabsContent value="all">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sortStories(allFeaturedStories).slice(1, 5).map((story) => (
                          <StoryCard key={story.id} {...story} />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="world">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sortStories(allFeaturedStories).filter(s => s.category === "Politics" || s.category === "World").slice(0, 4).map((story) => (
                          <StoryCard key={story.id} {...story} />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tech">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sortStories(allFeaturedStories).filter(s => s.category === "Technology").slice(0, 4).map((story) => (
                          <StoryCard key={story.id} {...story} />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="science">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sortStories(allFeaturedStories).filter(s => s.category === "Science" || s.category === "Environment").slice(0, 4).map((story) => (
                          <StoryCard key={story.id} {...story} />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="text-center mt-8">
                    <Link to="/stories">
                      <Button>
                        View All Stories
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3 space-y-8">
                {/* Trending Now Panel */}
                <Card className="overflow-hidden border-t-4 border-t-red-500">
                  <div className="bg-gradient-to-r from-red-50 to-white p-3 border-b">
                    <div className="flex items-center">
                      <Flame className="text-red-500 h-5 w-5 mr-2" />
                      <h3 className="font-bold text-lg">Trending Now</h3>
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {trendingStories.map((story, index) => (
                        <Link 
                          key={story.id}
                          to={`/stories/${story.id}`}
                          className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 mt-1">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium line-clamp-2">{story.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {story.viewsCount.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {story.readTime}m read
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Verified Journalists */}
                <Card className="overflow-hidden border-t-4 border-t-blue-500">
                  <div className="bg-gradient-to-r from-blue-50 to-white p-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <UserCheck className="text-blue-500 h-5 w-5 mr-2" />
                        <h3 className="font-bold text-lg">Verified Journalists</h3>
                      </div>
                      <Link to="/journalists" className="text-blue-600 text-sm hover:underline">
                        View All
                      </Link>
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {verifiedJournalists.map((journalist) => (
                        <Link 
                          key={journalist.id}
                          to={`/journalists/${journalist.id}`}
                          className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                        >
                          <Avatar className="h-10 w-10 border-2 border-blue-100">
                            <AvatarImage src={journalist.avatar} alt={journalist.name} />
                            <AvatarFallback>{journalist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="font-medium">{journalist.name}</h4>
                              <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 text-xs border-blue-200">
                                <Award className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{journalist.role}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Explore Categories */}
                <Card className="overflow-hidden border-t-4 border-t-green-500">
                  <div className="bg-gradient-to-r from-green-50 to-white p-3 border-b">
                    <div className="flex items-center">
                      <ScrollText className="text-green-500 h-5 w-5 mr-2" />
                      <h3 className="font-bold text-lg">Explore Topics</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {topCategories.map((category) => (
                        <Link key={category} to={`/stories?category=${category}`}>
                          <Badge variant="outline" className="hover:bg-gray-100 cursor-pointer">
                            {category}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Explore Regions */}
                <Card className="overflow-hidden border-t-4 border-t-purple-500">
                  <div className="bg-gradient-to-r from-purple-50 to-white p-3 border-b">
                    <div className="flex items-center">
                      <GlobeSearch className="text-purple-500 h-5 w-5 mr-2" />
                      <h3 className="font-bold text-lg">Explore Regions</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {["North America", "Europe", "Asia", "Africa", "South America", "Middle East", "Oceania"].map((region) => (
                        <Link key={region} to={`/stories?region=${region}`}>
                          <Badge variant="outline" className="hover:bg-gray-100 cursor-pointer">
                            {region}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
