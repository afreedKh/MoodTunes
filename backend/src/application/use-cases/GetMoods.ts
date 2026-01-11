import { IMoodRepository } from "../../domain/repositories/IMoodRepository";
import { inject,injectable } from "tsyringe";

@injectable()
export class GetMoods {
  
  constructor(
    @inject("IMoodRepository")
    private repo: IMoodRepository
  ) {}
  execute() {
    return this.repo.findAll();
  }
}
