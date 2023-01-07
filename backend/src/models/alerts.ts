import mongoose from "mongoose";

export interface Idoc extends mongoose.Document {
  GuildId: string,
  twitter?: {
    enabled: boolean;
    username: string[];
    message: string;
    channelId: string;
    history: string[];
  };
  youtube?: {
    enabled: boolean;
    youtubeChannelName: string[];
    message: string;
    channelId: string;
    history: string[];
  };
  twitch?: {
    enabled: boolean;
    username: string[];
    message: string;
    channelId: string;
    history: string[];
  };
  instagram?: {
    enabled: boolean;
    username: string[];
    message: string;
    channelId: string;
    history: string[];
  };
  reddit?: {
    enabled: boolean;
    username: string[];
    message: string;
    channelId: string;
    history: string[];
  };
}

const req_string: object = {
  type: String,
  required: true,
};
const req_arr: object = {
  type: Array,
  required: true,
};
const not_req_arr: object = {
  type: Array,
  required: false,
};
const not_req_string: object = {
  type: String,
  required: false,
};
const req_boolean: object = {
  type: Boolean,
  required: true,
};
const not_req_object: object = {
    type: Object,
    required: false,
  };

const Schema: mongoose.Schema = new mongoose.Schema<Idoc>({
  GuildId: req_string,
  twitter: not_req_object,
  twitch: not_req_object,
  instagram: not_req_object,
  reddit: not_req_object,
  youtube: not_req_object,
});

export default mongoose.model<Idoc>("alerts", Schema);
