'use client';

import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  title: string;
  description: string;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setResults([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // TODO: Replace with actual API call
      const mockResults: SearchResult[] = [
        { id: '1', title: 'DeFi Protocol', description: 'Decentralized Finance Protocol' },
        { id: '2', title: 'NFT Marketplace', description: 'Trade Digital Assets' },
      ];
      
      setResults(mockResults);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleResultClick(results[selectedIndex].id);
        }
        break;
      case 'Escape':
        setResults([]);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultClick = (id: string) => {
    // TODO: Navigate to result page
    router.push(`/dapp/${id}`);
    setResults([]);
    setSearchQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className={`w-5 h-5 ${isSearching ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`} />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2.5 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Search dapps..."
            aria-label="Search"
            aria-expanded={results.length > 0}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setResults([]);
              }}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-auto z-50">
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result.id)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="font-medium text-gray-900">{result.title}</div>
              <div className="text-sm text-gray-500">{result.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 