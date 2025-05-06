
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  ThumbsUp, 
  Eye, 
  Globe 
} from "lucide-react";

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
  viewsCount
}) => {
  return (
    <div className="story-card bg-white rounded-lg shadow-card overflow-hidden border border-gray-100">
      <Link to={`/stories/${id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-pp-blue hover:bg-pp-blue/90">
              {category}
            </Badge>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-0">
              <Globe className="mr-1 h-3 w-3" /> {region}
            </Badge>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-pp-blue/20 rounded-full flex items-center justify-center text-pp-blue text-xs font-bold">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              author.name.substring(0, 2).toUpperCase()
            )}
          </div>
          <div className="text-sm">
            <span className="font-medium">
              {author.name} 
              {author.verified && (
                <Badge variant="outline" className="ml-1 py-0 px-1 h-4 border-pp-blue">
                  <span className="sr-only">Verified</span>
                  ✓
                </Badge>
              )}
            </span>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <span>{publishedAt}</span>
              <span>•</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
        
        <Link to={`/stories/${id}`} className="block group">
          <h3 className="font-playfair text-xl font-semibold mb-2 group-hover:text-pp-blue transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {excerpt}
          </p>
        </Link>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              {likesCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {commentsCount}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {viewsCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
