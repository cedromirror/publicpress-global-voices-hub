
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoriesNav from '@/components/stories/CategoriesNav';
import { Box } from '@mui/material';
import { featuredStories, regions } from '@/lib/data';
import { useStoriesFilter } from '@/hooks/use-stories-filter';

// Import our new components
import StoriesHeader from '@/components/stories/StoriesHeader';
import FilterBar from '@/components/stories/FilterBar';
import ActiveFiltersDisplay from '@/components/stories/ActiveFiltersDisplay';
import StoriesList from '@/components/stories/StoriesList';
import RegionsSidebar from '@/components/stories/RegionsSidebar';

const Stories = () => {
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
    filteredStories,
    resetFilters,
    updateQueryParams
  } = useStoriesFilter(featuredStories);

  // Get trending stories for the sidebar
  const trendingStories = [...featuredStories]
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 5);

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
              
              <StoriesList 
                stories={filteredStories} 
                resetFilters={resetFilters} 
              />
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
