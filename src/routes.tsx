import type { RouteObject } from "react-router";
import Root from "./Root";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";
import LogoutPage from "./pages/LogoutPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <IndexPage /> },

      {
        path: "/signup",
        element: <SignupPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/logout",
        element: <LogoutPage />,
      },

      {
        path: "/blogs/:blogId",
        element: <BlogPage />,
      },
    ],
  },
];

export default routes;
