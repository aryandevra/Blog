import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { databasesService } from "../appwrite";
import { Container, Loader, PostCard } from "../components";
import { setPosts } from "../store/postSlice";

// Render all posts created by the current user
const AllPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.userPosts);
  const needsRefresh = useSelector(state => state.posts.needsRefresh.user);
  const [loading, setLoading] = useState(false);

  const userData = useSelector(state => state.auth.userData);

  // Load the user's posts only when the cache is empty or invalidated.
  useEffect(() => {
    if (!userData) {
      return;
    }

    if (!needsRefresh && posts.length > 0) {
      return;
    }

    let cancelled = false;

    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await databasesService.getPosts(userData.$id);

        if (!cancelled) {
          dispatch(setPosts({ type: "user", posts: response }));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      cancelled = true;
    };
  }, [dispatch, needsRefresh, posts.length, userData]);

  return (
    <Container>
      <div className="px-6 py-16" id="posts">
        <h2 className="mb-8 text-3xl font-bold">Posts</h2>

        {loading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-slate-600">No posts found.</p>
        )}

        {!loading && posts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllPosts;
