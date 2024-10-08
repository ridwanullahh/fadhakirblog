
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ShareIcon, BookmarkIcon } from "lucide-react";

const mockPost = {
  id: 1,
  title: "Sample Blog Post",
  content: "This is a sample blog post content.",
  date: "2023-10-01",
  author: "John Doe",
};

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;
  }

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    setPost(mockPost);
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">By {post.author} on {post.date}</p>
      <div className="prose mb-4">{post.content}</div>
      <div className="flex space-x-4">
        <Button>
          <ShareIcon className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button>
          <BookmarkIcon className="h-4 w-4 mr-2" />
          Bookmark
        </Button>
      </div>
    </div>
  );
}
