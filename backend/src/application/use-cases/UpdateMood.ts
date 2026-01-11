import { ISong, Mood } from "../../domain/entities/Mood";
import { IMoodRepository } from "../../domain/repositories/IMoodRepository";
import { inject,injectable } from "tsyringe";

@injectable()
export class UpdateMood {

  constructor(
    @inject("IMoodRepository")
    private repo: IMoodRepository
) {}

  execute(id: string, data: { name?: string; songs?: ISong[] }) {
    return this.repo.update(id, data);
  }
}
