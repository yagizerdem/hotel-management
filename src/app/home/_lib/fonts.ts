import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";

export const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
});

export const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
});

// Applied on the home layout root and on portalled content (sheets, popovers)
// that renders outside of it.
export const homeFontClassName = `${bodoni.variable} ${hanken.variable} font-[family-name:var(--font-hanken)]`;
