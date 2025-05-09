
/**
 * API routes for the PublicPress Global Voices Hub
 */

// Example API endpoint for fetching stories
export const fetchStories = async (filters?: any) => {
  // In a real application, this would make an actual API request
  // For now, we'll just simulate a delayed response with the mock data
  console.log('Backend API: Fetching stories with filters:', filters);
  
  // Import data from our mock data file
  const { featuredStories } = await import('../../lib/data');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return featuredStories;
};

// Example API endpoint for fetching a single story
export const fetchStoryById = async (id: string) => {
  console.log('Backend API: Fetching story by ID:', id);
  
  // Import data from our mock data file
  const { featuredStories } = await import('../../lib/data');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return featuredStories.find(story => story.id === id) || null;
};

// Example API endpoint for fetching journalists
export const fetchJournalists = async () => {
  console.log('Backend API: Fetching journalists');
  
  // Import data from our mock data file
  const { journalists } = await import('../../lib/data');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return journalists;
};
