import { useState } from "react";
import { Field, inputClass, selectClass, resultBox } from "./shared";

export default function DateCalculator() {
    const [mode, setMode] = useState("diff");
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [baseDate, setBaseDate] = useState("");
    const [days, setDays] = useState("");
    const [operation, setOperation] = useState("add");

    const diffResult = (() => {
        if (mode !== "diff" || !date1 || !date2) return null;
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffDays = Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
        return { diffDays, weeks: Math.floor(diffDays / 7), months: Math.floor(diffDays / 30.44) };
    })();

    const addResult = (() => {
        if (mode !== "add" || !baseDate || !days) return null;
        const d = new Date(baseDate);
        const n = parseInt(days);
        d.setDate(d.getDate() + (operation === "add" ? n : -n));
        return d.toDateString();
    })();

    return (
        <div>
            <div className="flex gap-2 mb-5">
                <button onClick={() => setMode("diff")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${mode === "diff" ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"}`}>
                    Date Difference
                </button>
                <button onClick={() => setMode("add")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${mode === "add" ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"}`}>
                    Add / Subtract
                </button>
            </div>

            {mode === "diff" ? (
                <>
                    <Field label="From Date">
                        <input type="date" className={inputClass} value={date1} onChange={(e) => setDate1(e.target.value)} />
                    </Field>
                    <Field label="To Date">
                        <input type="date" className={inputClass} value={date2} onChange={(e) => setDate2(e.target.value)} />
                    </Field>
                    {diffResult && (
                        <div className={resultBox}>
                            <p className="text-2xl font-bold text-neutral-900 dark:text-white">{diffResult.diffDays} days</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">≈ {diffResult.weeks} weeks / {diffResult.months} months</p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <Field label="Base Date">
                        <input type="date" className={inputClass} value={baseDate} onChange={(e) => setBaseDate(e.target.value)} />
                    </Field>
                    <div className="flex gap-3">
                        <Field label="Days">
                            <input type="number" className={inputClass} value={days} onChange={(e) => setDays(e.target.value)} placeholder="30" />
                        </Field>
                        <Field label="Operation">
                            <select className={selectClass} value={operation} onChange={(e) => setOperation(e.target.value)}>
                                <option value="add">Add</option>
                                <option value="subtract">Subtract</option>
                            </select>
                        </Field>
                    </div>
                    {addResult && (
                        <div className={resultBox}>
                            <p className="text-lg font-bold text-neutral-900 dark:text-white">{addResult}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}