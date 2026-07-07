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

// Configure application routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        handle: {
          title: "Home",
        },
        element: <Home />, // all can view home page
      },
      {
        path: "/login",
        handle: {
          title: "Login",
        },
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        handle: {
          title: "Signup",
        },
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/all-posts",
        handle: {
          title: "All Posts",
        },
        element: (
          <Protected authentication>
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        handle: {
          title: "Post",
        },
        element: <Post />, // all can view post if public
      },
      {
        path: "/add-post",
        handle: {
          title: "Add Post",
        },
        element: (
          <Protected authentication>
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        handle: {
          title: "Edit Post",
        },
        element: (
          <Protected authentication>
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "*",
        handle: {
          title: "404 Error",
        },
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
