import { createSlice } from "@reduxjs/toolkit";

// Initial post state
const initialState = {
  publicPosts: [],
  userPosts: [],
  needsRefresh: {
    public: true,
    user: true,
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Set posts for a specific type (public or user)
    setPosts: (state, action) => {
      const { type = "public", posts = [] } = action.payload ?? {};

      if (type === "public") {
        state.publicPosts = posts;
        state.needsRefresh.public = false;
      }

      if (type === "user") {
        state.userPosts = posts;
        state.needsRefresh.user = false;
      }
    },

    // Add a new post to both public and user posts if it doesn't already exist
    addPost: (state, action) => {
      const post = action.payload;

      if (!post) return;

      const hasPublicPost = state.publicPosts.some(
        item => item.$id === post.$id
      );
      const hasUserPost = state.userPosts.some(item => item.$id === post.$id);

      if (!hasPublicPost) {
        state.publicPosts = [post, ...state.publicPosts];
      }

      if (!hasUserPost) {
        state.userPosts = [post, ...state.userPosts];
      }

      state.needsRefresh.public = false;
      state.needsRefresh.user = false;
    },

    // Update an existing post in both public and user posts
    updatePost: (state, action) => {
      const updatedPost = action.payload;

      if (!updatedPost) return;

      state.publicPosts = state.publicPosts.map(post =>
        post.$id === updatedPost.$id ? updatedPost : post
      );
      state.userPosts = state.userPosts.map(post =>
        post.$id === updatedPost.$id ? updatedPost : post
      );

      state.needsRefresh.public = false;
      state.needsRefresh.user = false;
    },

    // Remove a post from both public and user posts
    removePost: (state, action) => {
      const postId = action.payload;

      if (!postId) return;

      state.publicPosts = state.publicPosts.filter(post => post.$id !== postId);

      state.userPosts = state.userPosts.filter(post => post.$id !== postId);
    },

    // Invalidate posts for a specific type (public, user, or all)
    invalidatePosts: (state, action) => {
      const type = action.payload ?? "all";

      if (type === "all" || type === "public") {
        state.needsRefresh.public = true;
      }

      if (type === "all" || type === "user") {
        state.needsRefresh.user = true;
      }
    },
  },
});

export const { setPosts, addPost, updatePost, removePost, invalidatePosts } =
  postSlice.actions;

export default postSlice.reducer;
