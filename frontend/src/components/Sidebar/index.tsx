import { useEffect, useState } from "react";
import { NavbarSidebar, PremiumPage, SettingsPage, TwitchPage } from "..";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  addDashboard,
  addLoadingDashboard,
  addUser,
} from "../../store/user/user";
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
  DashboardContent,
  SidebarContainer,
  PremiumContainer,
  TitlePage
} from "./styles";
import { useTranslation } from "react-i18next";
import logo from "../../assets/semibot.png";
import {
  HomeIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
  
} from "@heroicons/react/24/outline";
import { useParams, useLocation } from "react-router-dom";
import i18next from "i18next";
import { DashboardPage } from "../";
import { dashboardPageSetup } from "../../utils/functions";


interface SidebarI {
  serverControl: boolean;
  alerts: boolean;
}

export function SidebarPage(): JSX.Element{
  const dispatch = useDispatch();
  const loadingRedux = useSelector(
    (state: RootState) => state.loading_dashboard
  );
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const userRedux = useSelector((state: RootState) => state.user);
  const guildRedux = useSelector((state: RootState) => state.dashboard.guilds.filter(el => el.id == params.id))[0];
  const premiumRedux = useSelector((state: RootState) => state.premium.guilds.filter((el) => el.GuildId == params.id)[0]);
  const [sidebar, setSidebar] = useState<SidebarI | any>({
    serverControl: true,
    alerts: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);
  useEffect(() => {
    if (location.pathname.slice(-1) === "/") {
      navigate(location.pathname.substring(0, location.pathname.length - 1));
    }
  });
  const reduxSelector = useSelector((state: RootState) => state);
  useEffect(() => {
    setLoading(true)
    dashboardPageSetup(reduxSelector, dispatch, params, navigate, location as any)
    setLoading(false)
  },[])

  const { t } = useTranslation();
  const setToggle = (state: keyof SidebarI) => {
    if (state === "serverControl") {
      setSidebar({
        ...sidebar,
        serverControl: !sidebar.serverControl,
      });
    } else if (state === "alerts") {
      setSidebar({
        ...sidebar,
        alerts: !sidebar.alerts,
      });
    }
  };
  const elements = [
    {
      header: t("server-control"),
      state: sidebar,
      stateText: "serverControl",
      elements: [
        {
          text: t("dashboard"),
          icon: HomeIcon,
          brand: '',
          link: "",
          premium: false
        },
        {
          text: t("settings"),
          icon: Cog6ToothIcon,
          brand: '',
          link: "/settings",
          premium: false
        },
        {
          text: t("premium"),
          icon: ShoppingCartIcon,
          brand: '',
          link: "/premium",
          premium: false
          
        },
      ],
    },
    {
      header: t("auto-alerts"),
      state: sidebar,
      stateText: "alerts",
      elements: [
        {
          text: t("twitch"),
          icon: null,
          brand: 'twitch',
          link: "/twitch",
          premium: true
        },
        {
          text: t("twitter"),
          icon: null,
          brand: 'twitter',
          link: "/twitter",
          premium: true
        },
        {
          text: t("reddit"),
          icon: null,
          brand: 'reddit',
          link: "/reddit",
          premium: true
        },
        {
          text: t("youtube"),
          icon: null,
          brand: 'youtube',
          link: "/youtube",
          premium: true
        },
        
        
      ],
    },
  ];

  const dashboardContents = [
    {
      link: "/premium",
      content: PremiumPage,
      title: t('premium-title')
    },
    {
      link: "",
      content: DashboardPage,
      title: t('dashboard')
    },
    {
      link : '/settings',
      content: SettingsPage,
      title: t('settings')
    },
    {
      link : '/twitch',
      content:  premiumRedux ? premiumRedux.active || premiumRedux.lifeTime ? TwitchPage : PremiumPage : PremiumPage,
      title: t('twitch-autoalert')
    },
    {
      link : '/twitter',
      content:  premiumRedux ? premiumRedux.active || premiumRedux.lifeTime ? TwitchPage : PremiumPage : PremiumPage,
      title: t('twitter-autoalert')
    },
    {
      link : '/reddit',
      content:  premiumRedux ? premiumRedux.active || premiumRedux.lifeTime ? TwitchPage : PremiumPage : PremiumPage,
      title: t('reddit-autoalert')
    },
    {
      link : '/youtube',
      content:  premiumRedux ? premiumRedux.active || premiumRedux.lifeTime ? TwitchPage : PremiumPage : PremiumPage,
      title: t('youtube-autoalert')
    },
  ];
  return (
    
      <div>
                          <NavbarSidebar setSidebarToggle={setSidebarToggle} user={userRedux} />
        <Content>
          <SidebarContainer>
            
          <Sidebar
            className={`${
              !sidebarToggle && i18next.language == "ar"
                ? "sidebar-active-rtl"
                : ""
            } ${
              !sidebarToggle && i18next.language == "en" ? "sidebar-active" : ""
            }`}
          >
            <SidebarContent>
              <HeaderSidebar>
                <LogoHeaderSidebar to="/">
                  <img src={logo} />
                  <span>{t("semibot")}</span>
                </LogoHeaderSidebar>
                <BarContainerSidebar onClick={() => setSidebarToggle(false)}>
                  {i18next.language == "ar" ? (
                    <i className="fa-solid fa-arrow-right"></i>
                  ) : (
                    <i className="fa-solid fa-arrow-left"></i>
                  )}
                </BarContainerSidebar>
              </HeaderSidebar>

              <SidebarMenu>
                {elements.map(({ header, elements, state, stateText }) => (
                  <div style={{ marginBottom: "20px" }}>
                    <SidebarMenuHeader
                      onClick={() => {
                        setToggle(stateText as any);
                      }}
                    >
                      <span>{header}</span>
                      <i
                        style={
                          state[stateText]
                            ? {
                                transform: "rotate(180deg)",
                                transition: "all .3s var(--transition)",
                              }
                            : {
                                transform: "rotate(360deg)",
                                transition: "all .3s var(--transition)",
                              }
                        }
                        className="fa-solid fa-angle-down"
                      ></i>
                      {/* <ChevronDownIcon width={18} style={state.serverControl ? {transform: 'rotate(180deg)', transition:'all .3s var(--transition)'} : {transform: 'rotate(360deg)', transition:'all .3s var(--transition)'}} /> */}
                    </SidebarMenuHeader>
                    {state[stateText] ? (
                      <div>
                        {elements.map((elm) => (
                          <SidebarElement
                            to={`/dashboard/${params.id}${elm.link}`}
                            onClick={() => setSidebarToggle(false)}
                            style={
                              location.pathname ==
                              `/dashboard/${params.id}${
                                elm.link == "/" || "" ? "" : elm.link
                              }`
                                ? {
                                    color: "white",
                                    background: "var(--sidebar-btn-hover)",
                                  }
                                : {}
                            }
                          >
                            {
                              elm.brand.length > 0 ? <i className={`fa-brands fa-${elm.brand}`}></i> : elm.icon != null && <elm.icon width={22} />
                            }
                            
                            {
                              elm.premium ? (<PremiumContainer>
                                <span>{elm.text}</span>
                                <i className="fa-sharp fa-solid fa-crown"></i>
                                </PremiumContainer>) : (elm.text)
                            }
                          </SidebarElement>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          
          {loading ? null : (
            <DashboardContent
            >
              {dashboardContents.map((elm) => {
                return (
                  location.pathname == `/dashboard/${params.id}${elm.link}` && (
                    <>
                            <TitlePage>{elm.title}</TitlePage>
        <div className="vertical-line" />
                    <elm.content />
                    </>
                  )
                );
              })}
            </DashboardContent>
          )}
          </SidebarContainer>
        </Content>
      </div>
    
  );
}
