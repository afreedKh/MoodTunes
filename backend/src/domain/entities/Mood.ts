
export interface ISong {
  id: string;
  title: string;
  artist: string;
}


export class Mood {

    constructor(
        private readonly id: string,
        private name: string,
        private songs: ISong[]
    ) {}

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
    
    getSongs(): ISong[] {
        return this.songs;
    }

    changeName(newName: string): void {
        this.name = newName;
    }
    
    addSong(song: ISong): void {
        this.songs.push(song);
    }

}