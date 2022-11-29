import React, { useEffect, useState } from "react";
import { Server, getUser, Guilds, getGuilds } from "../../utils";
import { useTranslation } from "react-i18next";
import { APIUser } from "discord-api-types/v10";
import {
  CircleImg,
  Content,
  DashboardGuildsButton,
  FirstSectionGuild,
  Guild,
  GuildsContainer,
  ImgGuild,
  InviteGuildsButton,
  TextInfo,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";

export function GuildPage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<APIUser | null>(null);
  const [guilds, setGuilds] = useState<Guilds | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, []);
  return (
    <Content>
      <TextInfo>Select a server</TextInfo>
      {/* data.map(elm => (
                         <Guild>
                             <FirstSectionGuild>
                             {elm.img ? <ImgGuild src={elm.img} /> : (<CircleImg><span>{elm.name.substring(0, 2)}</span></CircleImg>)}
                                 <span>{elm.name}</span>
                             </FirstSectionGuild>
                            
                             <DashboardGuildsButton to={`/dashboard/${elm.guildId}`}>{t('dashboard')}</DashboardGuildsButton>
                            
                         </Guild>
                     )) */}
      <GuildsContainer>
        {guilds?.included.map((elm) => (
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
        {guilds?.excluded.map((elm) => (
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
        <div style={{height: '10vh'}} />
      </GuildsContainer>
    </Content>
  );
}
