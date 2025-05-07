
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Category } from 'lucide-react';
import { regions, topCategories } from '@/lib/data';

interface CategoriesNavProps {
  activeCategory: string;
  activeRegion: string;
  setActiveCategory: (category: string) => void;
  setActiveRegion: (region: string) => void;
}

const CategoriesNav = ({
  activeCategory,
  activeRegion,
  setActiveCategory,
  setActiveRegion,
}: CategoriesNavProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-white flex items-center">
          <Category className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold">News Categories</h3>
        </div>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Badge 
              className={`cursor-pointer ${activeCategory === 'All' ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
              onClick={() => setActiveCategory('All')}
            >
              All
            </Badge>
            {topCategories.map((category) => (
              <Badge 
                key={category}
                className={`cursor-pointer ${activeCategory === category ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="p-4 border-b bg-gradient-to-r from-green-50 to-white flex items-center">
          <Globe className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold">Regions</h3>
        </div>
        <CardContent className="p-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesNav;
