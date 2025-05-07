
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, BookOpen, Search, ChevronDown } from 'lucide-react';
import { regions, topCategories } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [regionSearch, setRegionSearch] = useState('');
  const continents = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Middle East"];
  
  // Filter regions based on search input
  const filteredRegions = regions.filter(region => 
    region.toLowerCase().includes(regionSearch.toLowerCase()) && !continents.includes(region)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-white flex items-center">
          <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
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
          <h3 className="text-lg font-semibold">Regions & Countries</h3>
        </div>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search countries..." 
              className="pl-10"
              value={regionSearch}
              onChange={(e) => setRegionSearch(e.target.value)}
            />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Popular Regions</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge 
                className={`cursor-pointer ${activeRegion === 'All' ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                onClick={() => setActiveRegion('All')}
              >
                All
              </Badge>
              <Badge 
                className={`cursor-pointer ${activeRegion === 'Global' ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                onClick={() => setActiveRegion('Global')}
              >
                Global
              </Badge>
              {continents.map((region) => (
                <Badge 
                  key={region}
                  className={`cursor-pointer ${activeRegion === region ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                  onClick={() => setActiveRegion(region)}
                >
                  {region}
                </Badge>
              ))}
            </div>
          </div>
          
          {regionSearch && (
            <div>
              <h4 className="text-sm font-medium mb-2">Search Results</h4>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((region) => (
                    <Badge 
                      key={region}
                      className={`cursor-pointer ${activeRegion === region ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                      onClick={() => setActiveRegion(region)}
                    >
                      {region}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No countries found</p>
                )}
              </div>
            </div>
          )}
          
          {!regionSearch && (
            <div>
              <h4 className="text-sm font-medium mb-2">Countries by Region</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Badge variant="outline" className="cursor-pointer flex items-center">
                    Select a region to see countries
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px]">
                  {continents.map((continent) => (
                    <DropdownMenuItem 
                      key={continent}
                      onClick={() => setActiveRegion(continent)}
                    >
                      {continent}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesNav;
