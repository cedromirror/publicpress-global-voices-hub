
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Author {
  name: string;
  avatar?: string;
  verified: boolean;
}

interface Story {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  category: string;
  region: string;
  readTime: number;
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  featured?: boolean;
}

export const useStoriesFilter = (allStories: Story[]) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
  const [activeRegion, setActiveRegion] = useState(queryParams.get('region') || 'All');
  const [activeCategory, setActiveCategory] = useState(queryParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState<string>("popular"); // popular, newest, mostCommented
  const [isAscending, setIsAscending] = useState(false);
  
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
  const sortStories = (stories: Story[]) => {
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
  
  const filterStories = () => {
    return sortStories(allStories.filter(story => {
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
  };

  const resetFilters = () => {
    setSearchTerm('');
    setActiveRegion('All');
    setActiveCategory('All');
    setSortBy('popular');
    setIsAscending(false);
    navigate('/stories');
  };

  return {
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
    filteredStories: filterStories(),
    resetFilters,
    updateQueryParams
  };
};
