import React, { useEffect, useState } from "react";
import { Server, getUser, Guilds, getGuilds } from "../../utils";
import { useTranslation } from "react-i18next";
import { APIUser } from "discord-api-types/v10";

import {
  BtnLoading,
  CircleImg,
  Content,
  DashboardGuildsButton,
  FirstSectionGuild,
  Guild,
  GuildsContainer,
  ImgGuild,
  ImgLoading,
  InviteGuildsButton,
  SpanSkeltonGuild,
  TextInfo,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";

export function GuildPage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<APIUser | null>(null);
  const [guilds, setGuilds] = useState<Guilds | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    getUser(localStorage.token)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
    getGuilds(localStorage.token)
      .then((data) => {
        setGuilds(data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
      
  }, []);

  const skeltons = [
    {
      a: '1'
    },
    {
      a: '1'
    },
    {
      a: '1'
    },
    {
      a: '1'
    },
    {
      a: '1'
    },
    {
      a: '1'
    },

  ]
  return (
    <Content>
      <TextInfo>{t('select-server')}</TextInfo>
      <GuildsContainer>
        {
          loading && skeltons.map(() => (
            <Guild>
            <FirstSectionGuild>
              <ImgLoading>
              <span></span>
              </ImgLoading>
              
              <SpanSkeltonGuild><span></span></SpanSkeltonGuild>
            </FirstSectionGuild>
            <BtnLoading>
              <span></span>
            </BtnLoading>
          </Guild>
          ))
        }
        {!loading && guilds?.included.map((elm) => (
          <Guild>
            <FirstSectionGuild>
              {elm.icon ? (
                <ImgGuild
                  src={`https://cdn.discordapp.com/icons/${elm.id}/${elm.icon}.jpg`}
                />
              ) : (
                <CircleImg>
                  <span>{elm.name.substring(0, 2)}</span>
                </CircleImg>
              )}
              <span>{elm.name}</span>
            </FirstSectionGuild>

            <DashboardGuildsButton to={`/dashboard/${elm.id}`}>
              {t("dashboard")}
            </DashboardGuildsButton>
          </Guild>
        ))}
        {!loading && guilds?.excluded.map((elm) => (
          <Guild>
            <FirstSectionGuild>
              {elm.icon ? (
                <ImgGuild
                  src={`https://cdn.discordapp.com/icons/${elm.id}/${elm.icon}.jpg`}
                />
              ) : (
                <CircleImg>
                  <span>{elm.name.substring(0, 2)}</span>
                </CircleImg>
              )}
              <span>{elm.name}</span>
            </FirstSectionGuild>

            <InviteGuildsButton>
              {t("add-discord")}
            </InviteGuildsButton>
          </Guild>
        ))}
      </GuildsContainer>
    </Content>
  );
}
