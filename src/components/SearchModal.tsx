import {
  useState,
  type ChangeEventHandler,
  type MouseEventHandler,
  type ReactElement,
  type RefObject,
} from "react";
import FieldWrapper from "./form-elemets/FieldWrapper";
import Input from "./form-elemets/Input";
import ButtonClose from "./buttons/ButtonClose";
import useDataFetcher from "../hooks/useDataFetcher";
import ErrorLabel from "./form-elemets/ErrorLabel";
import Tittle400 from "./titles/Title400";
import useDebounce from "../hooks/useDebounce";
import getApiUrl from "../libs/getApiUrl";
import type { Blog } from "../types/Blog";
import SearchedBlogPost from "./SearchedBlogPost";

interface SearchModalProps {
  ref: RefObject<HTMLDialogElement | null>;
  className?: string;
}

const apiUrl = getApiUrl();

export default function SearchModal({
  ref,
  className,
}: Readonly<SearchModalProps>): ReactElement {
  const debounce = useDebounce();
  const { state, data, error, fetcher } = useDataFetcher();
  const [value, setValue] = useState("");

  const blogs = value && data && data.blogs ? (data.blogs as Blog[]) : [];

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);

    // debounce form value
    debounce(() => {
      if (!e.target.value || state === "LOADING") {
        return;
      }

      const url = `${apiUrl}/blogs/?title=${e.target.value}&limit=10`;
      fetcher(url, { mode: "cors" });
    });
  };

  const closeModal: MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = () => {
    if (!ref || !ref.current) {
      return;
    }

    ref.current.close();
  };

  return (
    <dialog
      ref={ref}
      className={`w-full max-w-2xl bg-neutral-800 text-neutral-200 font-base border-1 border-solid border-neutral-700 rounded-lg shadow-md mx-auto top-16 backdrop:backdrop-blur-xs ${className}`}
    >
      <div className="flex justify-between items-center gap-4 p-4 border-b-1 border-b-solid border-neutral-700">
        <Tittle400>Search:</Tittle400>
        <ButtonClose text="close search" onClick={closeModal} />
      </div>
      <form className=" p-4">
        <FieldWrapper className="grid gap-y-2">
          <label htmlFor="search" className="sr-only">
            search blogs
          </label>
          <Input
            id="search"
            name="search"
            value={value}
            placeholder="Search blogs here..."
            onChange={handleChange}
          />

          {value && state === "FINISHED" && !blogs.length && (
            <ErrorLabel htmlFor="search">
              No blog matches: <span className="font-bold">{value}</span>
            </ErrorLabel>
          )}
          {error && <ErrorLabel htmlFor="search">{error.message}</ErrorLabel>}
        </FieldWrapper>
      </form>

      {blogs.length > 0 && (
        <div className="p-4 ">
          <p>
            Results for <span className="font-bold">{value}</span>:
          </p>

          <ul className="mt-2">
            {blogs.map((blog) => (
              <li
                key={blog.id}
                className="p-4 border-b-1 border-neutral-700 last-of-type:border-none"
              >
                <SearchedBlogPost blog={blog} onClick={closeModal} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </dialog>
  );
}
