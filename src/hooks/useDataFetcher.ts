import { useCallback, useState } from "react";
import type { ParsedResponseShape } from "../types/ResponseShape";

interface DataFetcherReturn {
  state: "IDLE" | "LOADING" | "FINISHED";
  error: Error | null;
  data: Record<string, unknown> | null;
  fetcher: (url: RequestInfo | URL, init?: RequestInit) => void;
}

const useDataFetcher = (): DataFetcherReturn => {
  const [state, setState] = useState<DataFetcherReturn["state"]>("IDLE");
  const [error, setError] = useState<DataFetcherReturn["error"]>(null);
  const [data, setData] = useState<DataFetcherReturn["data"]>(null);

  const fetcher = useCallback((url: RequestInfo | URL, init?: RequestInit) => {
    // reset states from previous operation
    setError(null);
    setData(null);
    setState("LOADING");

    fetch(url, init)
      .then((response) => response.json())
      .then((result: ParsedResponseShape) => {
        const { status, statusCode, message, data } = result;

        // set data before throwing any error as data will always be returned either as undefined or as an object.
        setData(data || null);

        if (status !== "success" || statusCode >= 400) {
          throw new Error(`${statusCode} ${message}`);
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("503 Failed to fetch."));
        }
      })
      .finally(() => {
        setState("FINISHED");
      });
  }, []);

  return {
    state,
    error,
    data,
    fetcher,
  };
};

export default useDataFetcher;
