import type { ReactElement } from "react";
import type { User } from "../types/User";
import AvatarIcon from "./AvatarIcon";
import Tittle700 from "./titles/Tittle700";
import UserBadge from "./UserBadge";

interface AccountDetailsProps {
  user: User;
}

export default function AccountDetails({
  user,
}: Readonly<AccountDetailsProps>): ReactElement {
  const profile = user.profile;
  const { firstName, lastName, bio, joinedAt } = profile;

  return (
    <div className="grid grid-cols-[auto_1fr] items-start gap-4">
      <AvatarIcon
        firstName={firstName}
        lastName={lastName}
        className="size-16"
      />

      <div className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1">
        <Tittle700 as="h2" className="capitalize">
          {firstName} {lastName}
        </Tittle700>

        <UserBadge role={"ADMIN"} className=" max-w-fit" />

        {/* TODO: make it real */}
        <p className="col-span-2 text-neutral-400">
          Member since: {new Date(joinedAt).toDateString()}
        </p>
      </div>

      {bio && (
        <p className="col-span-2">
          <span className="sr-only">Bio: </span>
          {bio}
        </p>
      )}
    </div>
  );
}
