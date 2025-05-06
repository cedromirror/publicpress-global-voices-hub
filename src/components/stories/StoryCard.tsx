
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  ThumbsUp,
  ThumbsDown,
  Eye, 
  Globe,
  Clock,
  Calendar,
  Bookmark
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  publishedAt: string;
  category: string;
  region: string;
  readTime: number;
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  featured?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({
  id,
  title,
  excerpt,
  coverImage,
  author,
  publishedAt,
  category,
  region,
  readTime,
  commentsCount,
  likesCount,
  viewsCount,
  featured = false
}) => {
  const { toast } = useToast();
  const [likes, setLikes] = useState(likesCount);
  const [dislikes, setDislikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
      toast({
        title: "Like removed",
        description: "You've removed your like from this story",
      });
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
      // If user previously disliked, remove the dislike
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
      toast({
        title: "Story liked",
        description: "You've liked this story!",
      });
    }
  };
  
  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (hasDisliked) {
      setDislikes(dislikes - 1);
      setHasDisliked(false);
      toast({
        title: "Dislike removed",
        description: "You've removed your dislike from this story",
      });
    } else {
      setDislikes(dislikes + 1);
      setHasDisliked(true);
      // If user previously liked, remove the like
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
      toast({
        title: "Story disliked",
        description: "You've disliked this story",
      });
    }
  };

  const handleSaveForLater = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from reading list" : "Saved for later",
      description: isSaved 
        ? "This story has been removed from your reading list" 
        : "This story has been saved to your reading list for later",
    });
  };

  return (
    <div className={`story-card bg-white rounded-lg shadow-card overflow-hidden border border-gray-100 h-full flex flex-col ${featured ? 'border-pp-blue/30 shadow-lg' : ''}`}>
      <div className="relative h-52 overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-pp-blue hover:bg-pp-blue/90">
            {category}
          </Badge>
          {featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600">
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-pp-blue text-xs font-bold overflow-hidden border-2 border-pp-blue">
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              ) : (
                author.name.substring(0, 2).toUpperCase()
              )}
            </div>
            <span className="text-white text-sm font-medium">
              {author.name}
              {author.verified && (
                <span className="ml-1 text-xs bg-pp-blue text-white px-1 py-0.5 rounded-sm">✓</span>
              )}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {publishedAt}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime} min read
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {region}
          </span>
        </div>
        
        <Link to={`/stories/${id}`} className="block group flex-grow">
          <h3 className="font-playfair text-xl font-semibold mb-2 group-hover:text-pp-blue transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {excerpt}
          </p>
        </Link>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 hover:text-pp-blue transition-colors ${hasLiked ? 'text-pp-blue' : ''}`}
            >
              <ThumbsUp className="h-4 w-4" />
              {likes}
            </button>
            <button 
              onClick={handleDislike}
              className={`flex items-center gap-1 hover:text-red-500 transition-colors ${hasDisliked ? 'text-red-500' : ''}`}
            >
              <ThumbsDown className="h-4 w-4" />
              {dislikes}
            </button>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {commentsCount}
            </span>
            <button
              onClick={handleSaveForLater}
              className={`flex items-center gap-1 hover:text-amber-500 transition-colors ${isSaved ? 'text-amber-500' : ''}`}
            >
              <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
            <Eye className="h-3 w-3 text-pp-blue" />
            <span>{viewsCount.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
