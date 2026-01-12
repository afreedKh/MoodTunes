import MoodModal from "../components/modals/MoodModal";
import {
  useGetMoodsQuery,
  useCreateMoodMutation,
  useDeleteMoodMutation,
  useUpdateMoodMutation,
} from "../features/moods/moodApi";
import { useState } from "react";
import { Plus, Music, Edit2, Trash2, ArrowRight } from "lucide-react";

const Home = () => {
  const { data: moods, isLoading } = useGetMoodsQuery();
  const [createMood] = useCreateMoodMutation();
  const [deleteMood] = useDeleteMoodMutation();
  const [updateMood] = useUpdateMoodMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingMoodId, setEditingMoodId] = useState<string | null>(null);
  const [moodName, setMoodName] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!moodName || !songTitle || !songArtist) return;

    setIsSubmitting(true);
    await createMood({
      name: moodName,
      songs: [{ title: songTitle, artist: songArtist }],
    });

    setMoodName("");
    setSongTitle("");
    setSongArtist("");
    setShowModal(false);
    setIsSubmitting(false);
  };

  const handleEditClick = (id: string, name: string) => {
    setEditingMoodId(id);
    setMoodName(name);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!moodName || !editingMoodId) return;

    setIsSubmitting(true);
    await updateMood({ id: editingMoodId, name: moodName });

    setMoodName("");
    setEditingMoodId(null);
    setShowModal(false);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setMoodName("");
    setSongTitle("");
    setSongArtist("");
    setEditingMoodId(null);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <Music className="h-8 w-8 text-indigo-600" />
          </div>
          <p className="text-slate-600">Loading moods...</p>
        </div>
      </div>
    );

  return (
    <>
    
      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
          {/* HERO */}
          <section className="max-w-2xl">
            <h1 className="text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Music that matches your mood
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Create moods, manage playlists, and get instant
              song recommendations tailored to your taste.
            </p>
          </section>

          {/* MOODS GRID */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Your moods
              </h2>
              {moods && moods.length > 0 && (
                <span className="text-sm text-slate-500">
                  ({moods.length})
                </span>
              )}
            </div>

            {moods && moods.length === 0 ? (
              <div className="text-center py-12 border border-slate-200 rounded-lg bg-slate-50">
                <Music className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 mb-6">
                  No moods yet. Create your first one!
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create mood
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add Mood Card */}
                <button
                  onClick={() => {
                    setEditingMoodId(null);
                    setShowModal(true);
                  }}
                  className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-200 flex items-center justify-center group"
                >
                  <div className="text-center">
                    <Plus className="h-6 w-6 text-slate-400 group-hover:text-indigo-600 mx-auto mb-2 transition-colors" />
                    <p className="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">
                      Add mood
                    </p>
                  </div>
                </button>

                {moods?.map((mood) => (
                  <div
                    key={mood.id}
                    className="group bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-900">
                        {mood.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {mood.songs.length} song{mood.songs.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-200">
                      <a
                        href={`/recommend/${mood.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        View
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>

                      <button
                        onClick={() => handleEditClick(mood.id, mood.name)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => deleteMood(mood.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-slate-600 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <MoodModal
        isOpen={showModal}
        isEditing={!!editingMoodId}
        moodName={moodName}
        songTitle={songTitle}
        songArtist={songArtist}
        isSubmitting={isSubmitting}
        onMoodNameChange={setMoodName}
        onSongTitleChange={setSongTitle}
        onSongArtistChange={setSongArtist}
        onSubmit={editingMoodId ? handleUpdate : handleCreate}
        onClose={closeModal}
      />
    </>
  );
};

export default Home;