import { IMoodRepository } from "../../domain/repositories/IMoodRepository";
import { injectable,inject } from "tsyringe";

@injectable()
export class RemoveSongFromMood {
  constructor(
    @inject("IMoodRepository")
    private repo: IMoodRepository
) {}

  async execute(moodId: string, songId: string) {
    const mood = await this.repo.removeSong(moodId, songId);
    if (!mood) throw new Error("Mood not found");

    return mood;
  }
}
