
import React from 'react';
import { Box } from '@mui/material';
import SearchBar from '../../components/search/SearchBar';

interface StoriesHeaderProps {
  onSearch: (term: string) => void;
}

const StoriesHeader: React.FC<StoriesHeaderProps> = ({ onSearch }) => {
  return (
    <Box sx={{ mb: 6, textAlign: 'center' }}>
      <h1 className="text-3xl font-bold mb-4">Stories</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        Discover the latest stories from our global network of journalists
      </p>
      
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar 
          onSearch={onSearch} 
          showTrending={false}
          placeholder="Search for stories by title, content, or author..."
        />
      </div>
    </Box>
  );
};

export default StoriesHeader;
