import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoryCard from '@/components/stories/StoryCard';
import CategoriesNav from '@/components/stories/CategoriesNav';
import { featuredStories, regions } from '@/lib/data';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  InputAdornment, 
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
  Search as SearchIcon,
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
  
  const [searchTerm, setSearchTerm] = useState('');
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
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (activeRegion !== 'All') {
      params.set('region', activeRegion);
    }
    
    if (activeCategory !== 'All') {
      params.set('category', activeCategory);
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    navigate(`/stories${newUrl}`, { replace: true });
  }, [activeRegion, activeCategory, navigate]);
  
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
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
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
  };

  return (
    <>
      <Navbar />
      <Box sx={{ 
        background: 'linear-gradient(to bottom, #f1f5f9, #ffffff)',
        pt: 8,
        pb: 8 
      }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Stories
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Discover the latest stories from our global network of journalists
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
              <TextField
                fullWidth 
                placeholder="Search stories..." 
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                flexWrap: 'wrap',
                width: { xs: '100%', md: 'auto' }
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
              <Typography variant="body2" color="text.secondary">
                {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
              </Typography>
              
              {(activeCategory !== 'All' || activeRegion !== 'All') && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
                <Grid key={story.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
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
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No stories found matching your criteria.
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={resetFilters}
              >
                Clear filters
              </Button>
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Stories;
