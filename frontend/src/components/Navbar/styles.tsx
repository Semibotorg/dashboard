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
`
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
  transition: all 112ms var(--transition);
  &:hover{
    transform: scale(1.1);
  }
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
padding: .7rem;
line-height: 1px;
animation-name: hover;
animation-duration: .2s;
@keyframes hover {
  from {
    margin-top: 1px;
  }
  to{
    margin-top: 20px;
  }
}
`

export const ElementSelect = styled.div`
color: white;
font-weight: 600;
cursor: pointer;
width: 150px;
border-radius: 5px;
line-height: 1rem;
font-size: 16px;
padding: .8rem;
display: flex;
align-items: center;
flex-direction: row;
gap: 20px;
transition: background-color 60ms var(--transition);
&:hover{
    background-color: var(--hover-second-color);
}
&:first-child{
    margin-bottom: 0px;
}
`

export const ImgSelect = styled.img`
    width: 22px;
`