
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockPosts = [
  { id: 1, title: "Post 1", content: "Content of post 1" },
  { id: 2, title: "Post 2", content: "Content of post 2" },
];

export default function Admin() {
  const [posts, setPosts] = useState(mockPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    const newPost = { id: posts.length + 1, title, content };
    setPosts([...posts, newPost]);
    setTitle("");
    setContent("");
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Area</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="mb-2"
        />
        <Textarea
          placeholder="Content"
          value={content}
           onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleCreate}>Create Post</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              <Button onClick={() => handleDelete(post.id)} className="mt-2">Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
