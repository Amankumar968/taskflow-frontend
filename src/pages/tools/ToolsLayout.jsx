import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faCakeCandles, faWeightScale, faWallet, faCalendarDays,
    faPercent, faRulerCombined, faCalculator,
    faLandmark, faReceipt, faGraduationCap, faTag, faArrowTrendUp, faRightLeft
} from "@fortawesome/free-solid-svg-icons";

export const TOOLS = [
    { id: "age-calculator", label: "Age Calculator", desc: "Find exact age in years, months, days", icon: faCakeCandles, color: "danger" },
    { id: "bmi-calculator", label: "BMI Calculator", desc: "Check your body mass index", icon: faWeightScale, color: "success" },
    { id: "salary-calculator", label: "Salary Calculator", desc: "Break CTC into monthly, weekly, hourly", icon: faWallet, color: "warning" },
    { id: "date-calculator", label: "Date Calculator", desc: "Difference or add/subtract days", icon: faCalendarDays, color: "primary" },
    { id: "percentage-calculator", label: "Percentage Calculator", desc: "Percent of, change, and ratios", icon: faPercent, color: "secondary" },
    { id: "unit-converter", label: "Unit Converter", desc: "Length, weight, temperature", icon: faRulerCombined, color: "primary" },
    { id: "calculator", label: "Calculator", desc: "Basic arithmetic calculator", icon: faCalculator, color: "neutral" },
    { id: "emi-calculator", label: "EMI Calculator", desc: "Loan EMI, interest and total payment", icon: faLandmark, color: "primary" },
    { id: "gst-calculator", label: "GST Calculator", desc: "Add or remove GST from an amount", icon: faReceipt, color: "warning" },
    { id: "cgpa-calculator", label: "CGPA Calculator", desc: "Weighted CGPA and percentage", icon: faGraduationCap, color: "secondary" },
    { id: "discount-calculator", label: "Discount Calculator", desc: "Final price after discounts", icon: faTag, color: "danger" },
    { id: "profit-loss-calculator", label: "Profit & Loss Calculator", desc: "Profit/loss amount and percent", icon: faArrowTrendUp, color: "success" },
    { id: "currency-converter", label: "Currency Converter", desc: "Live exchange rate conversion", icon: faRightLeft, color: "secondary" },
];

const COLORS = {
    danger: "from-danger-500/20 to-danger-500/5 text-danger-400",
    success: "from-success-500/20 to-success-500/5 text-success-400",
    warning: "from-warning-500/20 to-warning-500/5 text-warning-400",
    primary: "from-primary-500/20 to-primary-500/5 text-primary-400",
    secondary: "from-secondary-500/20 to-secondary-500/5 text-secondary-400",
    neutral: "from-neutral-500/20 to-neutral-500/5 text-neutral-400",
};

export function ToolsGrid() {
    const navigate = useNavigate();
    return (
        <div className="space-y-8">
            <div>
                <h1 className=" text-3xl font-semibold text-neutral-900 dark:text-white mb-1">Tools</h1>
                <p className="text-neutral-500 text-sm">Handy utilities, all in one place</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {TOOLS.map(({ id, label, desc, icon, color }) => (
                    <button
                        key={id}
                        onClick={() => navigate(`/tools/${id}`)}
                        className="text-left bg-white border border-neutral-200 rounded-2xl p-5
                                   hover:border-primary-300 hover:-translate-y-0.5 shadow-warm
                                   dark:bg-neutral-900/60 dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/60
                                   transition-all duration-200"
                    >
                        <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${COLORS[color]} mb-3`}>
                            <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">{label}</p>
                        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function ToolsLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const isGrid = location.pathname === "/tools";
    const activeTool = TOOLS.find((t) => location.pathname === `/tools/${t.id}`);

    return (
        <div>
            {!isGrid && (
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate("/tools")}
                        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Tools
                    </button>
                    {activeTool && (
                        <>
                            <span className="text-neutral-300 dark:text-neutral-700">/</span>
                            <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">{activeTool.label}</span>
                        </>
                    )}
                </div>
            )}
            <Outlet />
        </div>
    );
}