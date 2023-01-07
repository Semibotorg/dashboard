import mongoose from "mongoose";

export interface Idoc extends mongoose.Document {
  GuildId: string,
  TwitterHistory: string[],
  InstagramHistory: string[],
  TwitchHistory: string[],
  RedditHistory: string[],
  YoutubeHistory: string[]
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
  TwitterHistory: not_req_arr,
  InstagramHistory: not_req_arr,
  TwitchHistory: not_req_arr,
  RedditHistory: not_req_arr,
  YoutubeHistory: not_req_arr,
});

export default mongoose.model<Idoc>("alertsHistory", Schema);
