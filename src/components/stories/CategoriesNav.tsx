import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, BookOpen, Search, ChevronDown, Grid3X3, ListOrdered, FolderOpen } from 'lucide-react';
import { regions, topCategories, categoriesWithSubcategories } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const [regionSearch, setRegionSearch] = useState('');
  const [viewMode, setViewMode] = useState<'simple' | 'detailed'>('simple');
  const continents = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Middle East"];
  
  // Filter regions based on search input
  const filteredRegions = regions.filter(region => 
    region.toLowerCase().includes(regionSearch.toLowerCase()) && !continents.includes(region)
  );

  const handleViewModeChange = (value: string) => {
    setViewMode(value as 'simple' | 'detailed');
  };

  const handleRegionClick = (region: string) => {
    setActiveRegion(region);
    if (region !== 'All') {
      toast({
        title: `Filtering by ${region}`,
        description: `Showing stories from ${region}`,
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category !== 'All') {
      toast({
        title: `Filtering by ${category}`,
        description: `Showing stories in ${category}`,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-white flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">News Categories</h3>
          </div>
          <div className="flex items-center gap-1">
            <Tabs value={viewMode} onValueChange={handleViewModeChange}>
              <TabsList className="h-8">
                <TabsTrigger
                  value="simple"
                  className="h-8 px-3"
                >
                  <ListOrdered className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Simple</span>
                </TabsTrigger>
                <TabsTrigger
                  value="detailed"
                  className="h-8 px-3"
                >
                  <Grid3X3 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Detailed</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <CardContent className="p-4">
          {viewMode === 'simple' ? (
            <div className="flex flex-wrap gap-2">
              <Badge 
                className={`cursor-pointer ${activeCategory === 'All' ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                onClick={() => handleCategoryClick('All')}
              >
                All
              </Badge>
              {topCategories.map((category) => (
                <Badge 
                  key={category}
                  className={`cursor-pointer ${activeCategory === category ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="all" className="border-b">
                  <div className="flex items-center">
                    <Badge 
                      className={`cursor-pointer my-2 ${activeCategory === 'All' ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                      onClick={() => handleCategoryClick('All')}
                    >
                      All Categories
                    </Badge>
                  </div>
                </AccordionItem>
                {Object.entries(categoriesWithSubcategories).map(([category, subcategories]) => (
                  <AccordionItem value={category} key={category}>
                    <AccordionTrigger className="hover:no-underline">
                      <Badge 
                        className={`cursor-pointer ${activeCategory === category ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-4 flex flex-wrap gap-2 mt-2">
                        {subcategories.map(subcategory => (
                          <Badge 
                            key={subcategory} 
                            variant="outline"
                            className="cursor-pointer bg-blue-50 hover:bg-blue-100"
                            onClick={() => handleCategoryClick(`${category}: ${subcategory}`)}
                          >
                            {subcategory}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          )}
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
              <Link to="/stories" className="no-underline">
                <Badge 
                  className={`cursor-pointer ${activeRegion === 'All' ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                  onClick={() => handleRegionClick('All')}
                >
                  All
                </Badge>
              </Link>
              <Link to="/stories?region=Global" className="no-underline">
                <Badge 
                  className={`cursor-pointer ${activeRegion === 'Global' ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                  onClick={() => handleRegionClick('Global')}
                >
                  Global
                </Badge>
              </Link>
              {continents.map((region) => (
                <Link key={region} to={`/stories?region=${encodeURIComponent(region)}`} className="no-underline">
                  <Badge 
                    className={`cursor-pointer ${activeRegion === region ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                    onClick={() => handleRegionClick(region)}
                  >
                    {region}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          {regionSearch && (
            <div>
              <h4 className="text-sm font-medium mb-2">Search Results</h4>
              <ScrollArea className="h-[200px]">
                <div className="flex flex-wrap gap-2">
                  {filteredRegions.length > 0 ? (
                    filteredRegions.map((region) => (
                      <Link key={region} to={`/stories?region=${encodeURIComponent(region)}`} className="no-underline">
                        <Badge 
                          className={`cursor-pointer ${activeRegion === region ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                          onClick={() => handleRegionClick(region)}
                        >
                          {region}
                        </Badge>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No countries found</p>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}
          
          {!regionSearch && (
            <div>
              <h4 className="text-sm font-medium mb-2">Countries by Region</h4>
              <Accordion type="single" collapsible className="w-full">
                {continents.map(continent => {
                  const countriesInContinent = regions.filter(
                    region => !continents.includes(region) && 
                             region !== 'Global' &&
                             ((continent === 'Africa' && (
                               region === 'Nigeria' || region === 'South Africa' || region === 'Egypt' || 
                               region === 'Kenya' || region === 'Ethiopia' || region === 'Rwanda' ||
                               region === 'Ghana' || region === 'Tanzania' || region === 'Uganda' ||
                               region === 'Morocco' || region === 'Algeria' || region === 'Zimbabwe' ||
                               region === 'Cameroon' || region === 'Côte d\'Ivoire' || region === 'Senegal'
                             )) ||
                             (continent === 'Asia' && (
                               region === 'China' || region === 'India' || region === 'Japan' ||
                               region === 'South Korea' || region === 'Indonesia' || region === 'Vietnam' ||
                               region === 'Thailand' || region === 'Philippines' || region === 'Malaysia' ||
                               region === 'Singapore' || region === 'Bangladesh' || region === 'Pakistan' ||
                               region === 'Sri Lanka' || region === 'Nepal' || region === 'Myanmar' ||
                               region === 'Cambodia' || region === 'Mongolia'
                             )) ||
                             (continent === 'Europe' && (
                               region === 'United Kingdom' || region === 'Germany' || region === 'France' ||
                               region === 'Italy' || region === 'Spain' || region === 'Russia' ||
                               region === 'Ukraine' || region === 'Poland' || region === 'Netherlands' ||
                               region === 'Sweden' || region === 'Norway' || region === 'Denmark' ||
                               region === 'Finland' || region === 'Switzerland' || region === 'Austria' ||
                               region === 'Belgium' || region === 'Portugal' || region === 'Greece' ||
                               region === 'Czech Republic' || region === 'Hungary' || region === 'Ireland' ||
                               region === 'Romania' || region === 'Bulgaria'
                             )) ||
                             (continent === 'North America' && (
                               region === 'United States' || region === 'Canada' || region === 'Mexico' ||
                               region === 'Costa Rica' || region === 'Panama' || region === 'Cuba' ||
                               region === 'Jamaica' || region === 'Dominican Republic' || region === 'Haiti' ||
                               region === 'Honduras' || region === 'Guatemala' || region === 'El Salvador'
                             )) ||
                             (continent === 'South America' && (
                               region === 'Brazil' || region === 'Argentina' || region === 'Colombia' ||
                               region === 'Chile' || region === 'Peru' || region === 'Venezuela' ||
                               region === 'Ecuador' || region === 'Uruguay' || region === 'Bolivia' ||
                               region === 'Paraguay'
                             )) ||
                             (continent === 'Oceania' && (
                               region === 'Australia' || region === 'New Zealand' || region === 'Fiji' ||
                               region === 'Papua New Guinea' || region === 'Solomon Islands'
                             )) ||
                             (continent === 'Middle East' && (
                               region === 'Saudi Arabia' || region === 'UAE' || region === 'Israel' ||
                               region === 'Turkey' || region === 'Iran' || region === 'Qatar' ||
                               region === 'Kuwait' || region === 'Bahrain' || region === 'Jordan' ||
                               region === 'Lebanon' || region === 'Iraq' || region === 'Syria' ||
                               region === 'Yemen'
                             )))
                  );

                  return (
                    <AccordionItem value={continent} key={continent}>
                      <AccordionTrigger className="text-sm font-medium">
                        {continent} ({countriesInContinent.length} countries)
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto p-2">
                          {countriesInContinent.map(country => (
                            <Link key={country} to={`/stories?region=${encodeURIComponent(country)}`} className="no-underline">
                              <Badge
                                className={`cursor-pointer ${activeRegion === country ? 'bg-pp-blue' : 'bg-secondary text-foreground hover:bg-muted'}`}
                                onClick={() => handleRegionClick(country)}
                              >
                                {country}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesNav;
