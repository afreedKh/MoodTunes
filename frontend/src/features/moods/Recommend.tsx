import { useParams } from "react-router-dom";
import {
  useAddSongMutation,
  useRecommendSongsQuery,
  useRemoveSongMutation,
  useUpdateSongMutation,
} from "./moodApi";
import SongModal from "../../components/modals/SongModal";
import { Trash2, Music, Plus, Edit2 } from "lucide-react";
import { useState } from "react";

const Recommend = () => {
  const [addSong] = useAddSongMutation();
  const [updateSong] = useUpdateSongMutation();
  const [removeSong] = useRemoveSongMutation();

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useRecommendSongsQuery(id!, { skip: !id });

  const [showModal, setShowModal] = useState(false);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSong = async () => {
    if (!songTitle || !songArtist) return;

    setIsSubmitting(true);
    await addSong({
      moodId: id!,
      song: { title: songTitle, artist: songArtist },
    });

    setSongTitle("");
    setSongArtist("");
    setShowModal(false);
    setIsSubmitting(false);
  };

  const handleEditClick = (songId: string, title: string, artist: string) => {
    setEditingSongId(songId);
    setSongTitle(title);
    setSongArtist(artist);
    setShowModal(true);
  };

  const handleUpdateSong = async () => {
    if (!songTitle || !songArtist || !editingSongId) return;

    setIsSubmitting(true);
    await updateSong({
      moodId: id!,
      songId: editingSongId,
      title: songTitle,
      artist: songArtist,
    });

    setSongTitle("");
    setSongArtist("");
    setEditingSongId(null);
    setShowModal(false);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSongTitle("");
    setSongArtist("");
    setEditingSongId(null);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Music className="h-5 w-5 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-semibold text-slate-900">
                Recommended Songs
              </h1>
            </div>
            <p className="text-slate-600 ml-11">
              {isLoading ? "Loading..." : `${data?.length || 0} songs`}
            </p>
          </div>

          {/* Add Song Button */}
          <button
            onClick={() => {
              setEditingSongId(null);
              setShowModal(true);
            }}
            className="w-full mb-8 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            Add Song
          </button>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">
                <Music className="h-6 w-6 text-indigo-600" />
              </div>
              <p className="mt-3 text-slate-600">Loading recommendations...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && (!data || data.length === 0) && (
            <div className="text-center py-12 border border-slate-200 rounded-lg bg-slate-50">
              <Music className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600">No songs yet. Add your first one!</p>
            </div>
          )}

          {/* Songs List */}
          {!isLoading && data && data.length > 0 && (
            <div className="space-y-3">
              {data.map((song: any, index: number) => (
                <div
                  key={song.id}
                  className="group relative bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-900 truncate">
                          {song.title}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {song.artist}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() =>
                          handleEditClick(song.id, song.title, song.artist)
                        }
                        className="p-2 hover:bg-slate-100 rounded-md text-slate-600 hover:text-slate-900 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          removeSong({ moodId: id!, songId: song.id })
                        }
                        className="p-2 hover:bg-red-50 rounded-md text-slate-600 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Song Modal */}
      <SongModal
        isOpen={showModal}
        isEditing={!!editingSongId}
        songTitle={songTitle}
        songArtist={songArtist}
        isSubmitting={isSubmitting}
        onSongTitleChange={setSongTitle}
        onSongArtistChange={setSongArtist}
        onSubmit={editingSongId ? handleUpdateSong : handleAddSong}
        onClose={closeModal}
      />
    </>
  );
};

export default Recommend;