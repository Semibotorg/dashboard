import React, { useEffect, useState } from "react";
import {
  ButtonsHome,
  Circle,
  Content,
  DashboardButton,
  FirstSection,
  IconContainer,
  ImgReview,
  InviteButton,
  Line,
  LineDiv,
  LoaderContainer,
  Review,
  ReviewText,
  SecondSection,
  Stats,
  StatsContainer,
  ThirdSection,
  VerticalLine,
} from "./styles";
import { useTranslation } from "react-i18next";
import {
  features,
  Stats as StatsI,
  getStats,
  getUser,
  Server,
} from "../../utils/";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addUser } from "../../store/user/user";
import axios from "axios";
import { APIUser } from "discord-api-types/v10";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Loading } from "@nextui-org/react"
import { Footer } from "./Footer";
export function Homepage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [user, setUser] = useState<APIUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsI>({
    serverCount: 0,
    usersCount: 0,
  });
  const userRedux = useSelector((state: RootState) => state.user);

  async function RefreshUser() {
    await getUser(localStorage.token).then((data) => {
      dispatch(addUser(data!));
    });
  }
  async function LoginDiscord() {
    window.open(
      `${Server.Url}/auth/login`,
      "_blank",
      `toolbar=no, location=no, directories=no,
      status=no, menubar=no, scrollbars=no, resizable=no,
      copyhistory=no, width=800, height=1200,
      top=${window.screen.height / 2 - 600 / 2}, left=${
        window.screen.width / 2 - 450 / 2
      }`
    );
    window.addEventListener("message", async (message: any) => {
      if (typeof message.data == "object") return;
      if (message.data.split(" ")[1] !== "login") return;
      localStorage.token = message.data.split(" ")[0];
      RefreshUser();
    });
  }
  useEffect(() => {
    if (!userRedux) {
      setLoading(true);
      getUser(localStorage.token)
        .then((data) => {
          dispatch(addUser(data!));
          console.log(userRedux);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    getStats().then((data) => {
      setStats(data);
    });
  }, []);


  return (
    <div>
      <Navbar />
      {loading ? (
        <LoaderContainer>
          {/* <Oval
            color="#00BFFF"
            secondaryColor="#72638b"
            height={30}
            width={30}
          /> */}
          <Loading/>
        </LoaderContainer>
      ) : (
        <div>
          {" "}
          <Content>
            <FirstSection>
              <h1>{t("home-t1")}</h1>
              <ButtonsHome>
                <InviteButton>
                  <i className="fa-brands fa-discord"></i>
                  {t("add-discord")}
                </InviteButton>
                {userRedux ? (
                  <Link to="/dashboard">
                    <DashboardButton>{t("dashboard")}</DashboardButton>
                  </Link>
                ) : (
                  <DashboardButton onClick={LoginDiscord}>
                    {t("login")}
                  </DashboardButton>
                )}
              </ButtonsHome>
            </FirstSection>
            <SecondSection>
              {features.map((elm, i) => (
                <Review>
                  <ReviewText>
                    <IconContainer>
                      <i className={elm.icon}></i>
                    </IconContainer>
                    <span>{t(elm.text)}</span>
                    <p>{t(elm.description)}</p>
                  </ReviewText>
                  <LineDiv>
                    <Circle />
                    <Line
                      style={i == features.length - 1 ? { height: "0px" } : {}}
                    />
                  </LineDiv>
                  <ImgReview src={elm.img} />
                </Review>
              ))}
            </SecondSection>
          </Content>
          <ThirdSection>
            <StatsContainer>
              <Stats>
                <p>{stats.serverCount}</p>
                <span>{t("servers")}</span>
              </Stats>
              <Stats>
                <VerticalLine />
              </Stats>
              <Stats>
                <p>{stats.usersCount}</p>
                <span>{t("users")}</span>
              </Stats>
            </StatsContainer>
          </ThirdSection>{" "}

          <Footer />
        </div>
        
      )}

    </div>
  );
}
