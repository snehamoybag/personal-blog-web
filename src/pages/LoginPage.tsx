import {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
  type ReactElement,
} from "react";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";
import FieldWrapper from "../components/form-elemets/FieldWrapper";
import Input from "../components/form-elemets/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import useUser from "../hooks/useUser";
import getApiUrl from "../libs/getApiUrl";
import type { ParsedResponseShape } from "../types/ResponseShape";
import type { User } from "../types/User";
import { useNavigate } from "react-router";
import { setUserToLocalStorage } from "../libs/localStorageUser";
import { setAuthTokenToLocalStorage } from "../libs/localStorageAPIAuthToken";

export default function LoginPage(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useUser();
  const redirectTo = useNavigate();

  const handleFormDataChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const elem = e.target;
    setFormData((prevData) => ({ ...prevData, [elem.name]: elem.value }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const url = getApiUrl() + "/login";

    fetch(url, {
      mode: "cors",
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((result: ParsedResponseShape) => {
        const { status, statusCode, message, data } = result;

        if (statusCode >= 400 || status !== "success") {
          throw new Error(message);
        }

        if (!data || !data.user) {
          throw new Error("User data not found in response body.");
        }

        // set user and auth token
        setUser(data.user as User);
        setAuthTokenToLocalStorage(
          typeof data.token === "string" ? data.token : "",
        );

        // redirect to homepage after successful login
        redirectTo("/");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Main>
      <section className="container-primary p-8">
        <Tittle700 as="h1">Log in</Tittle700>

        <div className="mt-4">
          <p>Log in using your email and password.</p>
          <p>
            Don't have an account yet? <a href="/signup">Sign up</a>.
          </p>
        </div>

        <form
          action="/login"
          className="grid gap-4 mt-8"
          onSubmit={handleFormSubmit}
        >
          <FieldWrapper>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormDataChange}
              required
            />
          </FieldWrapper>

          <FieldWrapper>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleFormDataChange}
              required
            />
          </FieldWrapper>

          <ButtonPrimary type="submit" className="py-4 mt-2">
            Log in
          </ButtonPrimary>
        </form>
      </section>
    </Main>
  );
}
