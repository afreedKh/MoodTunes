import { Plus, Edit2, X } from "lucide-react";

interface SongModalProps {
  isOpen: boolean;
  isEditing: boolean;
  songTitle: string;
  songArtist: string;
  isSubmitting: boolean;
  onSongTitleChange: (value: string) => void;
  onSongArtistChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const SongModal = ({
  isOpen,
  isEditing,
  songTitle,
  songArtist,
  isSubmitting,
  onSongTitleChange,
  onSongArtistChange,
  onSubmit,
  onClose,
}: SongModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Edit2 className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Edit song
                </h2>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Add a song
                </h2>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Song title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-500"
              placeholder="e.g. Blinding Lights"
              value={songTitle}
              onChange={(e) => onSongTitleChange(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Artist
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-500"
              placeholder="e.g. The Weeknd"
              value={songArtist}
              onChange={(e) => onSongArtistChange(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-900 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting || !songTitle || !songArtist}
            className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-medium rounded-lg transition-colors"
          >
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
              ? "Update"
              : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongModal;