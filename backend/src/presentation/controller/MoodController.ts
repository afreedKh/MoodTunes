import { Request, Response } from "express";
import { container } from "../../di/container";
import { CreateMood } from "../../application/use-cases/CreateMood";
import { GetMoods } from "../../application/use-cases/GetMoods";
import { GetMoodRecommendations } from "../../application/use-cases/GetMoodRecommendation";
import { UpdateMood } from "../../application/use-cases/UpdateMood";
import { DeleteMood } from "../../application/use-cases/DeleteMood";
import { AddSongToMood } from "../../application/use-cases/AddSongToMood";
import { RemoveSongFromMood } from "../../application/use-cases/RemoveSongFromMood";
import { UpdateSong } from "../../application/use-cases/UpdateSong";

export class MoodController {
  async create(req: Request, res: Response) {
    try {
      const usecase = container.resolve(CreateMood);
      const result = await usecase.execute(req.body.name, req.body.songs);
      res.status(201).json(result);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const usecase = container.resolve(GetMoods);
    res.json(await usecase.execute());
  }

  async recommend(req: Request, res: Response) {
    try {
      const usecase = container.resolve(GetMoodRecommendations);
      res.json(await usecase.execute(req.params.id as string));
    } catch (e: any) {
      res.status(404).json({ message: e.message });
    }
  }

  async update(req: Request, res: Response) {
    const usecase = container.resolve(UpdateMood);
    res.json(await usecase.execute(req.params.id as string, req.body));
  }

  async delete(req: Request, res: Response) {
    const usecase = container.resolve(DeleteMood);
    await usecase.execute(req.params.id as string);
    res.status(204).send();
  }

  async addSong(req: Request, res: Response) {
    try {
      const usecase = container.resolve(AddSongToMood);
      const mood = await usecase.execute(req.params.id as string, req.body);
      res.status(200).json(mood);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async removeSong(req: Request, res: Response) {
    try {
      const usecase = container.resolve(RemoveSongFromMood);
      const mood = await usecase.execute(
        req.params.moodId as string,
        req.params.songId as string
      );
      res.status(200).json(mood);
    } catch (e: any) {
      res.status(404).json({ message: e.message });
    }
  }

  async updateSong(req: Request, res: Response) {
  try {
    const usecase = container.resolve(UpdateSong);
    const mood = await usecase.execute(
      req.params.moodId as string,
      req.params.songId as string,
      req.body
    );
    
    res.json(mood);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

}
