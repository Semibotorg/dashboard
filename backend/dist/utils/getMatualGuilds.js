"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatualGuilds = void 0;
function getMatualGuilds(userGuilds, botGuilds) {
    if (!userGuilds || !botGuilds)
        return;
    const validGuilds = userGuilds.filter((guild) => (guild.permissions & 0x08) === 0x08);
    const included = [];
    const excluded = validGuilds.filter((guild) => {
        const findGuild = botGuilds.find((g) => g.id === guild.id);
        if (!findGuild)
            return guild;
        included.push(findGuild);
    });
    return { excluded, included };
}
exports.getMatualGuilds = getMatualGuilds;
//# sourceMappingURL=getMatualGuilds.js.map