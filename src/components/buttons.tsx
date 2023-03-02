import clsx from "clsx";
import { IconRight } from "./icons/icons";
import { useHomeSectionNavigation } from "./sections";
import Link from "next/link";
import { useRouter } from "next/router";

type NavLinkProps = Omit<PropsOf<typeof Link>, "className"> & {
  className?: string | ((isActive: boolean) => string);
};
function NavLink({ className, ...props }: NavLinkProps) {
  const router = useRouter();

  return (
    <Link
      aria-current={router.pathname === props.href ? "page" : false}
      className={
        typeof className === "function"
          ? className(router.pathname === props.href)
          : className
      }
      {...props}
    />
  );
}

export function HomeGoToSectionButton() {
  const { onGoNext } = useHomeSectionNavigation();

  return (
    <button
      className="border-2 border-primary-100 bg-primary-500 w-20 h-20 rounded-full flex items-center justify-center shadow-green-shadow"
      onClick={onGoNext}
    >
      <IconRight />
    </button>
  );
}

export function NavBarLink(props: {
  className?: string;
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <NavLink
      className={(isActive) =>
        clsx(
          "relative",
          "transition-all duration-75 ease-in-out",
          "after:absolute after:inset-x-0 after:bottom-[-0.9rem] after:h-[2px] after:pointer-events-none",
          isActive
            ? "after:bg-primary-600 after:scale-x-100 text-primary-600"
            : "after:bg-transparent after:scale-x-0 text-neutral-dark-500",
          "px-4 py-4 transition-all duration-75",
          props.className
        )
      }
      href={props.href}
    >
      {props.children}
    </NavLink>
  );
}

export function AppButton({
  size = "medium",
  ...props
}: {
  className?: string;
  variant: "primary" | "secondary";
  size?: "medium" | "large";
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={clsx(
        "duration-75 transition-all",
        "text-base font-medium",
        "px-8 py-4 rounded-lg",
        "border-1 shadow-app-lg",
        "active:translate-x-1 active:translate-y-1 active:shadow-app-sm",

        // Primary
        props.variant === "primary" &&
          "text-primary-800 bg-primary-500 border-primary-600 shadow-shadow-green",
        props.variant === "primary" &&
          "hover:bg-primary-400 active:bg-primary-500",

        // Secondary
        props.variant === "secondary" &&
          "text-neutral-dark-600 bg-secondary-100 border-neutral-600 shadow-shadow-gray",
        props.variant === "secondary" &&
          "hover:bg-neutral-100 active:bg-secondary-100",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
