import { useEffect, useRef, useState } from "react";
import ButtonSearch from "./components/buttons/ButtonSearch";
import Header from "./components/landmarks/Header";
import Logo from "./components/Logo";
import SearchModal from "./components/SearchModal";
import ButtonAccount from "./components/buttons/ButtonAccount";
import AccountOptions from "./components/AccountOptions";
import ListItem from "./components/ListItem";
import { Outlet } from "react-router";
import type { User } from "./types/User";

const USER_KEY = String(import.meta.env.USER_KEY);

function Root() {
  const [user, setUser] = useState<User | null>(() => {
    // get initial value from local storage
    const rawData = localStorage.getItem(USER_KEY);

    if (!rawData) {
      return null;
    }

    return JSON.parse(rawData) satisfies User;
  });

  useEffect(() => {
    // sync local storage with component
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  const outletContext = {
    user: {
      get: user,
      set: setUser,
    },
  };

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
              text="account options"
              onClick={toggleAccountOptions}
            />

            <AccountOptions
              ref={accountOptionsRef}
              className="min-w-max top-full ml-auto"
            >
              {!user && (
                <ol role="list">
                  <ListItem>
                    <a href="/login" className="hidden-underline">
                      Log in
                    </a>
                  </ListItem>
                  <ListItem className="mt-2">
                    <a href="/signup" className="hidden-underline">
                      Sign up
                    </a>
                  </ListItem>
                </ol>
              )}
            </AccountOptions>
          </div>
        </div>
        <SearchModal ref={searchModalRef} />
      </Header>

      <Outlet context={outletContext} />
    </>
  );
}

export default Root;
