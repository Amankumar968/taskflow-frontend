import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function HeroSection() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
        {/* Left: copy */}
        <div>
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-700 text-white">
              <FontAwesomeIcon icon={faMugHot} className="h-3.5 w-3.5" />
            </span>
            Flowmint
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            A to-do list and a focus timer, in one place.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            Add your tasks, pick one, and start a timed focus session for
            it. That's the whole idea — nothing to configure before you can
            use it.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-primary-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Start for free
            </Link>
            <Link
              to="/login"
              className="text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* Right: a plain, flat product snapshot */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-xs font-semibold text-neutral-400">Today</p>
          <ul className="mt-3 space-y-2.5 border-b border-neutral-100 pb-5 dark:border-neutral-800">
            <li className="flex items-center gap-2 text-sm text-neutral-400 line-through">
              <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5 text-success-500" />
              Draft the proposal
            </li>
            <li className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-neutral-300 dark:border-neutral-600" />
              Review client notes
            </li>
            <li className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-neutral-300 dark:border-neutral-600" />
              Prep tomorrow's standup
            </li>
          </ul>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Focusing on: Review client notes
              </p>
              <p className="mt-1 text-xs text-neutral-400">Session 2 of 3 today</p>
            </div>
            <span className="rounded-full bg-primary-50 px-3 py-1.5 text-sm font-semibold tabular-nums text-primary-700 dark:bg-primary-500/10 dark:text-primary-400">
              18:42
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}