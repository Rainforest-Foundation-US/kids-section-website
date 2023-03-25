import clsx from "clsx";
import { IconRight } from "./icons/icons";
import { useHomeSectionNavigation } from "./sections";
import { useRouter } from "next/router";
import Link from "next/link";

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
      className="shadow-green-shadow flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary-100 bg-primary-500"
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
          "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-[-0.9rem] after:h-[2px]",
          isActive
            ? "text-primary-600 after:scale-x-100 after:bg-primary-600"
            : "text-neutral-dark-500 after:scale-x-0 after:bg-transparent",
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

interface AppButtonProps {
  className?: string;
  variant: "primary" | "secondary";
  size?: "medium" | "large";
  children?: React.ReactNode;
  onClick?: () => void;
}
export function AppButton({ size = "medium", ...props }: AppButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-lg border-1 px-8 py-4 text-base font-medium shadow-app-lg transition-all duration-75 active:translate-x-1 active:translate-y-1 active:shadow-app-sm",

        // Primary
        props.variant === "primary" &&
          "border-primary-600 bg-primary-500 text-primary-800 shadow-shadow-green",
        props.variant === "primary" &&
          "hover:bg-primary-400 active:bg-primary-500",

        // Secondary
        props.variant === "secondary" &&
          "border-neutral-600 bg-secondary-100 text-neutral-dark-600 shadow-shadow-gray",
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

interface AppLinkProps {
  className?: string;
  variant: "primary" | "secondary";
  href: string;
  size?: "medium" | "large";
  children?: React.ReactNode;
  onClick?: () => void;
}
export function AppLink({ size = "medium", ...props }: AppLinkProps) {
  return (
    <Link
      href={props.href}
      className={clsx(
        "rounded-lg border-1 px-8 py-4 text-base font-medium shadow-app-lg transition-all duration-75 active:translate-x-1 active:translate-y-1 active:shadow-app-sm",

        // Primary
        props.variant === "primary" &&
          "border-primary-600 bg-primary-500 text-primary-800 shadow-shadow-green",
        props.variant === "primary" &&
          "hover:bg-primary-400 active:bg-primary-500",

        // Secondary
        props.variant === "secondary" &&
          "border-neutral-600 bg-secondary-100 text-neutral-dark-600 shadow-shadow-gray",
        props.variant === "secondary" &&
          "hover:bg-neutral-100 active:bg-secondary-100",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
}
