
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoryCard from '@/components/stories/StoryCard';
import CategoriesNav from '@/components/stories/CategoriesNav';
import SearchBar from '@/components/search/SearchBar';
import TrendingNews from '@/components/stories/TrendingNews';
import { featuredStories, regions } from '@/lib/data';
import { 
  Box, 
  Button, 
  Chip, 
  Grid, 
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  FilterAlt as FilterIcon,
  TrendingUp as TrendingUpIcon,
  CalendarMonth as CalendarIcon,
  Comment as MessageCircleIcon,
  Public as GlobeIcon,
  Label as TagIcon,
  ArrowUpward as SortAscIcon,
  ArrowDownward as SortDescIcon,
  Refresh as ResetIcon
} from '@mui/icons-material';

const Stories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
  const [activeRegion, setActiveRegion] = useState(queryParams.get('region') || 'All');
  const [activeCategory, setActiveCategory] = useState(queryParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState<string>("popular"); // popular, newest, mostCommented
  const [isAscending, setIsAscending] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setFilterAnchorEl(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    updateQueryParams({ search: term });
  };
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    if (activeRegion !== 'All') {
      params.set('region', activeRegion);
    }
    
    if (activeCategory !== 'All') {
      params.set('category', activeCategory);
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    navigate(`/stories${newUrl}`, { replace: true });
  }, [activeRegion, activeCategory, searchTerm, navigate]);
  
  // Parse category and subcategory
  const getCategoryInfo = () => {
    if (activeCategory === 'All') return { mainCategory: 'All', subcategory: null };
    
    const parts = activeCategory.split(': ');
    if (parts.length > 1) {
      return { mainCategory: parts[0], subcategory: parts[1] };
    } else {
      return { mainCategory: parts[0], subcategory: null };
    }
  };

  // Update query params without losing existing ones
  const updateQueryParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(location.search);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    
    navigate(`/stories?${params.toString()}`);
  };
  
  const { mainCategory, subcategory } = getCategoryInfo();
  
  // Sort stories based on current sorting options
  const sortStories = (stories: any[]) => {
    let sortedStories;
    
    if (sortBy === "newest") {
      sortedStories = [...stories].sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return isAscending 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      });
    } else if (sortBy === "mostCommented") {
      sortedStories = [...stories].sort((a, b) => 
        isAscending ? a.commentsCount - b.commentsCount : b.commentsCount - a.commentsCount
      );
    } else {
      // Default: popular - sort by views
      sortedStories = [...stories].sort((a, b) => 
        isAscending ? a.viewsCount - b.viewsCount : b.viewsCount - a.viewsCount
      );
    }
    
    return sortedStories;
  };
  
  const filteredStories = sortStories(featuredStories.filter(story => {
    const matchesSearch = searchTerm === '' || 
                          story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = activeRegion === 'All' || story.region === activeRegion;
    
    // For category matching, we need to check both main category and subcategory if available
    let matchesCategory = activeCategory === 'All';
    
    if (!matchesCategory) {
      if (subcategory) {
        // In a real app, stories would have subcategories
        matchesCategory = story.category === mainCategory;
      } else {
        matchesCategory = story.category === mainCategory;
      }
    }
    
    return matchesSearch && matchesRegion && matchesCategory;
  }));

  const resetFilters = () => {
    setSearchTerm('');
    setActiveRegion('All');
    setActiveCategory('All');
    setSortBy('popular');
    setIsAscending(false);
    handleCloseFilterMenu();
    navigate('/stories');
  };

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
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <h1 className="text-3xl font-bold mb-4">Stories</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Discover the latest stories from our global network of journalists
            </p>
            
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar 
                onSearch={handleSearch} 
                showTrending={false}
                placeholder="Search for stories by title, content, or author..."
              />
            </div>
          </Box>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-2/3">
              <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: { xs: 'wrap', md: 'nowrap' },
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    flexWrap: 'wrap',
                  }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<FilterIcon />} 
                      size="medium"
                      onClick={handleOpenFilterMenu}
                    >
                      Filters
                    </Button>
                    <Menu
                      anchorEl={filterAnchorEl}
                      open={Boolean(filterAnchorEl)}
                      onClose={handleCloseFilterMenu}
                    >
                      <MenuItem disabled sx={{ fontWeight: 'bold' }}>Sort by</MenuItem>
                      <MenuItem 
                        onClick={() => { setSortBy("popular"); handleCloseFilterMenu(); }}
                        selected={sortBy === "popular"}
                      >
                        <ListItemIcon>
                          <TrendingUpIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Popular</ListItemText>
                      </MenuItem>
                      <MenuItem 
                        onClick={() => { setSortBy("newest"); handleCloseFilterMenu(); }}
                        selected={sortBy === "newest"}
                      >
                        <ListItemIcon>
                          <CalendarIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Newest</ListItemText>
                      </MenuItem>
                      <MenuItem 
                        onClick={() => { setSortBy("mostCommented"); handleCloseFilterMenu(); }}
                        selected={sortBy === "mostCommented"}
                      >
                        <ListItemIcon>
                          <MessageCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Most Commented</ListItemText>
                      </MenuItem>
                      <Divider />
                      <MenuItem 
                        onClick={() => { setIsAscending(!isAscending); handleCloseFilterMenu(); }}
                      >
                        <ListItemIcon>
                          {isAscending ? <SortAscIcon fontSize="small" /> : <SortDescIcon fontSize="small" />}
                        </ListItemIcon>
                        <ListItemText>{isAscending ? "Ascending" : "Descending"}</ListItemText>
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={resetFilters}>
                        <ListItemIcon>
                          <ResetIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Reset Filters</ListItemText>
                      </MenuItem>
                    </Menu>
                    
                    <Button 
                      variant="outlined" 
                      size="medium"
                      onClick={resetFilters}
                      startIcon={<ResetIcon />}
                    >
                      Reset
                    </Button>
                  </Box>
                  
                  <Button
                    variant="contained"
                    size="medium"
                    startIcon={
                      sortBy === "popular" ? <TrendingUpIcon /> : 
                      sortBy === "newest" ? <CalendarIcon /> : <MessageCircleIcon />
                    }
                  >
                    {sortBy === "popular" ? "Popular" : sortBy === "newest" ? "Newest" : "Most Commented"}
                  </Button>
                </Box>
                
                {/* Categories and Regions Navigation */}
                <CategoriesNav 
                  activeCategory={activeCategory}
                  activeRegion={activeRegion}
                  setActiveCategory={setActiveCategory}
                  setActiveRegion={setActiveRegion}
                />
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    color: 'text.secondary',
                    fontSize: '0.875rem'
                  }}
                >
                  <div>
                    {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
                    {searchTerm && <span> for "{searchTerm}"</span>}
                  </div>
                  
                  {(searchTerm || activeCategory !== 'All' || activeRegion !== 'All') && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {searchTerm && (
                        <Chip
                          label={`Search: ${searchTerm}`}
                          onDelete={() => { setSearchTerm(''); updateQueryParams({ search: null }); }}
                          variant="outlined"
                          size="small"
                          color="info"
                        />
                      )}
                      
                      {activeCategory !== 'All' && (
                        <Chip
                          icon={<TagIcon fontSize="small" />}
                          label={subcategory ? `${mainCategory}: ${subcategory}` : mainCategory}
                          onDelete={() => setActiveCategory('All')}
                          variant="outlined"
                          size="small"
                          color="primary"
                        />
                      )}
                      
                      {activeRegion !== 'All' && (
                        <Chip
                          icon={<GlobeIcon fontSize="small" />}
                          label={activeRegion}
                          onDelete={() => setActiveRegion('All')}
                          variant="outlined"
                          size="small"
                          color="success"
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
              
              {filteredStories.length > 0 ? (
                <Grid container spacing={3}>
                  {filteredStories.map((story) => (
                    <Grid key={story.id}>
                      <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
                        <Link 
                          to={`/stories/${story.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <StoryCard
                            id={story.id}
                            title={story.title}
                            excerpt={story.excerpt}
                            coverImage={story.coverImage}
                            author={story.author}
                            publishedAt={story.publishedAt}
                            category={story.category}
                            region={story.region}
                            readTime={story.readTime}
                            commentsCount={story.commentsCount}
                            likesCount={story.likesCount}
                            viewsCount={story.viewsCount}
                          />
                        </Link>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <h3 className="text-lg font-medium text-gray-600 mb-4">
                    No stories found matching your criteria.
                  </h3>
                  <Button 
                    variant="outlined" 
                    sx={{ mt: 2 }}
                    onClick={resetFilters}
                  >
                    Clear filters
                  </Button>
                </Box>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              <TrendingNews stories={trendingStories} />
              
              {/* Region quick filters */}
              <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <h3 className="font-semibold mb-3 flex items-center">
                  <GlobeIcon fontSize="small" className="mr-2" />
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
          </div>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Stories;
