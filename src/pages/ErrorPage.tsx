import type { ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
}

export default function ErrorPage({
  statusCode = 404,
  message = "Page not found.",
}: Readonly<ErrorPageProps>): ReactElement {
  return (
    <Main>
      <Tittle700>Error {statusCode}:</Tittle700>
      <p>{message}</p>
    </Main>
  );
}
