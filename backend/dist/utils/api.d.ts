import { RESTGetAPICurrentUserResult } from "discord-api-types/v10";
export declare function getUser(token: {
    access_token: string;
    token_type: string;
}): Promise<RESTGetAPICurrentUserResult>;
