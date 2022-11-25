import arabic from "../assets/flags/arabic.png";
import i18n, { t } from "i18next";
import english from "../assets/flags/english.png";
import testingIMG from '../assets/features/test.webp'
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

export const features = [
  {
    icon: 'fa-solid fa-shield-halved',
    text: 'protection-f',
    description:'protection-f-d',
    img:testingIMG,
    line: true
  },
  {
    icon: 'fa-solid fa-envelope-open-text',
    text: 'log-f',
    description:'log-f-d',
    img:testingIMG,
    line: true
  },
  {
    icon: 'fa-solid fa-universal-access',
    text: 'mod-f',
    description:'mod-f-d',
    img:testingIMG
    
  }
]