import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh, faListCheck, faStopwatch, faChartSimple,
  faScrewdriverWrench, faMugHot, faXmark,
} from "@fortawesome/free-solid-svg-icons";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: faGaugeHigh },
  { to: "/tasks", label: "Tasks", icon: faListCheck },
  { to: "/focus-timer", label: "Focus Timer", icon: faStopwatch },
  { to: "/analytics", label: "Analytics", icon: faChartSimple },
  { to: "/tools", label: "Tools", icon: faScrewdriverWrench },
];

function SidebarContent({ onNavigate }) {
  return (
    <>
      {/* Logo / Brand */}
      <div className="flex items-center gap-2.5 px-2 mb-10">
        <div className="rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-2.5 text-white shadow-warm">
          <FontAwesomeIcon icon={faMugHot} className="h-4 w-4" />
        </div>
        <span className=" text-lg font-semibold text-neutral-900 dark:text-white tracking-tight">
          Flowmint
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5">
        <p className="px-3 mb-2 text-xs font-medium text-neutral-400 dark:text-neutral-600">
          Menu
        </p>
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-primary-500/15 to-primary-500/5 text-primary-700 dark:text-primary-300"
                  : "text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary-500" />
                )}
                <FontAwesomeIcon
                  icon={icon}
                  className={`h-4 w-4 transition-transform ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3 py-4 rounded-2xl bg-neutral-100 border border-neutral-200 dark:bg-neutral-900/50 dark:border-neutral-800">
        <p className="text-xs text-neutral-500 leading-relaxed">
          Stay focused, stay productive.
        </p>
      </div>
    </>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0
                         bg-gradient-to-b from-neutral-50 to-neutral-100 border-r border-neutral-200
                         dark:from-neutral-950 dark:to-neutral-900 dark:border-neutral-800/60
                         px-4 py-6">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-72 flex flex-col
                      bg-gradient-to-b from-neutral-50 to-neutral-100 border-r border-neutral-200
                      dark:from-neutral-950 dark:to-neutral-900 dark:border-neutral-800/60
                      px-4 py-6 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-4 p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          </button>
          <SidebarContent onNavigate={onClose} />
        </aside>
      </div>
    </>
  );
}