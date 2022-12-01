import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  FirstSection,
  Nav,
  TextHeader,
  ImgHeader,
  SecondSection,
  Element,
  Flag,
  LinkElm,
  ElementSelect,
  ImgSelect,
  MenuSelect,
  VerticalLine,
  NavHover,
  LinkHeader,
  BarContainer,
  FlagContainer,
  BarElementContainer,
  ProfileContainer,
  Nav2,
} from "./styles";
import semibot from "../../assets/semibot.png";
import arabic from "../../assets/flags/arabic.png";
import english from "../../assets/flags/english.png";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { langs } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { APIUser } from "discord-api-types/v10";

interface UserP {
  user: APIUser;
  setSidebarToggle: Dispatch<SetStateAction<boolean>>
}

export function NavbarSidebar({ user, setSidebarToggle }: UserP) {
  let menuRef = useRef<any>(null);
  let profileRef = useRef<any | null>(null);
  const [flagMenu, setFlagMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [lang, setLang] = useState(i18n.language);
  const { t } = useTranslation();
  function changeLanguage(lang: string) {
    if (lang == "ar") {
      setLang("ar");
      i18n.changeLanguage("ar").then(() => setFlagMenu(!flagMenu));
    } else if (lang == "en") {
      setLang("en");
      i18n.changeLanguage("en").then(() => setFlagMenu(!flagMenu));
    }
  }
  const currentLangCode = i18n.language;
  const currentLang: any = langs.find((l) => l.code === currentLangCode);
  useEffect(() => {
    if (currentLangCode) {
      document.dir = currentLang.dir;
    }
  }, [currentLangCode, currentLangCode]);
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!menuRef.current.contains(e.target)) {
        setFlagMenu(false);
      }
      if (!profileRef.current.contains(e.target)) {
        setProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const navigate = useNavigate();

  const profiles = [
    {
      text: t("home"),
      link: "/",
    },
    {
      text: t("commands"),
      link: "/commands",
    },
    {
      text: t("support"),
      link: "/support",
    },
    {
      text: t("servers"),
      link: "/dashboard",
    },
  ];
  // home icon <i class="fa-regular fa-house"></i>
  return (
    <div>
      <Nav>
        <Nav2>
          <FirstSection>
            <Element>
              <BarElementContainer onClick={() => setSidebarToggle(true)}>
                <i className="fa-solid fa-bars"></i>
              </BarElementContainer>
            </Element>
          </FirstSection>
          <SecondSection>
            <Element ref={menuRef as any}>
              <FlagContainer>
                <Flag
                  src={i18n.language == "ar" ? arabic : english}
                  onClick={() => setFlagMenu(!flagMenu)}
                />
              </FlagContainer>
              <MenuSelect
                className={`${lang == "ar" ? "rtl-flag" : "ltr-flag"} ${
                  flagMenu ? "dropdown-active" : "dropdown-inactive"
                }`}
              >
                {langs.map((elm) => (
                  <ElementSelect onClick={() => changeLanguage(elm.code)}>
                    <ImgSelect src={elm.img} />
                    <span>{elm.label}</span>
                  </ElementSelect>
                ))}
              </MenuSelect>
            </Element>
            <Element ref={profileRef as any}>
              <ProfileContainer onClick={() => setProfileMenu(!profileMenu)}>
                {user && (
                  <img
                    src={
                      user.avatar?.startsWith("a_")
                        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif`
                        : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                    }
                  />
                )}
              </ProfileContainer>
              <MenuSelect
                className={`${lang == "ar" ? "rtl-flag" : "ltr-flag"} ${
                  profileMenu ? "dropdown-active" : "dropdown-inactive"
                }`}
              >
                {profiles.map((elm) => (
                  <Link style={{textDecoration:'none'}} to={elm.link}>
                    <ElementSelect>
                      <span>{elm.text}</span>
                    </ElementSelect>
                  </Link>
                ))}
              </MenuSelect>
            </Element>
          </SecondSection>
        </Nav2>
      </Nav>
    </div>
  );
}
