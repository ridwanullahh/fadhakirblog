
import PostForm from '@/components/PostForm';

import withAuth from '../../../lib/withAuth';

const CreatePostPage = () => {
  return <PostForm />;
};

export default withAuth(CreatePostPage);
