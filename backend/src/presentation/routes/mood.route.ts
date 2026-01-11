import { Router } from "express";
import { MoodController } from "../controller/MoodController";

const router = Router();
const controller = new MoodController();

router.post("/moods", controller.create);
router.get("/moods", controller.getAll);
router.get("/moods/:id/recommend", controller.recommend);
router.put("/moods/:id", controller.update);
router.delete("/moods/:id", controller.delete);

export default router;
