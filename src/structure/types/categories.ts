export const categoryMap = {
  vyjmenovana_slova: "Vyjmenovaná slova",
  pady: "Pády",
  shoda: "Shoda podnětu s přísudkem",
  i_y: "I/Y",
  mne_me: "Mně/mě",
} as const;

export type CategoryKey = keyof typeof categoryMap;
export type Category = typeof categoryMap[CategoryKey];

export const planetColors = {
  vyjmenovana_slova: "bg-yellow-400",
  pady: "bg-green-400",
  shoda: "bg-purple-400",
  i_y: "bg-blue-400",
  mne_me: "bg-pink-400",
} satisfies Record<CategoryKey, string>;
