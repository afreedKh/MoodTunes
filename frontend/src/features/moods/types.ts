export interface Song {
  _id: string;
  title: string;
  artist: string;
}

export interface Mood {
  id: string;
  name: string;
  songs: Song[];
}
