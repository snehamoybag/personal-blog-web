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

function Root() {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage);
  const [authToken, setAuthToken] = useState<string | null>(
    getAuthTokenFromLocalStorage,
  );

  useEffect(() => {
    // sync local storage with component
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
    </>
  );
}

export default Root;
