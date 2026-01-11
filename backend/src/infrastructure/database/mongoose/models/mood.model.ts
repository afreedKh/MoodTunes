import {Schema , model,Document} from "mongoose";

export interface IMoodSchema extends Document {
  name: string;
  songs: { title: string; artist: string }[];
}


const SongSchema:Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true }
});

const MoodSchema:Schema = new Schema<IMoodSchema>({
  name: { type: String, required: true, unique: true },
  songs:  { type: [SongSchema], default: [] }
});

export const MoodModel = model<IMoodSchema>("Mood", MoodSchema);
