"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const utils_1 = require("./utils");
const PORT = process.env.PORT;
const cli_color_1 = __importDefault(require("cli-color"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = yield (0, utils_1.createApp)();
            app.listen(PORT, () => console.log(`${cli_color_1.default.green('[EXPRESS]')} listening on [${cli_color_1.default.red(PORT)}] port`));
        }
        catch (err) {
            console.log(`${cli_color_1.default.red('[EXPRESS]')} Error`);
            console.log(err);
        }
    });
}
main();
