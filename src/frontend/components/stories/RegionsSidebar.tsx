
import React from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import { Globe as GlobeIcon } from 'lucide-react';
import TrendingNews from './TrendingNews';

interface Story {
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

interface RegionsSidebarProps {
  trendingStories: Story[];
  regions: string[];
  activeRegion: string;
}

const RegionsSidebar: React.FC<RegionsSidebarProps> = ({ 
  trendingStories, 
  regions, 
  activeRegion 
}) => {
  return (
    <div className="lg:w-1/3 space-y-6">
      <TrendingNews stories={trendingStories} />
      
      {/* Region quick filters */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
        <h3 className="font-semibold mb-3 flex items-center">
          <GlobeIcon className="h-4 w-4 mr-2" />
          Popular Regions
        </h3>
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <Link 
              key={region} 
              to={`/stories?region=${encodeURIComponent(region)}`}
              className="no-underline"
            >
              <Chip 
                label={region}
                variant={activeRegion === region ? "filled" : "outlined"}
                color="primary"
                size="small"
                className="cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionsSidebar;
