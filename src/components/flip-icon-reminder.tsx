import React from "react";
import { FlipIcon } from "./icons/icons";

export function FlipIconReminder() {
  const elementRef = React.useRef<HTMLDivElement>(null);

  const positionStyle = {
    right: `-350px`,
    top: `-50px`,
  };

  return (
    <div
      ref={elementRef}
      className="absolute max-w-xs rotate-6"
      style={positionStyle}
    >
      <div className="rounded-lg border-2 border-primary-400 bg-neutral-100 p-4 text-primary-700 shadow-lg">
        <p className="text-gray-800 text-sm">
          If you see this icon <FlipIcon className="inline h-6 w-6" /> on the
          top right corner of a postcard or a polaroid, that means you can flip
          it by clicking on it
        </p>
      </div>
    </div>
  );
}
