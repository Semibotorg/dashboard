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
exports.connectMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cli_color_1 = __importDefault(require("cli-color"));
function connectMongoose(url) {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(url).then(() => {
            console.log(`${cli_color_1.default.green('[MONGOOSE]')} Connected`);
        }).catch(err => {
            console.log(`${cli_color_1.default.red('[MONGOOSE]')} Error`);
            console.log(err);
        });
    });
}
exports.connectMongoose = connectMongoose;
//# sourceMappingURL=connectMongoose.js.map