
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('date');

  useEffect(() => {
    const fetchPosts = async () => {
      // Simulate an API call to fetch posts
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => post.title.includes(filter));
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sort === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sort === 'title') {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Filter by title..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Select onValueChange={(value) => setSort(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPosts.map((post) => (
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

export default HomePage;
