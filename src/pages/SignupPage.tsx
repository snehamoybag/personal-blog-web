import type { ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";
import FieldWrapper from "../components/form-elemets/FieldWrapper";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Input from "../components/form-elemets/Input";

interface SignupPageProps {
  // props
}

export default function SignupPage({}: Readonly<SignupPageProps>): ReactElement {
  return (
    <Main>
      <Tittle700 as="h1">Sign up</Tittle700>
      <p>Please sign up by filling the form with appropriate informations.</p>
      <p>
        Already have an account? <a href="/login">Log in</a>.
      </p>

      <form action="/signup" className="grid gap-y-4 mt-8">
        <FieldWrapper>
          <label htmlFor="first-name">First name:</label>
          <Input
            type="text"
            id="first-name"
            name="firstName"
            value={""}
            minLength={3}
            maxLength={35}
            required
          />
        </FieldWrapper>

        <FieldWrapper>
          <label htmlFor="last-name">Last name:</label>
          <Input
            type="text"
            id="last-name"
            name="lastName"
            value={""}
            minLength={3}
            maxLength={35}
            required
          />
        </FieldWrapper>

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
            minLength={6}
            maxLength={32}
            required
          />
        </FieldWrapper>

        <FieldWrapper>
          <label htmlFor="confirmed-password">Confirm password:</label>
          <Input
            type="text"
            id="confirmed-password"
            name="confirmed-password"
            value={""}
            minLength={6}
            maxLength={32}
            required
          />
        </FieldWrapper>

        <ButtonPrimary type="submit" className="py-4">
          Sign up
        </ButtonPrimary>
      </form>
    </Main>
  );
}
