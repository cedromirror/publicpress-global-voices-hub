
/**
 * Service for handling story-related operations
 */
import { fetchStories, fetchStoryById } from '../api';
import type { Story, StoryFilters } from '../models/types';

export const getFilteredStories = async (filters: StoryFilters): Promise<Story[]> => {
  const stories = await fetchStories();
  let filteredStories = [...stories];
  
  // Apply search filter
  if (filters.searchTerm) {
    const searchTermLower = filters.searchTerm.toLowerCase();
    filteredStories = filteredStories.filter(story => 
      story.title.toLowerCase().includes(searchTermLower) || 
      story.excerpt.toLowerCase().includes(searchTermLower) ||
      story.author.name.toLowerCase().includes(searchTermLower)
    );
  }
  
  // Apply category filter
  if (filters.category && filters.category !== 'All') {
    filteredStories = filteredStories.filter(story => story.category === filters.category);
  }
  
  // Apply region filter
  if (filters.region && filters.region !== 'All') {
    filteredStories = filteredStories.filter(story => story.region === filters.region);
  }
  
  // Apply sorting
  if (filters.sortBy) {
    filteredStories.sort((a, b) => {
      let comparison = 0;
      
      switch(filters.sortBy) {
        case 'date':
          comparison = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          break;
        case 'views':
          comparison = b.viewsCount - a.viewsCount;
          break;
        case 'comments':
          comparison = b.commentsCount - a.commentsCount;
          break;
        case 'likes':
          comparison = b.likesCount - a.likesCount;
          break;
      }
      
      return filters.isAscending ? -comparison : comparison;
    });
  }
  
  return filteredStories;
};

export const getStoryById = async (id: string): Promise<Story | null> => {
  return await fetchStoryById(id);
};
