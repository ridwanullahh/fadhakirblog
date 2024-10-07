
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim() === "") return;

    // Simulate an API call
    const mockResults = [
      { id: 1, title: "Post 1", description: "Description of post 1" },
      { id: 2, title: "Post 2", description: "Description of post 2" },
    ];
    setResults(mockResults);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} size="icon">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg">
          {results.map((result) => (
            <div key={result.id} className="p-4 border-b last:border-b-0">
              <h3 className="font-bold">{result.title}</h3>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
