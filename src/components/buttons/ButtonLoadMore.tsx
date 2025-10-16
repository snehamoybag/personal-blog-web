import type { MouseEventHandler, ReactElement } from "react";
import useDataFetcher from "../../hooks/useDataFetcher";
import type { ParsedResponseShape } from "../../types/ResponseShape";
import ButtonPrimary from "./ButtonPrimary";

interface ButtonLoadMoreProps {
  url: URL | RequestInfo;
  onSuccessCallback: (data: ParsedResponseShape["data"]) => void;
  onErrorCallback: (error: Error) => void;
  className?: string;
}

export default function ButtonLoadMore({
  url,
  onSuccessCallback,
  onErrorCallback,
  className = "",
}: Readonly<ButtonLoadMoreProps>): ReactElement {
  const { state, data, error, fetcher } = useDataFetcher();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {};

  return (
    <ButtonPrimary type="button" onClick={handleClick}>
      Load more...
    </ButtonPrimary>
  );
}
