import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPosts } from "../store/postSlice";
import { databasesService } from "../appwrite";
import { Button, Container, Loader, PostCard } from "../components";

const Home = () => {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.posts.publicPosts);
  const needsRefresh = useSelector(state => state.posts.needsRefresh.public);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!needsRefresh && posts.length > 0) return;

    let cancelled = false;

    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await databasesService.getPublicPosts();

        if (cancelled) return;

        dispatch(setPosts({ type: "public", posts: response }));
      } catch (error) {
        console.error("Error fetching posts:", error);

        if (cancelled) return;

        dispatch(setPosts({ type: "public", posts: [] }));
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
  }, [dispatch, needsRefresh, posts.length]);

  return (
    <>
      <section className="bg-linear-to-r from-violet-50 to-indigo-50 py-20">
        <Container>
          <div className="px-6 text-center">
            <h1 className="text-5xl font-bold text-slate-900">
              Discover Amazing Stories
            </h1>

            <p className="mt-6 text-xl text-slate-600">
              Read, write and share your thoughts with the world.
            </p>

            <a href="#posts">
              <Button className="mt-10 inline-block rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg hover:shadow-xl">
                Explore Posts
              </Button>
            </a>
          </div>
        </Container>
      </section>

      <Container>
        <div id="posts" className="px-6 py-16">
          <h2 className="mb-8 text-3xl font-bold">Latest Posts</h2>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader />
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="py-12 text-center">
              <h2 className="inline-block rounded-lg border border-yellow-400 bg-yellow-100 px-4 py-3 text-xl text-slate-600">
                There are no posts to view
              </h2>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
