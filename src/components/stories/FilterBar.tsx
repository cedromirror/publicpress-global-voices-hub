
import React from 'react';
import { 
  Box, 
  Button, 
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  FilterAlt as FilterIcon,
  TrendingUp as TrendingUpIcon,
  CalendarMonth as CalendarIcon,
  Comment as MessageCircleIcon,
  Refresh as ResetIcon,
  ArrowUpward as SortAscIcon,
  ArrowDownward as SortDescIcon
} from '@mui/icons-material';

interface FilterBarProps {
  sortBy: string;
  isAscending: boolean;
  setSortBy: (sort: string) => void;
  setIsAscending: (asc: boolean) => void;
  resetFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  isAscending,
  setSortBy,
  setIsAscending,
  resetFilters
}) => {
  const [filterAnchorEl, setFilterAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setFilterAnchorEl(null);
  };

  return (
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
  );
};

export default FilterBar;
