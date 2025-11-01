import { useEffect, useMemo, useRef, useState } from "react";
import ButtonSearch from "./components/buttons/ButtonSearch";
import Header from "./components/landmarks/Header";
import Logo from "./components/Logo";
import SearchModal from "./components/SearchModal";
import ButtonAccount from "./components/buttons/ButtonAccount";
import AccountOptions from "./components/AccountOptions";
import { Outlet } from "react-router";
import type { User } from "./types/User";
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
} from "./libs/localStorageUser";
import type { OutletContext } from "./types/OutletCotext";
import GuestAccountOptions from "./components/GuestAccountOptions";
import UserAccountOptions from "./components/UserAccountOptions";
import {
  getAuthTokenFromLocalStorage,
  setAuthTokenToLocalStorage,
} from "./libs/localStorageAPIAuthToken";
import getApiUrl from "./libs/getApiUrl";
import useDataFetcher from "./hooks/useDataFetcher";
import LoadingModal from "./components/LoadingModal";

function Root() {
  const { state, error, fetcher } = useDataFetcher();
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage);
  const [authToken, setAuthToken] = useState<string | null>(
    getAuthTokenFromLocalStorage,
  );

  // onload check if the jwt is valid if not logout the user
  useEffect(() => {
    if (!authToken || state !== "IDLE") {
      return;
    }

    const url = getApiUrl();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    fetcher(url, {
      mode: "cors",
      method: "POST",
      headers,
    });
  }, [authToken, state, fetcher]);

  // logout user if jwt expired
  useEffect(() => {
    if (state === "FINISHED" && error) {
      setAuthToken(null);
      setUser(null);
    }
  }, [state, error]);

  // sync local storage with component
  useEffect(() => {
    setUserToLocalStorage(user);
    setAuthTokenToLocalStorage(authToken);
  }, [user, authToken]);

  const outletContext = useMemo(
    () => ({
      user: {
        get: user,
        set: setUser,
      },
      authToken: {
        get: authToken,
        set: setAuthToken,
      },
    }),
    [user, authToken],
  );

  const searchModalRef = useRef<HTMLDialogElement>(null);
  const accountOptionsRef = useRef<HTMLDialogElement>(null);

  const toggleSearchModal = () => {
    if (!searchModalRef.current) {
      return;
    }

    const modalEl = searchModalRef.current;

    if (modalEl.hasAttribute("open")) {
      modalEl.close();
    } else {
      modalEl.showModal();
    }
  };

  const toggleAccountOptions = () => {
    if (!accountOptionsRef.current) {
      return;
    }

    const modalEl = accountOptionsRef.current;
    if (modalEl.hasAttribute("open")) {
      modalEl.close();
    } else {
      modalEl.show();
    }
  };

  return (
    <>
      <Header className="flex flex-wrap justify-between items-center gap-4">
        <Logo />
        <div className="flex jusify-end gap-4">
          <ButtonSearch text="search blogs" onClick={toggleSearchModal} />

          <div className="relative">
            <ButtonAccount
              profile={user?.profile}
              text="account options"
              onClick={toggleAccountOptions}
            />

            <AccountOptions
              ref={accountOptionsRef}
              className="min-w-max top-full ml-auto"
            >
              <ol role="list" className="account-options-list">
                {user ? (
                  <UserAccountOptions user={user} />
                ) : (
                  <GuestAccountOptions />
                )}
              </ol>
            </AccountOptions>
          </div>
        </div>

        <SearchModal ref={searchModalRef} />
      </Header>

      <Outlet context={outletContext satisfies OutletContext} />

      <LoadingModal message="Loading..." isLoading={state === "LOADING"} />
    </>
  );
}

export default Root;
