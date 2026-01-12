import { Music, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
     
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-lg bg-linear-to-br from-indigo-600 to-indigo-700 flex items-center justify-center group-hover:shadow-lg transition-shadow">
            <Music className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
            MoodTunes
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
          </Link>
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/afreedKh/MoodTunes"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            title="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            title="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;