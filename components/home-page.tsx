
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockFeaturedPosts = [
  { id: 1, title: "Featured Post 1", description: "Description of featured post 1" },
  { id: 2, title: "Featured Post 2", description: "Description of featured post 2" },
];

const mockRecentPosts = [
  { id: 3, title: "Recent Post 1", description: "Description of recent post 1" },
  { id: 4, title: "Recent Post 2", description: "Description of recent post 2" },
];

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setFeaturedPosts(mockFeaturedPosts);
    setRecentPosts(mockRecentPosts);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.description}</p>
                <Button className="mt-4">Read More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.description}</p>
                <Button className="mt-4">Read More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
