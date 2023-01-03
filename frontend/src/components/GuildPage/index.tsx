import React, { useEffect, useState } from "react";
import { Server, getUser, Guilds, getGuilds } from "../../utils";
import { useTranslation } from "react-i18next";
import { APIUser } from "discord-api-types/v10";
import { useSelector, useDispatch } from "react-redux";
import { addGuild } from "../../store/user/user";

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
import { RootState } from "../../store/store";
import { Navbar } from "../Navbar";
export function GuildPage() {
  const { t } = useTranslation();
  // const [guilds, setGuilds] = useState<Guilds | null>(null);
  const guilds = useSelector((state: RootState) => state.guilds);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!guilds) {
      setLoading(true);
      getGuilds(localStorage.token)
        .then((data) => {
          dispatch(addGuild(data));
          setLoading(false);
        })
        .catch(async(err) => {
          console.log(err);
          await localStorage.removeItem('token')
          navigate('/')
          window.location.reload()
        });
    } else {
      setLoading(false);
    }
  }, []);

  const skeltons = [
    {
      a: "1",
    },
    {
      a: "1",
    },
    {
      a: "1",
    },
    {
      a: "1",
    },
    {
      a: "1",
    },
    {
      a: "1",
    },
  ];
  return (
    <div>
      <Navbar />
      <Content>
        <TextInfo>{t("select-server")}</TextInfo>
        <GuildsContainer>
          {loading &&
            skeltons.map(() => (
              <Guild>
                <FirstSectionGuild>
                  <ImgLoading>
                    <span></span>
                  </ImgLoading>

                  <SpanSkeltonGuild>
                    <span></span>
                  </SpanSkeltonGuild>
                </FirstSectionGuild>
                <BtnLoading>
                  <span>{t("add-dashboard")}</span>
                </BtnLoading>
              </Guild>
            ))}
          {!loading &&
            guilds?.included.map((elm) => (
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
          {!loading &&
            guilds?.excluded.map((elm) => (
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

                <InviteGuildsButton>{t("add-discord")}</InviteGuildsButton>
              </Guild>
            ))}
        </GuildsContainer>
      </Content>
    </div>
  );
}
