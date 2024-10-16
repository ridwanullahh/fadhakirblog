
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
interface Post {
  id: string;
  title: string;
  excerpt: string;
}

const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (category) {
      const fetchPosts = async () => {
        // Simulate an API call to fetch posts by category
        console.log('Fetching posts for category:', category);
        const response = await fetch(`/api/posts?category=${category}`);
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Fetched posts data:', data);
        const data = await response.json();
        setPosts(data);
      };

      fetchPosts();
    }
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Category: {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
