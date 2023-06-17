function maxLinesPlugin(matchUtilities, theme) {
  const maxLinesDefault = {
    "text-overflow": "ellipsis",
    "word-wrap": "break-word",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
  };

  matchUtilities(
    {
      text: (value) => {
        if (value instanceof Array) {
          const { lineHeight } = value[1];
          return {
            "--el-line-height": lineHeight,
          };
        }
      },
    },
    {
      values: theme("fontSize"),
      type: ["absolute-size", "relative-size", "length", "percentage"],
    }
  );

  matchUtilities(
    {
      "max-lines": (value) => {
        const strValue = value + "";

        return {
          ...maxLinesDefault,
          "max-height": `calc(var(--el-line-height) * ${value})`,
          lineClamp: strValue,
          "-webkit-line-clamp": strValue,
        };
      },
    },
    {
      values: theme("maxLines"),
      type: ["length"],
    }
  );
}

function dashedBordersPlugin(matchUtilities, theme) {
  matchUtilities(
    {
      "dashed-border": (value) => {
        const offset = 12;
        const intValue = parseInt(value, 10);

        let className = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${value}' ry='${value}' stroke='black' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='${offset}' stroke-linecap='square'/%3e%3c/svg%3e")`;

        return {
          "background-image": className,
        };
      },
    },
    {
      values: theme("borderRadius"),
      type: ["length"],
    }
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xs": "380px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      sans: ["var(--app-font)"],
    },
    fontSize: {
      "3xs": ["0.5rem", { lineHeight: "1rem" }],
      "2xs": ["0.65rem", { lineHeight: "1rem" }],
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    colors: {
      transparent: "transparent",
      "neutral-dark": {
        100: "#969C89",
        300: "#878C7B",
        400: "#696D60",
        500: "#5A5E52",
        600: "#3C3E37",
        700: "#1E1F1B",
        800: "#0F100E",
      },
      neutral: {
        100: "#FFFFFF",
        300: "#F5F5F3",
        400: "#EAEBE7",
        500: "#D5D7D0",
        600: "#CBCEC4",
        700: "#C0C4B8",
        800: "#ABB0A1",
      },
      primary: {
        100: "#E6FAE6",
        300: "#B8E0A1",
        400: "#8DCD69",
        500: "#71C043",
        600: "#5A9A36",
        700: "#066406",
        800: "#002900",
      },
      secondary: {
        100: "#FAF5EE",
        300: "#EBD5BB",
        400: "#DCB689",
        500: "#CD9656",
        600: "#90693C",
        700: "#674B2B",
        800: "#291E11",
      },
      complementary: {
        100: "#F0F4EF",
        300: "#C1D2C0",
        400: "#93B091",
        500: "#658E62",
        600: "#476345",
        700: "#283927",
        800: "#141C14",
      },
      error: {
        100: "#FEE4E2",
        300: "#FDA29B",
        400: "#F97066",
        500: "#F04438",
        600: "#D92D20",
        700: "#B42318",
        800: "#913A34",
      },
      warning: {
        100: "#FEF0C7",
        300: "#FEC84B",
        400: "#FDB022",
        500: "#F79009",
        600: "#DC6803",
        700: "#B54708",
        800: "#93370D",
      },
      shadow: {
        green: "rgba(0, 41, 0, 0.16)",
        gray: "rgba(60, 62, 55, 0.08)",
      },
    },
    maxLines: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    },
    extend: {
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        "app-sm": "2px 2px 0px var(--tw-shadow-color)",
        "app-md": "2px 2px 0px var(--tw-shadow-color)",
        "app-lg": "6px 6px 0px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    function ({ addVariant, matchUtilities, theme }) {
      addVariant("children", "& > *");
      dashedBordersPlugin(matchUtilities, theme);
      maxLinesPlugin(matchUtilities, theme);
    },
  ],
};
