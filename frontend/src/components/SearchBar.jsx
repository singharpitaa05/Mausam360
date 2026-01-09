// frontend/src/components/SearchBar.jsx
import { Loader2, MapPin, Search, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { debounce } from '../utils/performance.js';

const SearchBar = ({ onSearch, loading }) => {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Debounced validation
  const validateInput = useCallback(
    debounce((value) => {
      if (value.length > 0 && value.length < 2) {
        setError('City name must be at least 2 characters');
      } else if (value.length > 50) {
        setError('City name is too long');
      } else {
        setError('');
      }
    }, 300),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedInput = searchInput.trim();
    
    if (!trimmedInput) {
      setError('Please enter a city name');
      return;
    }

    if (trimmedInput.length < 2) {
      setError('City name must be at least 2 characters');
      return;
    }

    if (trimmedInput.length > 50) {
      setError('City name is too long');
      return;
    }

    // Check for invalid characters
    if (!/^[a-zA-Z\s\-']+$/.test(trimmedInput)) {
      setError('City name contains invalid characters');
      return;
    }

    setError('');
    onSearch(trimmedInput);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    validateInput(value);
  };

  const handleClear = () => {
    setSearchInput('');
    setError('');
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center glass-card p-2">
          <MapPin className="absolute left-4 w-5 h-5 text-text-tertiary" />
          
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for a city..."
            className={`w-full pl-12 pr-32 py-3 text-lg bg-transparent border-none focus:outline-none text-text-primary placeholder-text-tertiary transition-all ${
              error 
                ? 'text-red-400' 
                : 'text-text-primary'
            } disabled:cursor-not-allowed`}
            disabled={loading}
            maxLength={50}
            autoComplete="off"
            spellCheck="false"
          />
          
          {/* Clear button */}
          {searchInput && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-28 text-text-tertiary hover:text-accent-primary p-2 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          
          {/* Search button */}
          <button
            type="submit"
            disabled={loading || !!error || !searchInput.trim()}
            className="absolute right-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mt-3 text-red-400 text-sm pl-4 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
            {error}
          </div>
        )}

        {/* Character count */}
        {searchInput.length > 30 && (
          <div className="mt-2 text-text-tertiary text-xs pl-4">
            {searchInput.length}/50 characters
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;