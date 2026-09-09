import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faClock, faChartSimple } from "@fortawesome/free-solid-svg-icons";

const STEPS = [
  {
    icon: faListCheck,
    label: "Step 1",
    title: "Add your task",
    description: "Write down what you need to work on, one task at a time.",
  },
  {
    icon: faClock,
    label: "Step 2",
    title: "Start a focus session",
    description:
      "Pick a duration — 15, 25, 30, 45, or 60 minutes — and start the timer for that task.",
  },
  {
    icon: faChartSimple,
    label: "Step 3",
    title: "Track your progress",
    description:
      "Once the session ends, it's logged automatically. Check Analytics to see your patterns.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white dark:bg-neutral-900/40">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white sm:text-3xl">
          How it works
        </h2>
        <p className="mt-2 max-w-lg text-neutral-600 dark:text-neutral-400">
          Three steps, no setup required.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.label}
              className="relative rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400">
                  <FontAwesomeIcon icon={step.icon} className="h-4.5 w-4.5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  {step.label}
                </span>
              </div>

              <h3 className="mt-5 text-base font-semibold text-neutral-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}