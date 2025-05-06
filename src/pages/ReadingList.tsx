
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoryCard from '@/components/stories/StoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { featuredStories } from '@/lib/data';
import { Search, BookmarkX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReadingList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  // In a real app, this would be fetched from a database or local storage
  const [savedStories, setSavedStories] = useState<any[]>([]);
  
  // Simulate loading saved stories (in a real app, this would come from an API or local storage)
  useEffect(() => {
    // For demo purposes, we'll just take some random stories from the featured stories
    const randomStories = [...featuredStories]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
      
    setSavedStories(randomStories);
  }, []);
  
  const handleRemoveStory = (storyId: string) => {
    setSavedStories(savedStories.filter(story => story.id !== storyId));
    
    toast({
      title: "Story removed",
      description: "The story has been removed from your reading list.",
    });
  };
  
  const filteredStories = savedStories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    story.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-pp-gray to-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">Your Reading List</h1>
            <p className="text-muted-foreground">Stories you've saved for later</p>
          </div>
          
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search your saved stories..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline" onClick={() => setSavedStories([])}>
                Clear All
              </Button>
            </div>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>
                {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} saved
              </span>
            </div>
          </div>
          
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <div key={story.id} className="relative">
                  <Button 
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10 rounded-full w-8 h-8"
                    onClick={() => handleRemoveStory(story.id)}
                  >
                    <BookmarkX className="h-4 w-4" />
                    <span className="sr-only">Remove from reading list</span>
                  </Button>
                  
                  <Link 
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <BookmarkX className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-2">Your reading list is empty</p>
              <p className="text-muted-foreground mb-6">Save stories to read later by clicking the bookmark icon</p>
              <Link to="/stories">
                <Button>Discover Stories</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReadingList;
