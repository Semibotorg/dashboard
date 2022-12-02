import { useEffect, useState } from "react";
import { NavbarSidebar } from "../";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addUser } from "../../store/user/user";
import { getGuild, getUser } from "../../utils";
import { useNavigate } from "react-router-dom";
import {
  Content,
  HeaderSidebar,
  Sidebar,
  SidebarContent,
  SidebarElement,
  SidebarMenu,
  SidebarMenuHeader,
  BarContainerSidebar,
  LogoHeaderSidebar,
} from "./styles";
import { useTranslation } from "react-i18next";
import logo from "../../assets/semibot.png";
import { HomeIcon, Cog6ToothIcon, ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useParams, useLocation } from "react-router-dom";
import i18next from "i18next";

interface SidebarI {
    serverControl: boolean,
    serverControl2: boolean
}

export function Dashboard() {
  const dispatch = useDispatch();
  const userRedux = useSelector((state: RootState) => state.user);
  const [sidebar, setSidebar] = useState<SidebarI | any>({
    serverControl: true,
    serverControl2: true
  })
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false)
  const location = useLocation()
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (!userRedux) {
      getUser(localStorage.token)
        .then((data) => {
          dispatch(addUser(data!));
        })
        .catch((err) => {
          navigate("/");
        });
    }
  }, []);
  const { t } = useTranslation();
  const setToggle = (state: "serverControl" | "serverControl2") => {
    if(state === 'serverControl'){
      setSidebar({
        ...sidebar,
        serverControl: !sidebar.serverControl
      })
    }else if(state === 'serverControl2'){
      setSidebar({
        ...sidebar,
        serverControl2: !sidebar.serverControl2
      })
    }
  }
  const elements = [
    {
      header: t('server-control'),
      state: sidebar,
      stateText: 'serverControl',
      elements: [
        {
          text: t('dashboard'),
          icon: HomeIcon,
          link: "/" || "",
        },
        {
          text: t('settings'),
          icon: Cog6ToothIcon,
          link: "/settings",
        },
        {
          text: t('premium'),
          icon: ShoppingCartIcon,
          link: "/premium",
        },
      ],
    },
  ];

  useEffect(() => {
    getGuild(localStorage.token, params.id!).then((data) => {
      console.log(data)
    })
  },[])

  return (
    <div>
      <Content>
        <NavbarSidebar setSidebarToggle={setSidebarToggle} user={userRedux} />
        <Sidebar className={`${!sidebarToggle && i18next.language == 'ar' ? "sidebar-active-rtl" : ""} ${!sidebarToggle && i18next.language == 'en' ? "sidebar-active" : ""}`}>
          <SidebarContent>
            <HeaderSidebar>
              <LogoHeaderSidebar to ='/'>
              <img src={logo} />
              <span>{t("semibot")}</span>
              </LogoHeaderSidebar>
              <BarContainerSidebar onClick={() => setSidebarToggle(false)}>
              {
                i18next.language == 'ar' ? <i className="fa-solid fa-arrow-right"></i> : <i className="fa-solid fa-arrow-left"></i>
              }
              </BarContainerSidebar>
            </HeaderSidebar>
            
            <SidebarMenu>
              {elements.map(({header, elements, state, stateText}) => (
                <div style={{marginBottom:'20px'}}>
                  <SidebarMenuHeader onClick={() => {
                    setToggle(stateText as any)
                  }}>
                    <span>{header}</span>
                    <i style={state[stateText] ? {transform: 'rotate(180deg)', transition:'all .3s var(--transition)'} : {transform: 'rotate(360deg)', transition:'all .3s var(--transition)'}} className="fa-solid fa-angle-down"></i>
                    {/* <ChevronDownIcon width={18} style={state.serverControl ? {transform: 'rotate(180deg)', transition:'all .3s var(--transition)'} : {transform: 'rotate(360deg)', transition:'all .3s var(--transition)'}} /> */}
                  </SidebarMenuHeader>
                 {
                  state[stateText] ? ( <div>
                  { elements.map((elm) => (
                    
                    <SidebarElement  to={`/dashboard/${params.id}${elm.link}`} style={location.pathname == `/dashboard/${params.id}${elm.link == "/" || "" ? "" : elm.link}` ? {color:"white", background: 'var(--sidebar-btn-hover)'} : {}}>
                      <elm.icon width={22} />
                      {elm.text}
                    </SidebarElement>
                  ))}
                  </div>) : null
                 }
                </div>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </Content>
    </div>
  );
}
