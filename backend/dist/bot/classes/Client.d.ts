import Discord, { Collection } from "discord.js";
export default class Client extends Discord.Client {
    invites: Collection<string, Collection<string, number | null>>;
    constructor(options: Discord.ClientOptions);
}
