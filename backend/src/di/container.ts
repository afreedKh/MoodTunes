import { container } from "tsyringe";
import { IMoodRepository } from "../domain/repositories/IMoodRepository";
import { IMongoMoodRepository } from "../infrastructure/database/repositories/IMongoMoodRepository";

// register repository
container.register<IMoodRepository>(
  "IMoodRepository",
  {
    useClass: IMongoMoodRepository
  }
);

export { container };
