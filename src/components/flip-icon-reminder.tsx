import React from "react";
import { FlipIcon } from "./icons/icons";

export function FlipIconReminder() {
  const elementRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={elementRef}
      className="absolute -top-40 left-1/2 my-8 max-w-full -translate-x-1/2 md:max-w-[80%]"
    >
      <div className="w-max rounded-lg border-2 border-primary-400 bg-neutral-100 p-4 text-primary-700 shadow-lg">
        <p className="text-gray-800 text-sm">
          If you see this icon <FlipIcon className="inline h-6 w-6" /> click to
          flip
        </p>
      </div>
    </div>
  );
}
