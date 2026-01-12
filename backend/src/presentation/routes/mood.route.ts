import { Router } from "express";
import { MoodController } from "../controller/MoodController";

const router = Router();
const controller = new MoodController();

// More specific routes first - these must come before /moods/:id
router.get("/moods/:id/recommend", async (req, res) => {
  console.log("Recommend route hit:", req.params.id);
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

// Less specific routes after
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
    