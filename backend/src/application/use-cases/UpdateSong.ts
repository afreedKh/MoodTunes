import { IMoodRepository } from "../../domain/repositories/IMoodRepository";
import { injectable ,inject } from "tsyringe";


@injectable()
export class UpdateSong {
  constructor(
    @inject("IMoodRepository")
    private repo: IMoodRepository
  ) {}

  async execute(
    moodId: string,
    songId: string,
    data: { title: string; artist: string }
  ) {
    if (!data.title || !data.artist) {
      throw new Error("Title and artist are required");
    }

    const mood = await this.repo.updateSong(moodId, songId, data);
    if (!mood) throw new Error("Mood or song not found");

    return mood;
  }
}
