import { useLayoutEffect, useRef, type ReactElement } from "react";

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
  const ref = useRef<HTMLDivElement | null>(null);

  const avatarBgColor =
    `#${firstName.charCodeAt(0) + lastName.charCodeAt(0) + 100}`.slice(0, 4); // +100 to make sure hex code always has 3 characters

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const elem = ref.current;
    const elemWidth = elem.getBoundingClientRect().width; // in px
    const relativeFontSize = elemWidth / 2; // 50% of parent width

    elem.style.fontSize = relativeFontSize + "px";
  }, []);

  return (
    <div
      className={`size-8 border-2 border-neutral-700 rounded-full overflow-hidden ${className}`}
    >
      {!avatarUrl ? (
        <span
          ref={ref}
          className="grid items-center size-full text-neutral-200 text-center font-bold uppercase italic"
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
