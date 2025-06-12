import { screenBreakpoints } from "tailwind.config";

export function getScreenBreakpoints() {
  const breakpoints = Object.entries(screenBreakpoints).reduce(
    (acc, [key, value]) => {
      acc[key] = parseInt(value.replace("px", ""));

      return acc;
    },
    {} as Record<string, number>,
  );

  return breakpoints;
}
