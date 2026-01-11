"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodModel = void 0;
const mongoose_1 = require("mongoose");
const SongSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true }
});
const MoodSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    songs: { type: [SongSchema], default: [] }
});
exports.MoodModel = (0, mongoose_1.model)("Mood", MoodSchema);
