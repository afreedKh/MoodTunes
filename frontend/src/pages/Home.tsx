import { Link } from "react-router-dom";
import {
  useGetMoodsQuery,
  useCreateMoodMutation,
  useDeleteMoodMutation,
  useUpdateMoodMutation,
} from "../features/moods/moodApi";
import { useState } from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";

const Home = () => {
  const { data, isLoading } = useGetMoodsQuery();
  const [createMood] = useCreateMoodMutation();
  const [deleteMood] = useDeleteMoodMutation();
  const [updateMood] = useUpdateMoodMutation();

  const [moodName, setMoodName] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");

  const handleCreate = async () => {
    if (!moodName || !songTitle || !songArtist) {
      alert("Mood name and at least one song are required");
      return;
    }

    await createMood({
      name: moodName,
      songs: [{ title: songTitle, artist: songArtist }],
    });

    setMoodName("");
    setSongTitle("");
    setSongArtist("");
  };

  const handleEditMood = async (id: string, oldName: string) => {
  const newName = prompt("Enter new mood name", oldName);
  if (!newName) return;

  await updateMood({ id, name: newName });
};


  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Create Mood Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-indigo-600" />
          Create Mood
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="input"
            placeholder="Mood name"
            value={moodName}
            onChange={(e) => setMoodName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Song title"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <input
            className="input"
            placeholder="Artist"
            value={songArtist}
            onChange={(e) => setSongArtist(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreate}
          className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          Add Mood
        </button>
      </div>

      {/* Mood List */}
      <h2 className="text-2xl font-bold mb-6">Your Moods</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((mood) => (
          <div
            key={mood.id}
            className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{mood.name}</h3>
              <p className="text-sm text-gray-500">
                {mood.songs.length} songs
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link
                to={`/recommend/${mood.id}`}
                className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
              >
                <Sparkles className="h-4 w-4" />
                Recommend
              </Link>

              <button
                onClick={() => handleEditMood(mood.id, mood.name)}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </button>


              <button
                onClick={() => deleteMood(mood.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
