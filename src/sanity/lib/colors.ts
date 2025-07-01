export const textColorList = [
  "#066406",
  "#1e1f1b",
  "#291e11",
  "#5a9a36",
  "#abb0a1",
  "#e6fae6",
  "#faf5ee",
  "#ffffff",
];

export const textColorMap = {
  "#066406": "text-primary-700",
  "#1e1f1b": "text-neutral-dark-700",
  "#291e11": "text-secondary-800",
  "#5a9a36": "text-primary-600",
  "#abb0a1": "text-neutral-800",
  "#e6fae6": "text-primary-100",
  "#faf5ee": "text-secondary-100",
  "#ffffff": "text-neutral-100",
};

export type TextColor = keyof typeof textColorMap;
