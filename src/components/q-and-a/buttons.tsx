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
        "shadow-app-lg shadow-shadow-gray w-full border-l-[0.25rem] py-6 pl-5 pr-6 text-left text-base font-semibold",
        props.isActive
          ? "border-primary-500 text-neutral-dark-800 bg-neutral-100"
          : "text-neutral-dark-500 border-transparent bg-neutral-300"
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
