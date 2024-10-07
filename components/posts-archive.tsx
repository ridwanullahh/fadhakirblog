
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const mockPosts = [
  { id: 1, title: "Post 1", category: "Tech", date: "2023-10-01" },
  { id: 2, title: "Post 2", category: "Health", date: "2023-10-02" },
  { id: 3, title: "Post 3", category: "Tech", date: "2023-10-03" },
  { id: 4, title: "Post 4", category: "Lifestyle", date: "2023-10-04" },
];

export default function PostsArchive() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulate fetching data from an API
    let filteredPosts = mockPosts;

    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    if (search) {
      filteredPosts = filteredPosts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (sort === "date") {
      filteredPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "title") {
      filteredPosts = filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    setPosts(filteredPosts);
  }, [category, sort, search]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSort(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Category: {post.category}</p>
              <p>Date: {post.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
