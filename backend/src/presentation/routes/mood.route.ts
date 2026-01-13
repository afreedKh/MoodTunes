import { Router } from "express";
import { MoodController } from "../controller/MoodController";

const router = Router();
const controller = new MoodController();

router.get("/moods/:id/recommend", async (req, res, next) => {
    await controller.recommend(req, res);
});

router.post("/moods/:id/songs", async (req, res) => {
  await controller.addSong(req, res);
});

router.put("/moods/:moodId/songs/:songId", async (req, res) => {
  await controller.updateSong(req, res);
});

router.delete("/moods/:moodId/songs/:songId", async (req, res) => {
  await controller.removeSong(req, res);
});

router.post("/moods", async (req, res) => {
  await controller.create(req, res);
});

router.get("/moods", async (req, res) => {
  await controller.getAll(req, res);
});

router.put("/moods/:id", async (req, res) => {
  await controller.update(req, res);
});

router.delete("/moods/:id", async (req, res) => {
  await controller.delete(req, res);
});

export default router;
    