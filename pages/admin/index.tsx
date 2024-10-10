
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/AdminLayout';

import withAuth from '../../lib/withAuth';

const AdminDashboard = () => {
interface Post {
  id: string;
  title: string;
  excerpt: string;
}

const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log('Fetched posts data:', data, 'Type:', typeof data);
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    console.log('Posts state:', posts);

    fetchPosts();
  }, [posts]);

const handleDelete = async (id: string) => {
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
              <p>{post.excerpt || ''}</p>
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

export default withAuth(AdminDashboard);
