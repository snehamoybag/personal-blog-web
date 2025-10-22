import { useEffect, useState, type ReactElement } from "react";
import Main from "../components/landmarks/Main";
import AccountDetails from "../components/AccountDetails";
import { useParams } from "react-router";
import getApiUrl from "../libs/getApiUrl";
import type { User } from "../types/User";
import useDataFetcher from "../hooks/useDataFetcher";
import LoadingModal from "../components/LoadingModal";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import UserWrittenBlogs from "../components/UserWrittenBlogs";

export default function AccountPage(): ReactElement {
  const { userId } = useParams();

  if (!userId || !Number(userId)) {
    throw new Error("404 no user found.");
  }

  const { state, data, error, fetcher } = useDataFetcher();
  const [loadBlogs, setLoadBlogs] = useState(false);
  const user = data && data.user ? (data.user as User) : null;

  // fetch user data on page load
  useEffect(() => {
    const url = `${getApiUrl()}/users/${userId}`;
    fetcher(url, {
      mode: "cors",
      method: "GET",
    });
  }, [userId, fetcher]);

  if (state === "FINISHED" && !user) {
    throw new Error("404 User not found.");
  }

  if (error) {
    throw error;
  }

  return (
    <Main>
      <section className="max-w-5xl pb-12 border-b-1 border-neutral-700 mx-auto ">
        {user && <AccountDetails user={user} />}

        <LoadingModal
          message="Loading account details..."
          isLoading={state === "LOADING"}
        />
      </section>

      {user && (
        <section className="container-primary mt-12">
          <h2 className="sr-only">user written blogs</h2>

          {!loadBlogs && (
            <ButtonPrimary
              onClick={() => setLoadBlogs(true)}
              className="block mx-auto"
            >
              Load <span className="capitalize">{user?.profile.firstName}</span>
              's blogs ?
            </ButtonPrimary>
          )}

          {loadBlogs && <UserWrittenBlogs userId={Number(userId)} />}
        </section>
      )}
    </Main>
  );
}
