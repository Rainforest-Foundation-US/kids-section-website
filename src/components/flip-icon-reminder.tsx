import React from "react";
import { FlipIcon } from "./icons/icons";

export function FlipIconReminder() {
  const elementRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={elementRef}
      className="absolute -top-40 bottom-full right-0 my-8 max-w-full md:left-[10%] md:right-[10%] md:max-w-[80%]"
    >
      <div className="rounded-lg border-2 border-primary-400 bg-neutral-100 p-4 text-primary-700 shadow-lg">
        <p className="text-gray-800 text-sm">
          If you see this icon <FlipIcon className="inline h-6 w-6" /> on the
          top right corner of a postcard or a polaroid, that means you can flip
          it by clicking on it.
        </p>
      </div>
    </div>
  );
}
