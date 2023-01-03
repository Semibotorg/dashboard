import styled from "styled-components";
import { Link } from "react-router-dom";
export const Nav = styled.nav`
  width: 100%;
  background-color: var(--nav-bg);
  position: fixed;
  z-index: 1;
`;

export const Nav2 = styled.div`
      display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  z-index: 100;
  position: relative;
  padding: 1rem 2rem;
  margin: auto;
`

export const FirstSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  text-decoration: none;
  gap: 14px;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const VerticalLine = styled.hr`
  opacity: 0.6;
  height: 34px;
  border-width: 0px 0px 0px 2px;
  border-image: initial;
  border-color: #282e4e;
  margin: 0 12px;
  border-style: solid;
`;
export const SecondSection = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: row;
  text-decoration: none;
  list-style: none;
  gap: 20px;
`;
export const Element = styled.li``;
export const LinkElm = styled(Link)`
  text-decoration: none;
  color: #8f7d7d;
  font-weight: 600;
  font-size: 16px;
  transition: color 0.2s var(--transition);
  cursor: pointer;
  &:hover {
    color: white;
  }
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
`;
export const TextHeader = styled.span`
  color: white;
  font-size: 25px;
  font-weight: 700;
  text-transform: uppercase;
`;
export const ImgHeader = styled.img`
  width: 40px;
  border-radius: 50px;
  transition: all 112ms var(--transition);
  &:hover {
    transform: scale(1.1);
  }
`;
export const Flag = styled.img`
  width: 32px;
  cursor: pointer;
`;
export const FlagContainer = styled.div`
  background-color: var(--nav-btn-color);
  padding: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  z-index: 1000;
  transition: all 75ms var(--transition);
  &:hover {
    background-color: var(--nav-btn-color-hover);
  }
`;

export const MenuSelect = styled.div`
  position: absolute;
  margin-top: 20px;
  list-style: none;
  display: flex;
   z-index: 1000;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  background-color: var(--second-theme-color);
  padding: 0.7rem;
  line-height: 1px;
`;

export const ElementSelect = styled.div`
  color: white;
  font-weight: 600;
  cursor: pointer;
  width: 150px;
  border-radius: 5px;
  line-height: 1rem;
  font-size: 16px;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  transition: background-color 60ms var(--transition);
  &:hover {
    background-color: var(--hover-second-color);
  }
  &:first-child {
    margin-bottom: 0px;
  }
`;

export const ImgSelect = styled.img`
  width: 22px;
`;

export const NavHover = styled.div`
  position: absolute;
  background-color: var(--second-theme-color);
  padding: 0.6rem 1rem;
  z-index: 100;
  border: solid 2px var(--hover-second-color);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;

  transition: all 0.2s var(--transition);
  span {
    color: white;
    font-size: 13px;
    font-weight: 600;
  }
`;

export const LinkHeader = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const BarContainer = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: inherit;
  }
`;

export const BarElementContainer = styled.div`
  cursor: pointer;
  i {
    color: white;
    font-size: 20px;
  }
  background-color: var(--nav-btn-color);
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  transition: all 75ms var(--transition);

  display: none;
  @media screen and (max-width: 1024px) {
    display: flex;
  }
  &:hover {
    background-color: var(--nav-btn-color-hover);
  }
`;

export const ProfileContainer = styled.div`
user-select: none;
  img {
    user-select: none;
    width: 35px;
    border-radius: 50px;
  }
  border-radius: 50px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--nav-btn-color);
  transition: all 75ms var(--transition);
  cursor: pointer;
  &:hover {
    background-color: var(--nav-btn-color-hover);
  }
`;
