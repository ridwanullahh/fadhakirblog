
import { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchComponent = () => {
  const { query, setQuery, search } = useSearch();
  const [inputValue, setInputValue] = useState(query);

  const handleSearch = () => {
    search(inputValue);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchComponent;
