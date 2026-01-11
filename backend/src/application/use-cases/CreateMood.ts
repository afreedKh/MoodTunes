import { IMoodRepository } from "../../domain/repositories/IMoodRepository";
import { Mood } from "../../domain/entities/Mood";
import { injectable,inject } from "tsyringe";

@injectable()
export class CreateMood {
  constructor(
    @inject("IMoodRepository")
    private repo: IMoodRepository
  ) {}

  async execute(name: string, songs: any[]) {
    if (!name || name.trim() === "") {
      throw new Error("Mood name is required");
    }
    
    if (!songs || songs.length === 0) {
      throw new Error("At least one song is required");
    }

    const mood = new Mood("", name, songs);
    return this.repo.create(mood);
  }
}
