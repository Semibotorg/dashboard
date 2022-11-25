"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISCORD_API = exports.Scopes = exports.Auth = void 0;
var Auth;
(function (Auth) {
    Auth["Url"] = "https://discord.com/api/oauth2/authorize?client_id=792358282923999252&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds%20guilds.join";
    Auth["RedirectUrl"] = "http://localhost:5000/api/auth/callback";
})(Auth = exports.Auth || (exports.Auth = {}));
exports.Scopes = ['identify', 'guilds', 'guilds.join'];
exports.DISCORD_API = 'https://discord.com/api/v10';
//# sourceMappingURL=constants.js.map