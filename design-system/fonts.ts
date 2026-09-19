import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Serif for headings, used by themes with `headingFont: "serif"`. Downloaded only when used. */
const fontSerif = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  preload: false,
});

/** Class names that define the font variables used by design-system/tokens.css. */
export const fontVariables = [fontSans.variable, fontMono.variable, fontSerif.variable].join(" ");
