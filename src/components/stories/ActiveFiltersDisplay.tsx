import React from 'react';
import { Box, Chip } from '@mui/material';
import {
  Public as GlobeIcon,
  Label as TagIcon
} from '@mui/icons-material';

interface ActiveFiltersDisplayProps {
  searchTerm: string;
  activeCategory: string;
  activeRegion: string;
  mainCategory: string;
  subcategory: string | null;
  filteredStoriesCount: number;
  setSearchTerm: (term: string) => void;
  setActiveCategory: (category: string) => void;
  setActiveRegion: (region: string) => void;
  updateQueryParams: (params: Record<string, string | null>) => void;
}

const ActiveFiltersDisplay: React.FC<ActiveFiltersDisplayProps> = ({
  searchTerm,
  activeCategory,
  activeRegion,
  mainCategory,
  subcategory,
  filteredStoriesCount,
  setSearchTerm,
  setActiveCategory,
  setActiveRegion,
  updateQueryParams
}) => {
  return (
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
        {filteredStoriesCount} {filteredStoriesCount === 1 ? 'story' : 'stories'} found
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
  );
};

export default ActiveFiltersDisplay;
