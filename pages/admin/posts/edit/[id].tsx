
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostForm from '@/components/PostForm';

const EditPostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  interface Post {
    id?: string;
    title?: string;
    excerpt?: string;
    error?: string;
  }

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
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

  if (typeof post === 'object' && post !== null && 'error' in post) {
    return <div>Error loading post: {post.error}</div>;
  }

  return <PostForm post={post} />;
};

import withAuth from '../../../../lib/withAuth';

export default withAuth(EditPostPage);
