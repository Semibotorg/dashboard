import {
  Routes,
  RESTGetAPICurrentUserResult,
  RESTGetAPICurrentUserGuildsResult,
  RESTGetAPIGuildResult
  
} from "discord-api-types/v10";
import fetch from "node-fetch";
import { DISCORD_API_URL, DISCORD_API_VERSION } from "../utils";
import cls from "cli-color";
export async function getUser(token: {
  access_token: string;
  token_type: string;
}): Promise<RESTGetAPICurrentUserResult> {
  const fetchuserResponse: any = await fetch(
    `${DISCORD_API_URL}/${DISCORD_API_VERSION}${Routes.user()}`,
    {
      method: "GET",
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    }
  ).catch((err) => {
    console.log(`${cls.red("[DISCORD API]")} Error`);
    console.log(err);
  });
  const userResponse: RESTGetAPICurrentUserResult =
    await fetchuserResponse.json();
  return userResponse;
}

export async function getUserGuilds(token: {
  access_token: string;
  token_type: string;
}): Promise<RESTGetAPICurrentUserGuildsResult> {
  const fetchGuildsResponse = await fetch(
    `${DISCORD_API_URL}/${DISCORD_API_VERSION}${Routes.userGuilds()}?with_counts=true`,
    {
      method: "GET",
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    }
  );
  const guildResponse: RESTGetAPICurrentUserGuildsResult = await fetchGuildsResponse.json();
  return guildResponse;
}

export async function getBotGuilds(token:{BotToken: string}): Promise<RESTGetAPICurrentUserGuildsResult> {
  const fetchGuildsResponse = await fetch(
    `${DISCORD_API_URL}/${DISCORD_API_VERSION}${Routes.userGuilds()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bot ${token.BotToken}`,
      },
    }
  );
  const guildResponse: RESTGetAPICurrentUserGuildsResult = await fetchGuildsResponse.json();
  return guildResponse;
}

export async function getGuild(token: {
  access_token: string;
  token_type: string;
  guildId: string
}): Promise<RESTGetAPIGuildResult> {
  const fetchGuildsResponse = await fetch(
    `${DISCORD_API_URL}/${DISCORD_API_VERSION}${Routes.guild(token.guildId)}?with_counts=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    }
  );
  const guildResponse: RESTGetAPIGuildResult = await fetchGuildsResponse.json();
  return guildResponse;
}