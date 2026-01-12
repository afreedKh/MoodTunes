import { Router } from "express";
import { MoodController } from "../controller/MoodController";

const router = Router();
const controller = new MoodController();

// More specific routes first
router.get("/moods/:id/recommend", (req, res) => controller.recommend(req, res));
router.post("/moods/:id/songs", (req, res) => controller.addSong(req, res));
router.put("/moods/:moodId/songs/:songId", (req, res) => controller.updateSong(req, res));
router.delete("/moods/:moodId/songs/:songId", (req, res) => controller.removeSong(req, res));

// Less specific routes after
router.post("/moods", (req, res) => controller.create(req, res));
router.get("/moods", (req, res) => controller.getAll(req, res));
router.put("/moods/:id", (req, res) => controller.update(req, res));
router.delete("/moods/:id", (req, res) => controller.delete(req, res));

export default router;
    