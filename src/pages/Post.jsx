import { useCallback, useEffect, useState } from "react";
import HtmlReactParser from "html-react-parser";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";

import { databasesService, storageService } from "../appwrite";
import { Button, Container, Loader } from "../components";

function Post() {
  const [post, setPost] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = Boolean(post && userData && post.userId === userData.$id);
  const isPrivate = Boolean(post?.isPrivate);
  const canViewPost = isAuthor || !isPrivate;

  // Update the document title
  useEffect(() => {
    if (!post) return;

    const pageTitle =
      post.title.length > 10 ? `${post.title.slice(0, 10)}...` : post.title;
    document.title = `${pageTitle} - Blog`;
  }, [post]);

  // Load the requested post
  const fetchPost = useCallback(async () => {
    if (!slug) {
      navigate("/", { replace: true });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await databasesService.getPost(slug);

      if (!result) {
        navigate("/", { replace: true });
        return;
      }

      setPost(result);
    } catch {
      setError("Unable to load the post. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [navigate, slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  // Prevent access to private posts owned by other users
  useEffect(() => {
    if (post && !canViewPost) {
      navigate("/", { replace: true });
    }
  }, [canViewPost, navigate, post]);

  // Load the featured image
  useEffect(() => {
    let cancelled = false;

    async function loadPreview() {
      if (!post?.featuredImage) {
        setPreview(null);
        return;
      }

      try {
        const url = await storageService.getFileView(post.featuredImage);

        if (!cancelled) {
          setPreview(url);
        }
      } catch {
        if (!cancelled) {
          setPreview(null);
        }
      }
    }

    loadPreview();

    return () => {
      cancelled = true;
    };
  }, [post]);

  // Delete the current post
  const deletePost = async () => {
    if (!post) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) return;

    try {
      const status = await databasesService.deletePost(post.$id);

      if (status) {
        if (post.featuredImage) {
          await storageService.deleteFile(post.featuredImage);
        }

        navigate("/", { replace: true });
      }
    } catch {
      setError("Unable to delete the post. Please try again.");
    }
  };

  // Show a loader while fetching the post
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Display an error message
  if (error) {
    return (
      <div className="py-8">
        <Container>
          <p className="text-red-500">{error}</p>
        </Container>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="px-4 py-8">
      <Container>
        <div className="relative mb-8 flex w-full justify-center rounded-xl border p-2">
          <img
            src={preview ?? "/blogify.svg"}
            alt={post.title}
            className="rounded-xl max-h-100"
          />

          {isAuthor && (
            <div className="absolute top-6 right-6">
              <Link to={`/edit-post/${post.slug}`}>
                <Button
                  bgColor="bg-green-400"
                  className="mr-1 rounded-xl px-4 py-1"
                >
                  Edit
                </Button>
              </Link>

              <Button
                bgColor="bg-red-400"
                className="rounded-xl px-4 py-1"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="mb-6 w-full">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        <hr className="mb-6" />

        <div className="browser-css">{HtmlReactParser(post.content)}</div>
      </Container>
    </div>
  );
}

export default Post;
