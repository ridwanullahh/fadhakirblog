
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (category) {
      const fetchPosts = async () => {
        // Simulate an API call to fetch posts by category
        const response = await fetch(`/api/posts?category=${category}`);
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
