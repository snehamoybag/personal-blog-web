import type { RouteObject } from "react-router";
import Root from "./Root";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";

const routes: RouteObject[] = [
  {
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      { path: "/", index: true, element: <IndexPage /> },

      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/signup",
        element: <SignupPage />,
      },

      {
        path: "/blogs/:blogId",
        element: <BlogPage />,
      },
    ],
  },
];

export default routes;
