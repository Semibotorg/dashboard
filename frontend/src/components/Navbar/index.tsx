import React, { useState } from "react";
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
} from "./styles";
import semibot from "../../assets/semibot.png";
import arabic from "../../assets/flags/arabic.png";
import { SelectMenu } from './SelectMenu'
export function Navbar() {
    const [flagMenu, setFlagMenu] = useState(false)
  return (
    <div>
      <Nav>
        <FirstSection to={"/"}>
          <ImgHeader src={semibot} />
          <TextHeader>semibot</TextHeader>
        </FirstSection>
        <SecondSection>
          <Element>
            <LinkElm to="/commands">Commands</LinkElm>
          </Element>
          <Element>
            <LinkElm to="/support">Support</LinkElm>
          </Element>
          <Element>
            <Flag src={arabic} onClick={() => setFlagMenu(!flagMenu)}/>
            <SelectMenu hide={flagMenu}/>
          </Element>
        </SecondSection>
      </Nav>
    </div>
  );
}
