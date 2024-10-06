
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
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="mt-4 flex space-x-4">
            <Button>Share</Button>
            <Button>Bookmark</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPostPage;
