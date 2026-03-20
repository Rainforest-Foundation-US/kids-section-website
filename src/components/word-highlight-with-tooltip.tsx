import { Tooltip } from "react-tooltip";
import React from "react";
import { createPortal } from "react-dom";

export function WordHighlightWithTooltip({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: { description: string };
}) {
  const [mounted, setMounted] = React.useState(false);

  // Generate a unique ID for each tooltip
  const tooltipId = React.useMemo(
    () => `tooltip-${Math.random().toString(36).substring(2, 11)}`,
    [],
  );

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!value?.description) {
    return (
      <span className="group relative cursor-pointer underline">
        {children}
      </span>
    );
  }

  return (
    <>
      <span
        className="group relative cursor-pointer underline"
        data-tooltip-id={tooltipId}
        data-tooltip-content={value?.description}
      >
        {children}
      </span>
      {mounted &&
        createPortal(
          <Tooltip
            id={tooltipId}
            place="top"
            className="!z-50 !max-w-64 !rounded-md !border !border-primary-300 !bg-primary-800 !text-lg !text-neutral-100 !opacity-95"
          />,
          document.getElementById("app-root")!,
        )}
    </>
  );
}
