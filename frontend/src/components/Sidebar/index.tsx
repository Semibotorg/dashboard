import { useEffect, useState } from "react";
import { NavbarSidebar, PremiumPage, SettingsPage } from "..";
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
  serverControl2: boolean;
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
  const [sidebar, setSidebar] = useState<SidebarI | any>({
    serverControl: true,
    serverControl2: true,
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
  const setToggle = (state: "serverControl" | "serverControl2") => {
    if (state === "serverControl") {
      setSidebar({
        ...sidebar,
        serverControl: !sidebar.serverControl,
      });
    } else if (state === "serverControl2") {
      setSidebar({
        ...sidebar,
        serverControl2: !sidebar.serverControl2,
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
          link: "",
        },
        {
          text: t("settings"),
          icon: Cog6ToothIcon,
          link: "/settings",
        },
        {
          text: t("premium"),
          icon: ShoppingCartIcon,
          link: "/premium",
        },
      ],
    },
  ];

  const dashboardContents = [
    {
      link: "/premium",
      content: PremiumPage,
    },
    {
      link: "",
      content: DashboardPage,
    },
    {
      link : '/settings',
      content: SettingsPage
    }
  ];
  return (
    
      <div>
        <Content>
          <NavbarSidebar setSidebarToggle={setSidebarToggle} user={userRedux} />
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
                            <elm.icon width={22} />
                            {elm.text}
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
              style={
                i18next.language == "ar"
                  ? { right: "400px" }
                  : { left: "400px" }
              }
            >
              {dashboardContents.map((elm) => {
                return (
                  location.pathname == `/dashboard/${params.id}${elm.link}` && (
                    <elm.content />
                  )
                );
              })}
            </DashboardContent>
          )}
        </Content>
      </div>
    
  );
}
