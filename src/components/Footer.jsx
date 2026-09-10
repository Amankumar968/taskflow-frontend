import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-700 text-white">
                <FontAwesomeIcon icon={faMugHot} className="h-3.5 w-3.5" />
              </span>
              Flowmint
            </div>
            <p className="mt-2 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
              Stay focused, stay productive.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:flex sm:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>
                  <Link to="/tasks" className="hover:text-neutral-900 dark:hover:text-white">
                    Tasks
                  </Link>
                </li>
                <li>
                  <Link to="/focus-timer" className="hover:text-neutral-900 dark:hover:text-white">
                    Focus Timer
                  </Link>
                </li>
                <li>
                  <Link to="/analytics" className="hover:text-neutral-900 dark:hover:text-white">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className="hover:text-neutral-900 dark:hover:text-white">
                    Tools
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Account
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>
                  <Link to="/login" className="hover:text-neutral-900 dark:hover:text-white">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-neutral-900 dark:hover:text-white">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

<div className="mt-10 border-t border-neutral-200 pt-6 text-xs text-neutral-400 dark:border-neutral-800">
  © {new Date().getFullYear()} TaskFlow · Built by Aman Kumar.
</div>
      </div>
    </footer>
  );
}