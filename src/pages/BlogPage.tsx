import type { ReactElement } from "react";
import Main from "../components/landmarks/Main";
import blogs from "../libs/blogsData";
import { useParams } from "react-router";
import ErrorPage from "./ErrorPage";

export default function BlogPage(): ReactElement {
  // const params = useParams();

  // const blogId = Number(params.blogId);
  const blog = blogs[0];

  if (!blog) {
    return <ErrorPage statusCode={404} message="Blog not found." />;
  }

  return <Main></Main>;
}
