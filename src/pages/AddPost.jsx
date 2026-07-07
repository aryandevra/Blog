import { Container, PostForm } from "../components";

// Render the create post page
function AddPost() {
  return (
    <div className="mx-auto px-8 py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
