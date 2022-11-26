import Client from "../classes/Client";
import { Collection } from "discord.js";
import cls from "cli-color";
import { promisify } from "util";
const wait = promisify(setTimeout);
module.exports = {
  name: "ready",
  async execute(client: Client) {
    (await client.guilds.fetch()).forEach(async (guild) => {
      const firstInvites = await (await guild.fetch()).invites;
      client.invites.set(
        guild.id,
        new Collection(
          (await firstInvites.fetch()).map((invite) => [
            invite.code,
            invite.uses,
          ])
        )
      );
    });
    console.log(`${cls.green(`[DISCORD BOT]`)} Ready`);
  },
};
