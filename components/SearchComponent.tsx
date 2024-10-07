
import { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchComponent = () => {
  const { query, setQuery, search } = useSearch();
  const [inputValue, setInputValue] = useState(query);
  const [filter, setFilter] = useState('title');

  const handleSearch = () => {
    search(inputValue, filter);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Select onValueChange={(value) => setFilter(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="content">Content</SelectItem>
          <SelectItem value="category">Category</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchComponent;
