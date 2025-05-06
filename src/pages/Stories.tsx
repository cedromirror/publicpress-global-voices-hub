
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoryCard from '@/components/stories/StoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { featuredStories, regions, topCategories } from '@/lib/data';
import { Filter, Search } from 'lucide-react';

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredStories = featuredStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = activeRegion === 'All' || story.region === activeRegion;
    const matchesCategory = activeCategory === 'All' || story.category === activeCategory;
    
    return matchesSearch && matchesRegion && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-pp-gray to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">Stories</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest stories from our global network of journalists
            </p>
          </div>
          
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search stories..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="default" size="sm">
                  Latest
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="mb-4 w-full md:w-auto">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="regions">Regions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories" className="mt-0">
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    className={`cursor-pointer ${activeCategory === 'All' ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                    onClick={() => setActiveCategory('All')}
                  >
                    All
                  </Badge>
                  {topCategories.slice(0, 8).map((category) => (
                    <Badge 
                      key={category}
                      className={`cursor-pointer ${activeCategory === category ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="regions" className="mt-0">
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    className={`cursor-pointer ${activeRegion === 'All' ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                    onClick={() => setActiveRegion('All')}
                  >
                    All
                  </Badge>
                  {regions.map((region) => (
                    <Badge 
                      key={region}
                      className={`cursor-pointer ${activeRegion === region ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                      onClick={() => setActiveRegion(region)}
                    >
                      {region}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <Link 
                  key={story.id}
                  to={`/stories/${story.id}`}
                  className="block transition-transform duration-300 hover:-translate-y-1"
                >
                  <StoryCard
                    id={story.id}
                    title={story.title}
                    excerpt={story.excerpt}
                    coverImage={story.coverImage}
                    author={story.author}
                    publishedAt={story.publishedAt}
                    category={story.category}
                    region={story.region}
                    readTime={story.readTime}
                    commentsCount={story.commentsCount}
                    likesCount={story.likesCount}
                    viewsCount={story.viewsCount}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No stories found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setActiveRegion('All');
                  setActiveCategory('All');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Stories;
