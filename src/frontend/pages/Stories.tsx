
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoriesNav from '@/components/stories/CategoriesNav';
import { Box } from '@mui/material';
import { regions } from '@/lib/data';
import { useStoriesFilter } from '@/hooks/use-stories-filter';
import { useToast } from '@/hooks/use-toast';
import { useStoriesService } from '@/frontend/hooks/use-stories-service';

// Import our components
import StoriesHeader from '@/frontend/components/stories/StoriesHeader';
import FilterBar from '@/components/stories/FilterBar';
import ActiveFiltersDisplay from '@/components/stories/ActiveFiltersDisplay';
import StoriesList from '@/components/stories/StoriesList';
import RegionsSidebar from '@/frontend/components/stories/RegionsSidebar';

const Stories = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [filteredStories, setFilteredStories] = useState([]);

  const {
    searchTerm,
    setSearchTerm,
    activeRegion,
    setActiveRegion,
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy,
    isAscending,
    setIsAscending,
    mainCategory,
    subcategory,
    resetFilters,
    updateQueryParams
  } = useStoriesFilter([]);

  // Use React Query to fetch and filter stories
  const { data: stories, isLoading, error } = useStoriesService({
    searchTerm,
    category: activeCategory !== 'All' ? activeCategory : undefined,
    region: activeRegion !== 'All' ? activeRegion : undefined,
    sortBy,
    isAscending
  });

  // Update filtered stories when data changes
  useEffect(() => {
    if (stories) {
      setFilteredStories(stories);
      
      // Show toast notification when filtering by region
      const params = new URLSearchParams(location.search);
      const regionParam = params.get('region');
      if (regionParam && activeRegion === regionParam) {
        toast({
          title: `Showing stories from ${regionParam}`,
          description: `${stories.length} stories found in this region`,
        });
      }
    }
  }, [stories, activeRegion, location.search, toast]);

  // Get trending stories for the sidebar
  const trendingStories = stories
    ? [...stories].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5)
    : [];

  return (
    <>
      <Navbar />
      <Box sx={{ 
        background: 'linear-gradient(to bottom, #f1f5f9, #ffffff)',
        pt: 8,
        pb: 8 
      }}>
        <div className="container mx-auto px-4">
          <StoriesHeader onSearch={setSearchTerm} />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-2/3">
              <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FilterBar 
                  sortBy={sortBy}
                  isAscending={isAscending}
                  setSortBy={setSortBy}
                  setIsAscending={setIsAscending}
                  resetFilters={resetFilters}
                />
                
                {/* Categories and Regions Navigation */}
                <CategoriesNav 
                  activeCategory={activeCategory}
                  activeRegion={activeRegion}
                  setActiveCategory={setActiveCategory}
                  setActiveRegion={setActiveRegion}
                />
                
                <ActiveFiltersDisplay 
                  searchTerm={searchTerm}
                  activeCategory={activeCategory}
                  activeRegion={activeRegion}
                  mainCategory={mainCategory}
                  subcategory={subcategory}
                  filteredStoriesCount={filteredStories.length}
                  setSearchTerm={setSearchTerm}
                  setActiveCategory={setActiveCategory}
                  setActiveRegion={setActiveRegion}
                  updateQueryParams={updateQueryParams}
                />
              </Box>
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-pulse text-gray-400">Loading stories...</div>
                </div>
              ) : error ? (
                <div className="text-red-500 p-4 text-center">
                  Error loading stories. Please try again.
                </div>
              ) : (
                <StoriesList 
                  stories={filteredStories} 
                  resetFilters={resetFilters} 
                />
              )}
            </div>
            
            {/* Sidebar */}
            <RegionsSidebar 
              trendingStories={trendingStories}
              regions={regions}
              activeRegion={activeRegion}
            />
          </div>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Stories;
