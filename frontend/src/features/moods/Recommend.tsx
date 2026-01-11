import { useParams } from "react-router-dom";
import {
  useAddSongMutation,
  useRecommendSongsQuery,
  useRemoveSongMutation,
  useUpdateSongMutation,
} from "./moodApi";
import { Trash2, Music } from "lucide-react";

const Recommend = () => {
  const [addSong] = useAddSongMutation();
  const [updateSong] = useUpdateSongMutation();

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useRecommendSongsQuery(id!, { skip: !id });

  const [removeSong] = useRemoveSongMutation();

  if (isLoading) return <p className="p-6">Loading...</p>;

  const handleAddSong = async (moodId: string) => {
    const title = prompt("Song title?");
    const artist = prompt("Artist?");
    if (!title || !artist) return;

    await addSong({
      moodId,
      song: { title, artist },
    });
  };

  const handleEditSong = async (song: any) => {
    const title = prompt("New song title", song.title);
    const artist = prompt("New artist", song.artist);

    if (!title || !artist) return;

    await updateSong({
      moodId: id!,
      songId: song.id,
      title,
      artist,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Music className="h-6 w-6 text-indigo-600" />
        Recommended Songs
      </h2>

      <button
        onClick={() => handleAddSong(id as string)}
        className="text-green-500"
      >
        + Add Song
      </button>

      <ul className="space-y-4 ">
        {data?.map((song: any) => (
          <li
            key={song.id}
            className="bg-white shadow rounded-xl p-4 flex justify-between"
          >
            <div>
              <p className="font-semibold">{song.title}</p>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>

            <button
              onClick={() => handleEditSong(song)}
              className="text-blue-500 hover:text-blue-600 "
            >
              ✏️
            </button>

            <button
              onClick={() => removeSong({ moodId: id!, songId: song.id })}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommend;
