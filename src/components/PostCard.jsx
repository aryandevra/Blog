import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { storageService } from "../appwrite";

const PostCard = ({ title, slug, featuredImage, content }) => {
  const [preview, setPreview] = useState(null);

  // Load the featured image
  useEffect(() => {
    let cancelled = false;

    async function loadPreview() {
      if (!featuredImage) {
        setPreview(null);
        return;
      }

      try {
        const url = await storageService.getFileView(featuredImage); // getFilePreview requires appwrite subscription

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
  }, [featuredImage]);

  // Generate preview text
  const previewText = useMemo(() => {
    if (!content) {
      return "Explore insights, stories and ideas.";
    }

    return content.replace(/<[^>]*>/g, "").slice(0, 35);
  }, [content]);

  return (
    <Link to={`/post/${slug}`}>
      <div className="overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-lg transition duration-200 hover:-translate-y-2 hover:shadow-2xl">
        <img
          src={preview ?? "/blogify.svg"}
          alt={title}
          className="h-56 w-full object-cover"
        />

        <div className="p-6">
          <h2 className="mt-4 text-2xl font-bold text-slate-900">{title}</h2>

          <p className="mt-3 text-slate-500">
            {previewText.length >= 50 ? `${previewText}...` : previewText}
          </p>

          <div className="mt-5 inline-block rounded-full px-4 py-2 font-semibold text-violet-600 transition hover:bg-violet-100">
            Read More →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
