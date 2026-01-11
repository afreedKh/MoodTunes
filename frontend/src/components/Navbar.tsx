import { Music } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Music className="h-6 w-6 text-indigo-600" />
          <span>MoodTunes</span>
        </div>

        <Link
          to="/"
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
