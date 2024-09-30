import { extendTailwindMerge } from "tailwind-merge";

const clsx = extendTailwindMerge({
  extend: {
    theme: {
      borderWidth: ["1"],
    },
    classGroups: {
      shadow: ["shadow-app-sm", "shadow-app-md", "shadow-app-lg"],
    },
  },
});

export default clsx;
