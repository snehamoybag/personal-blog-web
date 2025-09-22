import type { ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";
import { Link } from "react-router";

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
}

export default function ErrorPage({
  statusCode = 500,
  message = "Unknown server error.",
}: Readonly<ErrorPageProps>): ReactElement {
  return (
    <Main>
      <Tittle700>Error {statusCode}:</Tittle700>
      <p>{message}</p>

      <p className="mt-8">
        <Link to="/">Return to home page</Link>
      </p>
    </Main>
  );
}
