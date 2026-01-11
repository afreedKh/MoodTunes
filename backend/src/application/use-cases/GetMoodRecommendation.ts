import { IMoodRepository } from "../../domain/repositories/IMoodRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMoodRecommendations {
  constructor(
    @inject("IMoodRepository")
    private repo: IMoodRepository
) {}

  async execute(id: string) {
    const mood = await this.repo.findById(id);
    if (!mood) throw new Error("Mood not found");
    return mood.getSongs();
  }
}
