import type { ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";
import FieldWrapper from "../components/form-elemets/FieldWrapper";
import Input from "../components/form-elemets/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";

export default function LoginPage(): ReactElement {
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

        <form action="/login" className="grid gap-4 mt-8">
          <FieldWrapper>
            <label htmlFor="email">Email:</label>
            <Input type="email" id="email" name="email" value={""} required />
          </FieldWrapper>

          <FieldWrapper>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={""}
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
