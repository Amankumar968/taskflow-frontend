import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-700 text-white">
            <FontAwesomeIcon icon={faMugHot} className="h-4 w-4" />
          </span>
          Flowmint
        </div>

        <nav className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Start for free
          </Link>
        </nav>
      </header>

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}