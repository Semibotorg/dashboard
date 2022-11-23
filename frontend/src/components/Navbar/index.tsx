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
  ElementSelect, MenuSelect,ImgSelect,
  VerticalLine
} from "./styles";
import semibot from "../../assets/semibot.png";
import arabic from "../../assets/flags/arabic.png";
import english from '../../assets/flags/english.png'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next'
import { langs } from '../../utils/constants'
import { Link } from "react-router-dom";
export function Navbar() {
    const [flagMenu, setFlagMenu] = useState(false)
    const {t} = useTranslation()
    function changeLanguage(lang: string){
      if(lang == 'ar'){
          i18n.changeLanguage('ar').then(() => {
            setFlagMenu(!flagMenu)
          })
          
      }else if(lang == 'en'){
          i18n.changeLanguage('en').then(() => setFlagMenu(!flagMenu))
      }
  }
  const SelectMenu = () => (
    <div>
    <MenuSelect>
      {langs.map((elm) => (
        <ElementSelect onClick={() => changeLanguage(elm.code)}>
          <ImgSelect src={elm.img} />
          <span>{elm.label}</span>
        </ElementSelect>
      ))}
    </MenuSelect>
  </div>
  )

  const currentLangCode = i18n.language
  const currentLang: any = langs.find((l) => l.code === currentLangCode);
  useEffect(() => {
    if (currentLangCode) {
      document.dir = currentLang.dir;
    }
  }, [currentLangCode,currentLangCode]);

  return (
    <div>
      <Nav>
        <FirstSection>
          <Link to="/">
          <ImgHeader src={semibot} />
          </Link>
          <VerticalLine aria-orientation="vertical"/>
          <Element>
            <LinkElm to="/commands">{t('commands')}</LinkElm>
          </Element>
          <Element>
            <LinkElm to="/support">{t('support')}</LinkElm>
          </Element>
        </FirstSection>
        <SecondSection>
        <Element>
            <Flag src={i18n.language == 'ar' ? arabic : english} onClick={() => setFlagMenu(!flagMenu)}/>
            {flagMenu == true && <SelectMenu/>}
          </Element>
        </SecondSection>
      </Nav>
    </div>
  );
}
