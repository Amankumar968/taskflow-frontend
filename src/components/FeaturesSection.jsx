import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faClock,
  faChartSimple,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

const FEATURES = [
  {
    icon: faListCheck,
    title: "Tasks",
    description:
      "Add, edit, and organize your to-dos. Mark them done as you go.",
  },
  {
    icon: faClock,
    title: "Focus Timer",
    description:
      "Start a timed session on a specific task and stay with it until the timer runs out.",
  },
  {
    icon: faChartSimple,
    title: "Analytics",
    description:
      "See how much time you've spent focusing and what you got done, day by day.",
  },
  {
    icon: faCalculator,
    title: "Tools",
    description:
      "A set of everyday calculators — age, BMI, EMI, GST, and more — built in.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white sm:text-3xl">
          Everything in one app
        </h2>
        <p className="mt-2 max-w-lg text-neutral-600 dark:text-neutral-400">
          No separate to-do app and separate timer app. It's all here.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400">
                <FontAwesomeIcon icon={feature.icon} className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}