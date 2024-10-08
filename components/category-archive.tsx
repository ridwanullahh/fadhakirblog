
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/router";

const mockPosts = [
  { id: 1, title: "Post 1", category: "Tech", date: "2023-10-01" },
  { id: 2, title: "Post 2", category: "Health", date: "2023-10-02" },
  { id: 3, title: "Post 3", category: "Tech", date: "2023-10-03" },
  { id: 4, title: "Post 4", category: "Lifestyle", date: "2023-10-04" },
];

export default function CategoryArchive() {
  const router = useRouter();
  const { category } = router.query;
  interface Post {
    id: number;
    title: string;
    category: string;
    date: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const filteredPosts = mockPosts.filter(post => post.category === category);
    setPosts(filteredPosts);
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Category: {category}</h2>
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
