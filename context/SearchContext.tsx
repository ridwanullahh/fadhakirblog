
import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  results: any[];
  setResults: (results: any[]) => void;
  search: (query: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);

  const search = async (query: string) => {
    setQuery(query);
    // Simulate an API call
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <SearchContext.Provider value={{ query, setQuery, results, setResults, search }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
