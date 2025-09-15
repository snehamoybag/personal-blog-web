import type { ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";

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
        <a href="/">Return to home page</a>
      </p>
    </Main>
  );
}
