import { IMoodRepository } from "../../domain/repositories/IMoodRepository";
import { injectable , inject} from "tsyringe";

@injectable()
export class DeleteMood {
  constructor(
    @inject("IMoodRepository")
    private repo: IMoodRepository
) {}

  execute(id: string) {
    return this.repo.delete(id);
  }
}
