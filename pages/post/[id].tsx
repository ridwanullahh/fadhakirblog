
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BlogPostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        // Simulate an API call to fetch the post by ID
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      };

      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
      </header>
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <footer className="mt-8 flex space-x-4">
        <Button>Share</Button>
        <Button>Bookmark</Button>
        <div className="flex space-x-2">
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
            <img src="/icons/twitter.svg" alt="Share on Twitter" />
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
            <img src="/icons/facebook.svg" alt="Share on Facebook" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostPage;
