import styled from "styled-components";
import { Link } from "react-router-dom";
export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  z-index: 100;
  max-width: 1240px;
  position: relative;
  width: 100%;
  padding: 2rem 2rem;
  margin: auto;
`;

export const FirstSection = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: row;
  text-decoration: none;
  gap: 14px;
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
transition: color .2s var(--transition);
cursor: pointer;
&:hover{
    color: white;
}
`
export const TextHeader = styled.span`
  color: white;
  font-size: 25px;
  font-weight: 700;
  text-transform: uppercase;
`;
export const ImgHeader = styled.img`
  width: 40px;
  border-radius: 50px;
`;
export const Flag = styled.img`
  width: 42px;
  cursor: pointer;
`;

export const MenuSelect = styled.div`
position: absolute;
margin-left: -100px;
margin-top: 20px;
list-style: none;
display: flex;
justify-content: center;
flex-direction: column;
border-radius: 5px;
background-color: var(--second-theme-color);
padding: 0 .5rem;
line-height: 1px;
`

export const ElementSelect = styled.h4`
color: white;
font-weight: 600;
cursor: pointer;
width: 150px;
border-radius: 5px;
padding-left: 0.75rem!important;
line-height: 1rem;
padding-right: 0.75rem!important;
font-size: 15px;
padding: .7rem;
display: flex;
align-items: center;
flex-direction: row;
gap: 20px;
&:hover{
    background-color: #1e1d25;
}
&:first-child{
    margin-bottom: 0px;
}
`

export const ImgSelect = styled.img`
    width: 20px;
`