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
    // errorElement: <ErrorPage />, // for unknow errors

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

      // HANDLE 404
      // MAKE SURE IT IS AT THE END OF ALL ROUTES
      {
        path: "*",
        element: <ErrorPage statusCode={404} message="Page not found." />,
      },
    ],
  },
];

export default routes;
