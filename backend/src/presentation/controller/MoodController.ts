import type { Request, Response } from "express";
import { container } from "../../di/container";
import { CreateMood } from "../../application/use-cases/CreateMood";
import { GetMoods } from "../../application/use-cases/GetMoods";
import { GetMoodRecommendations } from "../../application/use-cases/GetMoodRecommendation";
import { UpdateMood } from "../../application/use-cases/UpdateMood";
import { DeleteMood } from "../../application/use-cases/DeleteMood";
import { AddSongToMood } from "../../application/use-cases/AddSongToMood";
import { RemoveSongFromMood } from "../../application/use-cases/RemoveSongFromMood";
import { UpdateSong } from "../../application/use-cases/UpdateSong";
import { ISong } from "../../domain/entities/Mood";


interface CreateMoodBody {
  name: string;
  songs: {
    title: string;
    artist: string;
  }[];
}

interface UpdateMoodBody {
  name?: string;
  songs?: ISong[];
}

interface SongBody {
  title: string;
  artist: string;
}


export class MoodController {
  async create(req: Request<{}, {}, CreateMoodBody>, res: Response) {
    try {
      const usecase = container.resolve(CreateMood);
      const result = await usecase.execute(req.body.name, req.body.songs);
      res.status(201).json(result);
    } catch (e: unknown) {
      const error = e as Error;
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const usecase = container.resolve(GetMoods);
    res.json(await usecase.execute());
  }

  async recommend(req: Request<{ id: string }>, res: Response) {
    try {
      const usecase = container.resolve(GetMoodRecommendations);
      const result = await usecase.execute(req.params.id);
      res.json(result);
    } catch (e: unknown) {
      const error = e as Error;
      console.error("Recommend error:", error.message, "for id:", req.params.id);
      res.status(404).json({ message: error.message });
    }
  }

  async update(req: Request<{ id: string }, {}, UpdateMoodBody>, res: Response) {
    const usecase = container.resolve(UpdateMood);
    res.json(await usecase.execute(req.params.id, req.body));
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const usecase = container.resolve(DeleteMood);
    await usecase.execute(req.params.id);
    res.status(204).send();
  }
  

  async addSong(req: Request<{ id: string }, {}, SongBody>, res: Response) {
    try {
      const usecase = container.resolve(AddSongToMood);
      const mood = await usecase.execute(req.params.id, req.body);
      res.status(200).json(mood);
    } catch (e: unknown) {
      const error = e as Error;
      res.status(400).json({ message: error.message });
    }
  }

  async removeSong(req: Request<{ moodId: string; songId: string }>, res: Response) {
    try {
      const usecase = container.resolve(RemoveSongFromMood);
      const mood = await usecase.execute(
        req.params.moodId,
        req.params.songId
      );
      res.status(200).json(mood);
    } catch (e: unknown) {
      const error = e as Error;
      res.status(404).json({ message: error.message });
    }
  }

  async updateSong(req: Request<{ moodId: string; songId: string }, {}, SongBody>, res: Response) {
    try {
      const usecase = container.resolve(UpdateSong);
      const mood = await usecase.execute(
        req.params.moodId,
        req.params.songId,
        req.body
      );
      
      res.json(mood);
    } catch (e: unknown) {
      const error = e as Error;
      res.status(400).json({ message: error.message });
    }
  }
}
