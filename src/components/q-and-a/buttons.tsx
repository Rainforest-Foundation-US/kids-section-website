import regularClsx from "clsx";

interface QAndAButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive: boolean;
  children: React.ReactNode;
}
export function QAndAButton(props: QAndAButtonProps) {
  return (
    <button
      className={regularClsx(
        "w-full border-l-[0.25rem] py-6 pl-5 pr-6 text-left text-base font-semibold shadow-app-lg shadow-shadow-gray",
        props.isActive
          ? "border-primary-500 bg-neutral-100 text-neutral-dark-800"
          : "border-transparent bg-neutral-300 text-neutral-dark-500",
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
