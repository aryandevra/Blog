import { useEffect, useState } from "react";

import { databasesService } from "../appwrite";
import { Container, Loader, PostCard } from "../components";

// Render the home page
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load public posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await databasesService.getPublicPosts();
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-violet-50 via-white to-indigo-100">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-6xl font-extrabold text-slate-900 md:text-7xl">
            Discover <span className="text-violet-600">Amazing</span> Stories
          </h1>

          <p className="mt-6 text-xl text-slate-600">
            Read, write and share your thoughts with the world.
          </p>

          <a
            href="#posts"
            className="mt-10 inline-block rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
          >
            Explore Posts
          </a>
        </div>
      </section>

      <Container>
        <div className="px-6 py-16" id="posts">
          <h2 className="mb-8 text-3xl font-bold">Latest Posts</h2>

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
    </>
  );
}

export default Home;
