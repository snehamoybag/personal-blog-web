import type { ReactElement } from "react";

interface AvatarIconProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  className?: string;
}

export default function AvatarIcon({
  firstName,
  lastName,
  avatarUrl,
  className = "",
}: Readonly<AvatarIconProps>): ReactElement {
  const avatarBgColor =
    `#${firstName.charCodeAt(0) + lastName.charCodeAt(0) + 100}`.slice(0, 4); // +100 to make sure hex code always has 3 characters

  return (
    <div
      className={`size-8 border-2 border-neutral-700 rounded-full overflow-hidden ${className}`}
    >
      {!avatarUrl ? (
        <span
          className="grid items-center h-full text-neutral-200 text-center font-bold uppercase italic"
          style={{
            backgroundColor: avatarBgColor,
          }}
        >
          {firstName[0] + lastName[0]}
        </span>
      ) : (
        <img
          src={avatarUrl}
          alt={`avatar of ${firstName} ${lastName}`}
          className="size-full object-contain object-center"
        />
      )}
    </div>
  );
}
