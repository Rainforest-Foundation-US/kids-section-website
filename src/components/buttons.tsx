import clsx from "clsx";
import { IconRight } from "./icons/icons";
import { useHomeSectionNavigation } from "./sections";

export function HomeGoNextSectionButton() {
  const { onGoNext } = useHomeSectionNavigation();

  return (
    <button
      className="border-2 border-primary-100 bg-primary-500 w-20 h-20 rounded-full flex items-center justify-center green-shadow"
      onClick={onGoNext}
    >
      <IconRight />
    </button>
  );
}

export function NavBarButton(props: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={clsx(
        "hover:bg-neutral-100 text-neutral-dark-500 hover:text-neutral-dark-800 px-4 py-2 rounded-lg transition-all duration-75 hover:bg-opacity-50",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
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
        "border-1",
        props.variant === "primary" &&
          "text-primary-800 bg-primary-500 border-primary-600 green-shadow",
        props.variant === "secondary" &&
          "text-neutral-dark-600 bg-secondary-100 border-neutral-600 gray-shadow",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
