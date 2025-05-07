
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X as XIcon, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { featuredStories } from '@/lib/data';
import { Card } from '@/components/ui/card';

interface SearchBarProps {
  onSearch?: (term: string) => void;
  className?: string;
  placeholder?: string;
  showTrending?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  className = '', 
  placeholder = 'Search for stories, topics, or journalists...',
  showTrending = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Get trending stories based on view count
  const trendingSearches = featuredStories
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 5)
    .map(story => story.title);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      // Simple search through featured stories (in a real app, this would be a backend call)
      const results = featuredStories.filter(story => 
        story.title.toLowerCase().includes(value.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(value.toLowerCase()) ||
        story.author.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      
      setSearchResults(results);
      setIsExpanded(true);
    } else {
      setSearchResults([]);
      setIsExpanded(!!showTrending && trendingSearches.length > 0);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        // Default behavior: navigate to stories page with search term
        navigate(`/stories?search=${encodeURIComponent(searchTerm.trim())}`);
      }
      setIsExpanded(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsExpanded(!!showTrending && trendingSearches.length > 0);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsExpanded(false);
    }
  };

  const handleTrendingClick = (term: string) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    } else {
      navigate(`/stories?search=${encodeURIComponent(term)}`);
    }
    setIsExpanded(false);
  };

  const handleResultClick = (storyId: string) => {
    navigate(`/stories/${storyId}`);
    setIsExpanded(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Initialize expanded state if showing trending searches
    setIsExpanded(searchTerm.length > 0 || (showTrending && trendingSearches.length > 0));
  }, [showTrending, trendingSearches]);

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="pr-16 pl-10 py-2 w-full border border-gray-200 rounded-full focus:ring-2 focus:ring-pp-blue/20 focus:border-pp-blue transition-all"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-12 flex items-center pr-2"
          >
            <XIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
        <Button 
          type="submit" 
          variant="ghost"
          size="sm"
          className="absolute inset-y-0 right-0 px-3 text-pp-blue hover:text-pp-blue/80 hover:bg-transparent"
        >
          Search
        </Button>
      </form>

      {isExpanded && (
        <Card className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-gray-200">
          {searchResults.length > 0 ? (
            <div className="py-2 max-h-80 overflow-y-auto">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Search Results</div>
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-start gap-3"
                  onClick={() => handleResultClick(result.id)}
                >
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                    <img src={result.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium text-sm line-clamp-1">{result.title}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{result.excerpt}</div>
                    <div className="text-xs text-pp-blue mt-1">{result.author.name}</div>
                  </div>
                </button>
              ))}
            </div>
          ) : searchTerm.trim() ? (
            <div className="px-4 py-3 text-sm text-gray-500">No results found for "{searchTerm}"</div>
          ) : null}

          {showTrending && trendingSearches.length > 0 && !searchTerm.trim() && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> Trending Searches
              </div>
              {trendingSearches.map((term, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center"
                  onClick={() => handleTrendingClick(term)}
                >
                  <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-500 mr-3">
                    {index + 1}
                  </span>
                  <span className="line-clamp-1">{term}</span>
                </button>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
