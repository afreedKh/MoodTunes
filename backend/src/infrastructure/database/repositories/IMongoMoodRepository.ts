import { IMoodRepository } from "../../../domain/repositories/IMoodRepository";
import { ISong, Mood } from "../../../domain/entities/Mood";
import { MoodModel } from "../../database/mongoose/models/mood.model";

export class IMongoMoodRepository implements IMoodRepository {
  private toDomain(moodDoc: any): Mood {
    return new Mood(
      moodDoc._id,
      moodDoc.name,
      moodDoc.songs.map((song: any) => ({
        title: song.title,
        artist: song.artist,
      }))
    );
  }

  async create(mood: Mood): Promise<Mood> {
    const moodDoc = new MoodModel({
      name: mood.getName(),
      songs: mood.getSongs(),
    });

    const savedMood = await moodDoc.save();
    return this.toDomain(savedMood);
  }

  async findAll(): Promise<Mood[]> {
    const moods =  await MoodModel.find();
    return moods.map(this.toDomain);
  }

  async findById(id: string): Promise<Mood | null> {
    const mood = await MoodModel.findById(id);
    return mood ? this.toDomain(mood) : null;
  }

  async update(id: string, data: { name?: string; songs?: ISong[] }): Promise<Mood> {
     const updatedMood = await MoodModel.findByIdAndUpdate(
    id,
    {
      ...(data.name && { name: data.name }),
      ...(data.songs && { songs: data.songs })
    },
    { new: true }
  );
    if (!updatedMood) {
      throw new Error(`Mood with id ${id} not found`);
    }
    return this.toDomain(updatedMood);
  }

  async delete(id: string): Promise<void> {
    await MoodModel.findByIdAndDelete(id);
  }
}
