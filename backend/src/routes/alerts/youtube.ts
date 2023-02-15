import { Router } from "express";
import { google } from "googleapis";
import alertsSchema from "../../models/alerts";
import { client } from "../../bot";
import { PermissionFlagsBits } from "discord.js";
import { decodeJWT } from "../../utils";

const router = Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const youtube = google.youtube({
  version: "v3",
  auth: YOUTUBE_API_KEY!,
});

router.post("/add", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ msg: "token not found" });
  const userJWT = await decodeJWT(authorization);

  const youtube_channel_id: string | undefined = req.body.channel_id;
  const guild_id: string | undefined = req.body.guild_id;
  const discord_channel_id: string | undefined = req.body.discord_channel_id;
  const message: string | undefined = req.body.message;

  if (!youtube_channel_id || !guild_id || !message || !discord_channel_id)
    return res.status(400).send({ msg: "bad request" });
  const guild = await (
    await client.guilds.fetch()
  ).find((g) => g.id == guild_id);
  if (!guild) return res.status(404).send({ msg: "guild not found" });
  
  if (!(await (await guild.fetch()).channels.fetch(discord_channel_id)))
    return res.status(404).send({ msg: "discord channel not found" });

  const user = await (
    await guild.fetch()
  ).members.fetch({ user: { id: userJWT.user.id } as any });

  if (!user.permissions.has(PermissionFlagsBits.Administrator))
    return res.status(406).send({ msg: "Administrator permission required" });

  await youtube.channels.list(
    {
      part: ["snippet", "statistics", "contentDetails"],
      id: [youtube_channel_id],
    },
    async (err, res2) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ msg: "error occured in server" });
      }

      let res2Items = res2?.data.items!;

      const channelName = res2Items[0].snippet?.title;
      const channelImageUrl = res2Items[0].snippet?.thumbnails?.high?.url;
      const channelId: string = res2Items[0].id!;
      if (!channelId) return res.status(404).send({ msg: "Channel not found" });
      const dataArr = await alertsSchema.find({});
      dataArr.forEach(async (data) => {
        if (data.GuildId == guild_id) {
          data.youtube?.youtubeChannelName.forEach(async (ch) => {
            if (ch == channelId)
              return res.status(403).send({ msg: "The channel already added" });
            else {
              await alertsSchema.findOneAndUpdate(
                {
                  GuildId: guild_id,
                },
                {
                  ...data,
                  youtube: {
                    enabled: true,
                    youtubeChannelName: [...ch, channelId],
                    message: message,
                    channelId: discord_channel_id,
                    history: [],
                  },
                },
                {
                  upsert: true
                }
              );
              return res
                .status(200)
                .send({ msg: "the youtube channel has been added" });
            }
          });
        } else {
          await alertsSchema.findOneAndUpdate(
            {
              GuildId: guild_id,
            },
            {
              youtube: {
                enabled: true,
                youtubeChannelName: channelId,
                message: message,
                channelId: discord_channel_id,
                history: [],
              },
            },
            {
              upsert: true
            }
          );
          return res
            .status(200)
            .send({ msg: "the youtube channel has been added" });
        }
      });
    }
  );
});

router.get('/all', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ msg: "token not found" });
  const userJWT = await decodeJWT(authorization);
  const guild_id: string | undefined = req.body.guild_id;

  if (!guild_id)
    return res.status(400).send({ msg: "bad request" });
  const guild = await (
    await client.guilds.fetch()
  ).find((g) => g.id == guild_id);
  if (!guild) return res.status(404).send({ msg: "guild not found" });

  const user = await (
    await guild.fetch()
  ).members.fetch({ user: { id: userJWT.user.id } as any });

  if (!user.permissions.has(PermissionFlagsBits.Administrator))
    return res.status(406).send({ msg: "Administrator permission required" });

    const dataArr = await alertsSchema.find({});
    dataArr.forEach(data => {
      if(data.GuildId == guild_id){
        if(data?.youtube?.youtubeChannelName?.length == 0 || !data?.youtube) return res.status(200).send({})
        else {
          return res.status(200).send({...data?.youtube})
        }
      }else{
        return res.status(200).send({})
      }
    })
})

router.get('/enable', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ msg: "token not found" });
  const userJWT = await decodeJWT(authorization);
  const guild_id: string | undefined = req.body.guild_id;

  if (!guild_id)
    return res.status(400).send({ msg: "bad request" });
  const guild = await (
    await client.guilds.fetch()
  ).find((g) => g.id == guild_id);
  if (!guild) return res.status(404).send({ msg: "guild not found" });

  const user = await (
    await guild.fetch()
  ).members.fetch({ user: { id: userJWT.user.id } as any });

  if (!user.permissions.has(PermissionFlagsBits.Administrator))
    return res.status(406).send({ msg: "Administrator permission required" });

    const dataArr = await alertsSchema.find({});
    dataArr.forEach(async data => {
        await alertsSchema.findOneAndUpdate(
          {
            GuildId: guild_id,
          },
          {
            ...data,
            youtube:{
              ...data.youtube,
              enabled: true
            }
          },
          {
            upsert: true
          }
        );
    })
})

router.get('/disable', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ msg: "token not found" });
  const userJWT = await decodeJWT(authorization);
  const guild_id: string | undefined = req.body.guild_id;

  if (!guild_id)
    return res.status(400).send({ msg: "bad request" });
  const guild = await (
    await client.guilds.fetch()
  ).find((g) => g.id == guild_id);
  if (!guild) return res.status(404).send({ msg: "guild not found" });

  const user = await (
    await guild.fetch()
  ).members.fetch({ user: { id: userJWT.user.id } as any });

  if (!user.permissions.has(PermissionFlagsBits.Administrator))
    return res.status(406).send({ msg: "Administrator permission required" });

    const dataArr = await alertsSchema.find({});
    dataArr.forEach(async data => {
      if(data.GuildId == guild_id){
        await alertsSchema.findOneAndUpdate(
          {
            GuildId: guild_id,
          },
          {
            ...data,
            youtube:{
              ...data.youtube,
              enabled: false
            }
          },
          {
            upsert: true
          }
        );
      }else{
        return res.status(404).send({msg:"the guild id is not in database"})
      }
    })
})


export default router;
