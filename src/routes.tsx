import type { RouteObject } from "react-router";
import Root from "./Root";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const routes: RouteObject[] = [
  {
    element: <Root />,
    errorElement: <p>Error404: Page not found.</p>,

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
      },
    ],
  },
];

export default routes;
