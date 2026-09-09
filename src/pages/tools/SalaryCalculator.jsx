import { useState } from "react";
import { Field, inputClass } from "./shared";

export default function SalaryCalculator() {
    const [annual, setAnnual] = useState("");
    const result = (() => {
        const a = parseFloat(annual);
        if (!a) return null;
        return {
            monthly: a / 12,
            weekly: a / 52,
            daily: a / 260,
            hourly: a / 260 / 8,
        };
    })();

    return (
        <div>
            <Field label="Annual Salary (CTC)">
                <input type="number" className={inputClass} value={annual} onChange={(e) => setAnnual(e.target.value)} placeholder="1200000" />
            </Field>
            {result && (
                <div className="grid grid-cols-2 gap-3 mt-5">
                    {[
                        ["Monthly", result.monthly],
                        ["Weekly", result.weekly],
                        ["Daily", result.daily],
                        ["Hourly", result.hourly],
                    ].map(([label, val]) => (
                        <div key={label} className="p-3.5 rounded-xl bg-white border border-neutral-200 dark:bg-neutral-800/60 dark:border-neutral-700">
                            <p className="text-xs text-neutral-500">{label}</p>
                            <p className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                                ₹{val.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <p className="text-[11px] text-neutral-400 dark:text-neutral-600 mt-3">Assumes 260 working days/year, 8 hrs/day.</p>
        </div>
    );
}