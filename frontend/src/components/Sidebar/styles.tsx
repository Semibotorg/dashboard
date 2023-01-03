import i18next from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
export const Sidebar = styled.div`

position: relative;
height: 100%;
min-height: 100vh;
min-width: 305px;
width: 305px;
z-index: 100;
background: var(--sidebar-bg-color);
border-right: 1px solid var(--btn-color-hover);
@media screen and (max-width: 1024px) {
    width: 100%;
    position: fixed;
}
transition: all .2s var(--transition);
`


export const Content = styled.div`
  overflow: hidden;
  height: 100vh;
`
export const SidebarContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 54px;

`
export const SidebarContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 32px 32px;
    grid-gap: 24px;
`

export const HeaderSidebar = styled.div`
    display: flex;
    text-decoration: none;
    align-items: center;
    gap: 10px;
    flex-direction: row;
    margin-bottom: 10px;
    justify-content: space-between;
    width: 100%;
    span{
        color: white;
        text-transform: uppercase;
        font-size: 25px;
        font-weight: 700;
    }
    img{
        border-radius: 50px;
        width: 40px;
    }
`

export const LogoHeaderSidebar = styled(Link)`
text-decoration: none;
display: flex;
align-items: center;
gap: 10px;
`

export const BarContainerSidebar = styled.div`
display: none;
    cursor: pointer;
  i {
    color: white;
    font-size: 15px;
  }
  background-color: var(--nav-btn-color);
  padding: 10px;
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
`

export const SidebarMenu = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    user-select: none;
`

export const SidebarElement = styled(Link)`
    text-decoration: none;
    color: #7d8491;
    margin-bottom: 5px;
    display: flex;
    gap: 24px;
    font-weight: 500;
    align-items: center;
    user-select: none;
    font-size: 14px;
    padding: 8px 12px;
    transition: all 75ms var(--transition);
    border-radius: 6px;
    height: 27px;
    &:hover{
        color: white;
        background: var(--sidebar-btn-hover);
    }
`

export const SidebarMenuHeader = styled.div`
margin-bottom: 19px;
display: flex;
color: white;
user-select: none;
align-items: center;
justify-content: space-between;
max-width: 90%;
cursor: pointer;
transition: all .2s var(--transition);
flex-direction: row;

    span{
        color: white;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
    }
@media screen and (max-width: 1024px) {
    
}

`

export const DashboardContent = styled.div`
overflow: scroll;
padding-top: 152px;
flex: 1 0 auto;

    @media screen and (max-width: 1024px) {
        flex: 1 0 0;
        padding: 0 25px;
        
}
`