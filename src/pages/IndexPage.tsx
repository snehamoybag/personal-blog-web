import type { ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Post from "../components/Post";
import blogs from "../libs/blogsData";

export default function IndexPage(): ReactElement {
  return (
    <Main>
      {blogs.map((blog) => (
        <Post blog={blog} />
      ))}
    </Main>
  );
}
