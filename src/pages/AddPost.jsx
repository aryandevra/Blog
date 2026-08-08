import { Container, PostForm } from '../components';

// Render the create post page
const AddPost = () => {
  return (
    <div className="mx-auto px-8 py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
