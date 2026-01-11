"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mood = void 0;
class Mood {
    constructor(id, name, songs) {
        this.id = id;
        this.name = name;
        this.songs = songs;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getSongs() {
        return this.songs;
    }
    changeName(newName) {
        this.name = newName;
    }
    addSong(song) {
        this.songs.push(song);
    }
}
exports.Mood = Mood;
