import React, { useEffect, useState } from "react";
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
  FlagContainer
} from "./styles";
import semibot from "../../assets/semibot.png";
import arabic from "../../assets/flags/arabic.png";
import english from "../../assets/flags/english.png";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { langs, navLinks } from "../../utils/constants";
import { Link } from "react-router-dom";
export function Navbar() {
  const [flagMenu, setFlagMenu] = useState(false);
  const [navHover, setNavHover] = useState(false)
  const { t } = useTranslation();
  function changeLanguage(lang: string) {
    if (lang == "ar") {
      i18n.changeLanguage("ar").then(() => {
        setFlagMenu(!flagMenu);
      });
    } else if (lang == "en") {
      i18n.changeLanguage("en").then(() => setFlagMenu(!flagMenu));
    }
  }
  const SelectMenu = () => (
    <div>
      <MenuSelect 
     style={flagMenu ? {opacity: 1, visibility: 'visible'} : {opacity: 0, visibility: 'hidden'}} className={document.dir == 'rtl' ? "rtl-flag" :'ltr-flag'}>
        {langs.map((elm) => (
          <ElementSelect onClick={() => changeLanguage(elm.code)}>
            <ImgSelect src={elm.img} />
            <span>{elm.label}</span>
          </ElementSelect>
        ))}
      </MenuSelect>
    </div>
  );

  const currentLangCode = i18n.language;
  const currentLang: any = langs.find((l) => l.code === currentLangCode);
  useEffect(() => {
    if (currentLangCode) {
      document.dir = currentLang.dir;
    }
  }, [currentLangCode, currentLangCode]);

  return (
    <div>
      <Nav>
        <FirstSection>
          <LinkHeader to="/">
            <ImgHeader onMouseLeave={() => setNavHover(false)} onMouseOver={() => setNavHover(true)} src={semibot} />
            <NavHover style={ navHover ? {opacity: 1, visibility: 'visible'} : {opacity: 0, visibility:'hidden'}}>
              <span>{t('home')}</span>
            </NavHover>
          </LinkHeader>
          <VerticalLine aria-orientation="vertical" />
          {navLinks.map((elm) => (
            <Element>
              <LinkElm to={`${elm.link}`}>{t(elm.label)}  </LinkElm>
            </Element>
          ))}
        </FirstSection>
        <SecondSection>
          <Element>
            <FlagContainer>
            <Flag
              src={i18n.language == "ar" ? arabic : english}
              onClick={() => setFlagMenu(!flagMenu)}
            />
            </FlagContainer>
            <SelectMenu/>
          </Element>
        </SecondSection>

      </Nav>
    </div>
  );
}
