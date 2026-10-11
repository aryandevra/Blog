import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { databasesService, storageService } from "../../appwrite";
import { Button, Input, Loader, RTE, Select } from "..";
import { addPost, invalidatePosts, updatePost } from "../../store/postSlice";

const PostForm = ({ post }) => {
  // Initialize navigation, Redux and component state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);

  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize form state
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      isPrivate: "false",
      image: null,
    },
  });

  // Generate a URL-friendly slug from the title
  const slugTransform = useCallback(value => {
    if (!value) return "";

    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, []);

  // Update the slug automatically when the title changes
  useEffect(() => {
    const subscription = watch((formValues, { name, type }) => {
      if (name === "title" && type === "change") {
        setValue("slug", slugTransform(formValues.title), {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, slugTransform, watch]);

  // Populate the form when editing an existing post
  useEffect(() => {
    if (!post) {
      reset({
        title: "",
        slug: "",
        content: "",
        isPrivate: "false",
        image: null,
      });

      setFeaturedImageUrl("");
      return;
    }

    reset({
      title: post.title || "",
      slug: post.slug || "",
      content: post.content || "",
      isPrivate: post.isPrivate ? "true" : "false",
      image: null,
    });
  }, [post, reset]);

  // Load the current featured image
  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedImage() {
      if (!post?.featuredImage) {
        setFeaturedImageUrl("");
        return;
      }

      try {
        const viewUrl = await storageService.getFileView(post.featuredImage);

        if (!cancelled) {
          setFeaturedImageUrl(viewUrl);
        }
      } catch (error) {
        console.error("Failed to load featured image:", error);

        if (!cancelled) {
          setFeaturedImageUrl("");
        }
      }
    }

    loadFeaturedImage();

    return () => {
      cancelled = true;
    };
  }, [post]);

  const watchedImage = watch("image");

  // Preview the selected image before uploading
  useEffect(() => {
    if (!watchedImage?.length) return;

    const file = watchedImage[0];
    const previewUrl = URL.createObjectURL(file);

    setFeaturedImageUrl(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [watchedImage]);

  // Create a new post or update an existing one
  const submit = async formData => {
    setError("");
    setLoading(true);

    let featuredImageId = post?.featuredImage ?? null;
    let uploadedFile = null;

    try {
      // Upload a new featured image if selected
      if (formData.image?.length) {
        uploadedFile = await storageService.uploadFile(formData.image[0]);
        featuredImageId = uploadedFile.$id;
      }

      const payload = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        featuredImage: featuredImageId,
        isPrivate: formData.isPrivate === "true",
      };

      // Update an existing post
      if (post) {
        const updatedPost = await databasesService.updatePost(post.$id, {
          ...payload,
          userId: post.userId || userData?.$id,
        });

        if (!updatedPost) {
          if (uploadedFile) {
            await storageService.deleteFile(uploadedFile.$id);
          }

          throw new Error("Unable to update post.");
        }

        // Remove the previous featured image after a successful update
        if (uploadedFile && post.featuredImage) {
          await storageService.deleteFile(post.featuredImage);
        }

        dispatch(updatePost(updatedPost));
        dispatch(invalidatePosts("all"));

        navigate(`/post/${updatedPost.slug}`, {
          replace: true,
        });

        return;
      }

      // Create a new post
      const createdPost = await databasesService.createPost({
        ...payload,
        userId: userData.$id,
      });

      if (!createdPost) {
        if (uploadedFile) {
          await storageService.deleteFile(uploadedFile.$id);
        }

        throw new Error("Unable to create post.");
      }

      dispatch(addPost(createdPost));
      dispatch(invalidatePosts("all"));

      navigate(`/post/${createdPost.slug}`, {
        replace: true,
      });
    } catch (submitError) {
      console.error("Post submission failed:", submitError);

      if (submitError?.code === 409) {
        toast.error("Slug already taken");
      } else {
        toast.error("Something went wrong");
      }

      setError(submitError?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Show a loader while submitting the form
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Post details */}
      <div className="w-full space-y-5 px-2 lg:w-2/3">
        <Input
          label="Title:"
          placeholder="Title"
          {...register("title", {
            setValueAs: value => value.trim(),
            required: "Title is required.",
          })}
        />

        {/* Title validation error */}
        {errors.title && (
          <p className="-mt-4 text-sm text-red-500">
            &#9888; {errors.title.message}
          </p>
        )}

        <Input
          label="Slug:"
          placeholder="Slug"
          className="cursor-not-allowed"
          readOnly
          {...register("slug", {
            required: true,
          })}
        />

        <RTE label="Content:" name="content" control={control} />
      </div>

      {/* Post settings */}
      <div className="w-full space-y-5 px-2 lg:w-1/3">
        <Input
          label="Featured Image:"
          type="file"
          accept="image/*"
          textColor="text-gray-500"
          className="text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-600 hover:file:bg-violet-100"
          {...register("image")}
        />

        {/* Featured image preview */}
        {featuredImageUrl && (
          <div className="mb-4 w-full">
            <img
              src={featuredImageUrl}
              alt={post?.title || "Featured image"}
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}

        <Select
          label="Visibility:"
          options={[
            { label: "Public", value: "false" },
            { label: "Private", value: "true" },
          ]}
          {...register("isPrivate", {
            required: true,
          })}
        />

        {/* Submission error */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={loading || !isDirty}
          bgColor={post ? "bg-green-600" : undefined}
          className={`w-full rounded-xl py-2 ${error ? "mt-4" : "mt-8"} ${
            post ? "hover:bg-green-700" : "hover:bg-violet-700"
          } disabled:cursor-not-allowed disabled:bg-gray-400`}
        >
          {post ? "Update" : "Publish"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
