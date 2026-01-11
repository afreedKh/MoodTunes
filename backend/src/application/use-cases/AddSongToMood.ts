import { IMoodRepository } from "../../domain/repositories/IMoodRepository";
import { injectable,inject } from "tsyringe";

@injectable()
export class AddSongToMood {
  constructor(
    @inject("IMoodRepository")
    private repo: IMoodRepository
  ) {}

  async execute(
    moodId: string,
    song: { title: string; artist: string }
  ) {
    if (!song.title || !song.artist) {
      throw new Error("Song title and artist are required");
    }

    const mood = await this.repo.addSong(moodId, song);
    if (!mood) throw new Error("Mood not found");

    return mood;
  }
}
