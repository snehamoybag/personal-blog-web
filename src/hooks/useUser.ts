import { useState, useEffect } from "react";
import type { User } from "../types/User";

const USER_KEY = import.meta.env.VITE_USER_KEY;

const getUserFromLocalStorage = () => {
  const raw = localStorage.getItem(String(USER_KEY));

  if (!raw) {
    return null;
  }

  const parsed = JSON.parse(raw);

  if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
    return null;
  }

  const keys = Object.keys(parsed);

  const hasAllkeys = keys.every((item) => {
    return ["id", "role", "profile"].includes(item);
  });

  if (!hasAllkeys) {
    console.error("User data mismatch.");
    return null;
  }

  return parsed as User;
};

// RETURNS AND SYNCS USER WITH LOCALSTORAGE
const useUser = () => {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  useEffect(() => {
    // sync local storage with component
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  return { user, setUser };
};

export default useUser;
