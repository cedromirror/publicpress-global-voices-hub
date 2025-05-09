
import { useQuery } from '@tanstack/react-query';
import { getFilteredStories, getStoryById } from '../../backend/services/storiesService';
import type { StoryFilters } from '../../backend/models/types';

export const useStoriesService = (filters: StoryFilters) => {
  return useQuery({
    queryKey: ['stories', filters],
    queryFn: () => getFilteredStories(filters),
  });
};

export const useStoryById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['story', id],
    queryFn: () => id ? getStoryById(id) : null,
    enabled: !!id,
  });
};
