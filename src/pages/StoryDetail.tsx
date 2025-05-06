
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CommentSection from '@/components/stories/CommentSection';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MessageCircle, 
  ThumbsUp, 
  Eye, 
  Share2, 
  Bookmark,
  TextSelect
} from 'lucide-react';
import { featuredStories, journalists } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

const StoryDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const story = featuredStories.find(s => s.id === id);
  const journalist = story ? journalists.find(j => j.name === story.author.name) : null;
  const [viewCount, setViewCount] = useState(story?.viewsCount || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showHighlightTooltip, setShowHighlightTooltip] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  
  // Increment view count when page loads
  useEffect(() => {
    if (story) {
      setViewCount(story.viewsCount + 1);
      
      // Show toast notification about view count
      toast({
        title: "Story view tracked",
        description: `You are viewer #${story.viewsCount + 1} of this story.`,
      });
    }
  }, [story, toast]);
  
  // Handle text selection for highlighting
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
      setShowHighlightTooltip(true);
    } else {
      setShowHighlightTooltip(false);
    }
  };
  
  const handleHighlight = () => {
    toast({
      title: "Text highlighted",
      description: "The selected text has been highlighted.",
    });
    setShowHighlightTooltip(false);
  };
  
  const handleLike = () => {
    setHasLiked(!hasLiked);
    toast({
      title: hasLiked ? "Like removed" : "Story liked",
      description: hasLiked ? "You've removed your like from this story." : "You've liked this story!",
    });
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Story bookmarked", 
      description: isBookmarked ? "This story has been removed from your bookmarks." : "This story has been added to your bookmarks.",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "The story link has been copied to your clipboard.",
    });
  };
  
  // Recommended stories - stories with the same category, excluding current story
  const recommendedStories = featuredStories
    .filter(s => s.id !== id && story && s.category === story.category)
    .slice(0, 3);
  
  if (!story) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Story not found</h1>
          <Link to="/stories" className="text-pp-blue hover:underline mt-4 inline-block">
            Back to Stories
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-pp-gray/50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <Link to="/stories" className="inline-flex items-center text-pp-blue hover:text-pp-navy">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to stories
            </Link>
            <div className="flex items-center gap-2">
              <Button 
                variant={isBookmarked ? "default" : "ghost"} 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleBookmark}
              >
                <Bookmark className="h-4 w-4" 
                  fill={isBookmarked ? "currentColor" : "none"} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="bg-pp-blue hover:bg-pp-blue/90">
                {story.category}
              </Badge>
              <Badge variant="outline" className="bg-gray-100">
                {story.region}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold leading-tight">
              {story.title}
            </h1>
            
            <p className="text-xl text-muted-foreground font-light">
              {story.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-pp-blue">
                  <AvatarImage src={story.author.avatar} alt={story.author.name} />
                  <AvatarFallback className="bg-pp-blue/20 text-pp-blue">
                    {story.author.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link 
                    to={journalist ? `/journalists/${journalist.id}` : '#'} 
                    className="font-medium hover:text-pp-blue transition-colors"
                  >
                    {story.author.name}
                    {story.author.verified && (
                      <Badge variant="outline" className="ml-1 py-0 px-1 h-4 border-pp-blue">
                        <span className="sr-only">Verified</span>
                        ✓
                      </Badge>
                    )}
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{story.publishedAt}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{story.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant={hasLiked ? "default" : "outline"} 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleLike}
                >
                  <ThumbsUp className="h-4 w-4" />
                  {hasLiked ? story.likesCount + 1 : story.likesCount}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {story.commentsCount}
                </Button>
              </div>
            </div>
            
            <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={story.coverImage} 
                alt={story.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {viewCount.toLocaleString()} views
              </div>
            </div>
            
            <div 
              className="prose prose-lg max-w-none story-content relative"
              onMouseUp={handleTextSelection}
              onTouchEnd={handleTextSelection}
            >
              <p>Climate change is rapidly transforming our global food systems in ways that many people don't yet fully understand. From shifting growing seasons to increased water scarcity, the challenges are mounting for farmers worldwide.</p>
              
              <p>In coastal regions, rising sea levels are causing saltwater intrusion into farmland, rendering once-fertile soil unusable. Meanwhile, in traditionally temperate regions, unpredictable weather patterns are disrupting planting schedules and increasing crop failures.</p>
              
              <blockquote>
                This is not just an environmental crisis but a humanitarian one as well. Food security experts predict that without significant adaptation measures, crop yields could decrease by up to 30% by 2050 in some regions.
              </blockquote>
              
              <p>The most vulnerable populations—often those who have contributed least to climate change—stand to suffer the most severe consequences. However, innovative approaches to agriculture are emerging. Vertical farming, drought-resistant crop varieties, and improved water management techniques offer promising solutions.</p>
              
              <p>Additionally, indigenous knowledge systems, which have adapted to local conditions over generations, are gaining recognition for their sustainability.</p>
              
              <p>The path forward will require unprecedented cooperation between governments, scientists, farmers, and consumers. Policy changes, technological innovation, and shifts in consumption patterns must all play a role in building resilient food systems for the future.</p>
              
              {showHighlightTooltip && selectedText && (
                <div className="absolute bg-white shadow-lg rounded-md p-2 z-10 flex">
                  <Button 
                    size="sm" 
                    onClick={handleHighlight}
                    className="flex items-center gap-1"
                  >
                    <TextSelect className="h-3 w-3" />
                    Highlight
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between py-4 border-t border-b">
              <div className="text-sm text-muted-foreground">
                Published under <Badge variant="outline">{story.category}</Badge>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant={hasLiked ? "default" : "outline"} 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleLike}
                >
                  <ThumbsUp className="h-4 w-4" />
                  {hasLiked ? "Liked" : "Like"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button 
                  variant={isBookmarked ? "default" : "outline"} 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleBookmark}
                >
                  <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Author section */}
          {journalist && (
            <Card className="mb-8 overflow-hidden border-none shadow-md bg-gradient-to-r from-white to-pp-gray/30">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <Avatar className="h-20 w-20 border-2 border-pp-blue">
                    <AvatarImage src={journalist.avatar} alt={journalist.name} />
                    <AvatarFallback className="bg-pp-blue/20 text-pp-blue">
                      {journalist.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-semibold mb-1">{journalist.name}</h3>
                    <p className="text-muted-foreground mb-3">{journalist.role}</p>
                    <p className="text-sm mb-4">{journalist.bio}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {journalist.expertise.slice(0, 3).map((area, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-100">
                          {area}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link to={`/journalists/${journalist.id}`}>
                      <Button variant="outline" size="sm" className="mt-4">
                        View profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Comment section */}
          <div className="mb-8">
            <CommentSection storyId={story.id} commentsCount={story.commentsCount} />
          </div>
          
          {/* Recommended stories */}
          {recommendedStories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-playfair font-bold mb-6">Related Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedStories.map(recStory => (
                  <Link 
                    key={recStory.id}
                    to={`/stories/${recStory.id}`}
                    className="block group"
                  >
                    <div className="h-48 rounded-lg overflow-hidden mb-3 relative">
                      <img 
                        src={recStory.coverImage} 
                        alt={recStory.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <Badge className="absolute top-2 left-2 bg-pp-blue">
                        {recStory.category}
                      </Badge>
                    </div>
                    <h3 className="font-medium mb-1 group-hover:text-pp-blue transition-colors">
                      {recStory.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {recStory.readTime} min read
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <Separator className="my-8" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StoryDetail;
