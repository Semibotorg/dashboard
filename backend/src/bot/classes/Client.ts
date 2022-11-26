import Discord, { Collection, Invite, GuildInviteManager } from "discord.js";

export default class Client extends Discord.Client{
    invites: Collection<string, Collection<string, number | null>> = new Collection();
    
    constructor(options: Discord.ClientOptions){
        super(options);
    }
}