import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

import { databasesService } from '../appwrite';
import { useDocumentTitle } from '../hooks';
import { Container, Loader, PostForm } from '../components';

// Render the edit post page
const EditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector(state => state.auth.userData);
  const [post, setPost] = useState(null);

  // Update the document title
  const pageTitle = post
    ? post.title.length > 10
      ? `${post.title.slice(0, 10)}...`
      : post.title
    : 'Edit Post';

  useDocumentTitle(pageTitle);

  // Load the requested post
  useEffect(() => {
    if (!userData || !slug) {
      navigate('/', { replace: true });
      return;
    }

    const fetchPost = async () => {
      try {
        const fetchedPost = await databasesService.getPost(slug);

        if (fetchedPost.userId !== userData.$id) {
          toast.error('Unauthorized access');
          navigate(`/post/${slug}`, { replace: true });
          return;
        }

        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Post not found');
        navigate('/', { replace: true });
      }
    };

    fetchPost();
  }, [navigate, slug, userData]);

  // Show a loader while fetching the post
  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto px-8 py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
