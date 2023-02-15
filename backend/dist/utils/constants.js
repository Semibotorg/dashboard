"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpired = exports.DISCORD_API_URL = exports.DISCORD_API_VERSION = exports.Scopes = exports.Auth = exports.BACKEND_API_URL = void 0;
exports.BACKEND_API_URL = 'http://localhost:5000';
exports.Auth = {
    Url: "https://discord.com/api/oauth2/authorize?client_id=863406875659075614&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds%20guilds.join",
    RedirectUrl: `${exports.BACKEND_API_URL}/api/auth/callback`,
};
exports.Scopes = ['identify', 'guilds', 'guilds.join'];
exports.DISCORD_API_VERSION = 'v10';
exports.DISCORD_API_URL = 'https://discord.com/api';
function isExpired(date) {
    const currentDate = new Date();
    return currentDate >= date.endDate;
}
exports.isExpired = isExpired;
//# sourceMappingURL=constants.js.map