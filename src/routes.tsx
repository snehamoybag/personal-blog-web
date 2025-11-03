import type { RouteObject } from "react-router";
import Root from "./Root";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";
import LogoutPage from "./pages/LogoutPage";
import AccountPage from "./pages/AccountPage";
import TagPage from "./pages/TagPage";

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
        path: "/users/:userId",
        element: <AccountPage />,
      },

      {
        path: "/blogs/:blogId",
        element: <BlogPage />,
      },

      {
        path: "/tags/:tagName",
        element: <TagPage />,
      },
    ],
  },
];

export default routes;
