import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faSun, faMoon, faBars } from "@fortawesome/free-solid-svg-icons";
import LanguageSwitcher from "./LanguageSwitcher";

function Navbar({ mode, onToggle, onMenuClick }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const displayName = localStorage.getItem("name") || username;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="relative z-30 flex items-center justify-between gap-3 border-b border-neutral-200
                        bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6
                        dark:border-neutral-800/60 dark:bg-neutral-950/80">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl
                     bg-neutral-100 border border-neutral-200 text-neutral-600
                     hover:bg-neutral-200 dark:bg-neutral-900 dark:border-neutral-800
                     dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
        </button>
        <div>
          <p className="text-lg font-semibold text-neutral-900 dark:text-white">
            Welcome back, <span className="text-primary-600 dark:text-primary-400">{displayName}</span>
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">{today}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <LanguageSwitcher />

        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center justify-center h-10 w-10 rounded-xl
                     bg-neutral-100 border border-neutral-200 text-neutral-600
                     hover:bg-neutral-200 hover:text-primary-600 transition-all duration-200
                     dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300
                     dark:hover:bg-neutral-800 dark:hover:text-primary-400"
          title="Toggle theme"
        >
          <FontAwesomeIcon icon={mode === "dark" ? faSun : faMoon} className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-100
                     px-3 sm:px-4 py-2.5 text-sm font-semibold text-neutral-600 transition-all duration-200
                     hover:bg-danger-500/10 hover:text-danger-500 hover:border-danger-500/30
                     dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;