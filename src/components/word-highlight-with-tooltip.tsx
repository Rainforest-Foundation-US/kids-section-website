import { Tooltip } from "react-tooltip";

export function WordHighlightWithTooltip({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: { description: string };
}) {
  return (
    <span
      className="group relative cursor-pointer underline"
      data-tooltip-id="custom-tooltip"
      data-tooltip-content={value?.description}
    >
      {children}
      <Tooltip
        id="custom-tooltip"
        place="top"
        className="!max-w-64 !rounded-md !bg-primary-800 !text-neutral-100"
      />
    </span>
  );
}
