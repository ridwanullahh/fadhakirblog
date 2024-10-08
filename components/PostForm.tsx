
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/AdminLayout';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('../components/RichTextEditor'), { ssr: false });

interface Post {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
}

interface PostFormProps {
  post?: Post;
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
  const router = useRouter();
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const [excerpt, setExcerpt] = useState(post ? post.excerpt : '');
  const [isMarkdown, setIsMarkdown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = post ? 'PUT' : 'POST';
    const url = post ? `/api/posts/${post.id}` : '/api/posts';
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, excerpt }),
      });
      if (!response.ok) {
        throw new Error('Failed to save post');
      }
      const data = await response.json();
        console.log('Response data:', data, 'Type:', typeof data);
        console.log('Response data:', JSON.stringify(data, null, 2));
      if (data && data.id) {
        router.push('/admin');
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };
  console.log('Post state:', { title, content, excerpt });

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
            Excerpt
          </label>
          <Textarea
            id="excerpt"
            name="excerpt"
            required
            value={excerpt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExcerpt(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="flex items-center mb-2">
            <label className="mr-2">Markdown</label>
            <input
              type="checkbox"
              checked={isMarkdown}
              onChange={() => setIsMarkdown(!isMarkdown)}
            />
          </div>
          {isMarkdown ? (
            <Textarea
              id="content"
              name="content"
              required
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            />
          ) : (
            <RichTextEditor
              value={content}
  onChange={(value: string) => setContent(value)}
            />
          )}
        </div>
        <Button type="submit">{post ? 'Update' : 'Create'} Post</Button>
      </form>
    </AdminLayout>
  );
};

export default PostForm;
