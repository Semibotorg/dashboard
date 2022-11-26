import React from "react";
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
  Review,
  ReviewText,
  SecondSection,
  Stats,
  StatsContainer,
  ThirdSection,
  VerticalLine,
} from "./styles";
import { useTranslation } from "react-i18next";
import { features, LoginDiscord } from "../../utils/";
import axios from 'axios'
export function Homepage() {
  const { t } = useTranslation();
  
  return (
    <div>
      <Content>
        <FirstSection>
          <h1>{t("home-t1")}</h1>
          <ButtonsHome>
            <InviteButton>
              <i className="fa-brands fa-discord"></i>
              {t("add-discord")}
            </InviteButton>
            <DashboardButton onClick={LoginDiscord}>{t("login")}</DashboardButton>
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
            <p>1</p>
            <span>{t('servers')}</span>
          </Stats>
          <Stats>
            <VerticalLine />
          </Stats>
          <Stats>
            <p>1</p>
            <span>{t('users')}</span>
          </Stats>
        </StatsContainer>
      </ThirdSection>
    </div>
  );
}
