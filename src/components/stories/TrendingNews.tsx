
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TrendingNewsProps {
  stories: Array<{
    id: string;
    title: string;
    viewsCount: number;
    readTime: number;
    publishedAt: string;
    category?: string;
  }>;
  title?: string;
  maxItems?: number;
  className?: string;
}

const TrendingNews: React.FC<TrendingNewsProps> = ({ 
  stories, 
  title = "Trending Now", 
  maxItems = 5,
  className = ''
}) => {
  const trendingStories = stories
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, maxItems);

  return (
    <Card className={`overflow-hidden border-t-4 border-t-red-500 ${className}`}>
      <div className="bg-gradient-to-r from-red-50 to-white p-3 border-b">
        <div className="flex items-center">
          <TrendingUp className="text-red-500 h-5 w-5 mr-2" />
          <h3 className="font-bold text-lg">{title}</h3>
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
  );
};

export default TrendingNews;
