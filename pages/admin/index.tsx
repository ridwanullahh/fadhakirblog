
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/AdminLayout';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Simulate an API call to fetch posts
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`/api/posts/${id}/delete`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/admin/posts/create">
          <Button>Create New Post</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
              <div className="mt-4 flex space-x-4">
                <Link href={`/admin/posts/edit/${post.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button variant="destructive" onClick={() => handleDelete(post.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
