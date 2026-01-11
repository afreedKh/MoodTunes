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
exports.IMongoMoodRepository = void 0;
const Mood_1 = require("../../../domain/entities/Mood");
const mood_model_1 = require("../../database/mongoose/models/mood.model");
class IMongoMoodRepository {
    toDomain(moodDoc) {
        return new Mood_1.Mood(moodDoc._id, moodDoc.name, moodDoc.songs.map((song) => ({
            title: song.title,
            artist: song.artist,
        })));
    }
    create(mood) {
        return __awaiter(this, void 0, void 0, function* () {
            const moodDoc = new mood_model_1.MoodModel({
                name: mood.getName(),
                songs: mood.getSongs(),
            });
            const savedMood = yield moodDoc.save();
            return this.toDomain(savedMood);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const moods = yield mood_model_1.MoodModel.find();
            return moods.map(this.toDomain);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const mood = yield mood_model_1.MoodModel.findById(id);
            return mood ? this.toDomain(mood) : null;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedMood = yield mood_model_1.MoodModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, (data.name && { name: data.name })), (data.songs && { songs: data.songs })), { new: true });
            if (!updatedMood) {
                throw new Error(`Mood with id ${id} not found`);
            }
            return this.toDomain(updatedMood);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mood_model_1.MoodModel.findByIdAndDelete(id);
        });
    }
}
exports.IMongoMoodRepository = IMongoMoodRepository;
