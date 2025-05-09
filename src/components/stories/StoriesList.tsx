
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Button } from '@mui/material';
import StoryCard from './StoryCard';

interface Story {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  publishedAt: string;
  category: string;
  region: string;
  readTime: number;
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  featured?: boolean;
}

interface StoriesListProps {
  stories: Story[];
  resetFilters: () => void;
}

const StoriesList: React.FC<StoriesListProps> = ({ stories, resetFilters }) => {
  if (stories.length === 0) {
    return (
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
    );
  }

  return (
    <Grid container spacing={3}>
      {stories.map((story) => (
        <Grid key={story.id} xs={12} sm={6} md={4}>
          <Box>
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
  );
};

export default StoriesList;
