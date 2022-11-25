import arabic from "../assets/flags/arabic.png";
import i18n from "i18next";
import english from "../assets/flags/english.png";
export const langs = [
  {
    label: "English",
    lang: "english",
    img: english,
    code: "en",
    dir: "ltr",
  },
  {
    label: "العربية",
    lang: "arabic",
    img: arabic,
    code: "ar",
    dir: "rtl",
  },
];

export const navLinks = [
  {
    link: "/commands",
    label: "commands",
  },
  {
    link: "/support",
    label: "support",
  },
];
