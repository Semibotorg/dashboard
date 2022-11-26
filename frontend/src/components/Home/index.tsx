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
import { features, LoginDiscord, getUser } from "../../utils/";

import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { RESTGetAPICurrentUserResult } from 'discord-api-types/v10'
import { Oval } from 'react-loader-spinner'
export function Homepage() {
  const { t } = useTranslation();
  const {data, status}: UseQueryResult<RESTGetAPICurrentUserResult, Error> = useQuery<RESTGetAPICurrentUserResult, Error>('user', getUser) 
  if(status == 'loading'){
    return (
      <LoaderContainer>
        <Oval color="#00BFFF" secondaryColor="#72638b" height={30} width={30} />
      </LoaderContainer>
    )
  } else if(status == 'error'){
    localStorage.removeItem("token")
  }
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
            {
              data ? (<DashboardButton>{t("dashboard")}</DashboardButton>) : (<DashboardButton onClick={LoginDiscord}>{t("login")}</DashboardButton>)
            }
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
