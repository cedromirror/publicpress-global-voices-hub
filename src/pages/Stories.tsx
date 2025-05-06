
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
import { Filter, Search, SortAsc, SortDesc, Calendar, TrendingUp, MessageCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<string>("popular"); // popular, newest, mostCommented
  const [isAscending, setIsAscending] = useState(false);
  
  // Sort stories based on current sorting options
  const sortStories = (stories: any[]) => {
    let sortedStories;
    
    if (sortBy === "newest") {
      sortedStories = [...stories].sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return isAscending 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      });
    } else if (sortBy === "mostCommented") {
      sortedStories = [...stories].sort((a, b) => 
        isAscending ? a.commentsCount - b.commentsCount : b.commentsCount - a.commentsCount
      );
    } else {
      // Default: popular - sort by views
      sortedStories = [...stories].sort((a, b) => 
        isAscending ? a.viewsCount - b.viewsCount : b.viewsCount - a.viewsCount
      );
    }
    
    return sortedStories;
  };
  
  const filteredStories = sortStories(featuredStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = activeRegion === 'All' || story.region === activeRegion;
    const matchesCategory = activeCategory === 'All' || story.category === activeCategory;
    
    return matchesSearch && matchesRegion && matchesCategory;
  }));

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
              
              <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 whitespace-nowrap">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[220px]">
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Sort by</p>
                      <Select
                        value={sortBy}
                        onValueChange={setSortBy}
                      >
                        <SelectTrigger className="w-full mb-2">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popular">
                            <div className="flex items-center">
                              <TrendingUp className="mr-2 h-4 w-4" />
                              <span>Popular</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="newest">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>Newest</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="mostCommented">
                            <div className="flex items-center">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              <span>Most Commented</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsAscending(!isAscending)} 
                        className="w-full justify-start"
                      >
                        {isAscending ? (
                          <><SortAsc className="mr-2 h-4 w-4" /> Ascending</>
                        ) : (
                          <><SortDesc className="mr-2 h-4 w-4" /> Descending</>
                        )}
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveRegion('All');
                    setActiveCategory('All');
                    setSortBy('popular');
                    setIsAscending(false);
                  }}
                >
                  Reset Filters
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {sortBy === "popular" && <TrendingUp className="h-4 w-4" />}
                  {sortBy === "newest" && <Calendar className="h-4 w-4" />}
                  {sortBy === "mostCommented" && <MessageCircle className="h-4 w-4" />}
                  {sortBy === "popular" ? "Popular" : sortBy === "newest" ? "Newest" : "Most Commented"}
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
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>
                {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
              </span>
            </div>
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
