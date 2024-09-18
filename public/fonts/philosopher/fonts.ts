import localFont from "next/font/local";

export const philosopher = localFont({
  src: [
    {
      path: "./Philosopher-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Philosopher-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./Philosopher-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Philosopher-Italic.ttf",
      weight: "500",
      style: "italic",
    },
  ],
});
