"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodController = void 0;
const container_1 = require("../../di/container");
const CreateMood_1 = require("../../application/use-cases/CreateMood");
const GetMoods_1 = require("../../application/use-cases/GetMoods");
const GetMoodRecommendation_1 = require("../../application/use-cases/GetMoodRecommendation");
const UpdateMood_1 = require("../../application/use-cases/UpdateMood");
const DeleteMood_1 = require("../../application/use-cases/DeleteMood");
class MoodController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usecase = container_1.container.resolve(CreateMood_1.CreateMood);
                const result = yield usecase.execute(req.body.name, req.body.songs);
                res.status(201).json(result);
            }
            catch (e) {
                res.status(400).json({ message: e.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usecase = container_1.container.resolve(GetMoods_1.GetMoods);
            res.json(yield usecase.execute());
        });
    }
    recommend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usecase = container_1.container.resolve(GetMoodRecommendation_1.GetMoodRecommendations);
                res.json(yield usecase.execute(req.params.id));
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usecase = container_1.container.resolve(UpdateMood_1.UpdateMood);
            res.json(yield usecase.execute(req.params.id, req.body));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usecase = container_1.container.resolve(DeleteMood_1.DeleteMood);
            yield usecase.execute(req.params.id);
            res.status(204).send();
        });
    }
}
exports.MoodController = MoodController;
