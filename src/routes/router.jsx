import { createBrowserRouter } from "react-router";

import App from "../App";
import { Protected } from "../components";
import {
  AddPost,
  AllPosts,
  EditPost,
  Home,
  Login,
  PageNotFound,
  Post,
  Signup,
} from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        handle: { title: "Home" },
        Component: Home,
      },
      {
        path: "/post/:slug",
        handle: { title: "Post" },
        Component: Post,
      },

      // Guest-only routes (Login, Signup)
      {
        element: <Protected authentication={false} />,
        children: [
          {
            path: "/login",
            handle: { title: "Login" },
            Component: Login,
          },
          {
            path: "/signup",
            handle: { title: "Signup" },
            Component: Signup,
          },
        ],
      },

      // Authenticated-only routes (Dashboard/Posts)
      {
        element: <Protected authentication={true} />,
        children: [
          {
            path: "/all-posts",
            handle: { title: "All Posts" },
            Component: AllPosts,
          },
          {
            path: "/add-post",
            handle: { title: "Add Post" },
            Component: AddPost,
          },
          {
            path: "/edit-post/:slug",
            handle: { title: "Edit Post" },
            Component: EditPost,
          },
        ],
      },

      {
        path: "*",
        handle: { title: "404 Error" },
        Component: PageNotFound,
      },
    ],
  },
]);

export default router;
