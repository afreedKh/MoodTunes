import { Router } from "express";
import { MoodController } from "../controller/MoodController";

const router = Router();
const controller = new MoodController();



router.post("/moods", controller.create);
router.get("/moods", controller.getAll);
router.get("/moods/:id/recommend", controller.recommend);
router.put("/moods/:id", controller.update);
router.delete("/moods/:id", controller.delete);
router.post("/moods/:id/songs", controller.addSong);
router.put("/moods/:moodId/songs/:songId", controller.updateSong);
router.delete("/moods/:moodId/songs/:songId", controller.removeSong);


export default router;
    