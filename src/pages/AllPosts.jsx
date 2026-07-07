import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { databasesService } from "../appwrite";
import { Container, Loader, PostCard } from "../components";

// Render all posts created by the current user
function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);

  // Load the user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await databasesService.getPosts(userData.$id);
        setPosts(response);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userData]);

  return (
    <Container>
      <div className="px-6 py-16" id="posts">
        <h2 className="mb-8 text-3xl font-bold">Posts</h2>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <h2 className="inline-block rounded-lg border border-yellow-400 bg-yellow-100 px-4 py-3 text-xl text-slate-600">
              There are no posts to view
            </h2>
          </div>
        )}
      </div>
    </Container>
  );
}

export default AllPosts;
