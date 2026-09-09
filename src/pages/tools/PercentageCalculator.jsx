import { useState } from "react";
import { Field, inputClass, resultBox } from "./shared";

export default function PercentageCalculator() {
    const [mode, setMode] = useState("of");
    const [x, setX] = useState("");
    const [y, setY] = useState("");

    const result = (() => {
        const a = parseFloat(x);
        const b = parseFloat(y);
        if (isNaN(a) || isNaN(b)) return null;
        if (mode === "of") return `${a}% of ${b} = ${((a / 100) * b).toFixed(2)}`;
        if (mode === "isWhatPercent") return `${a} is ${((a / b) * 100).toFixed(2)}% of ${b}`;
        if (mode === "change") {
            const change = ((b - a) / a) * 100;
            return `${change >= 0 ? "Increase" : "Decrease"} of ${Math.abs(change).toFixed(2)}%`;
        }
        return null;
    })();

    const modes = [
        { id: "of", label: "X% of Y" },
        { id: "isWhatPercent", label: "X is what % of Y" },
        { id: "change", label: "% Change (X → Y)" },
    ];

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-5">
                {modes.map((m) => (
                    <button key={m.id} onClick={() => setMode(m.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${mode === m.id ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"}`}>
                        {m.label}
                    </button>
                ))}
            </div>
            <div className="flex gap-3">
                <Field label="X">
                    <input type="number" className={inputClass} value={x} onChange={(e) => setX(e.target.value)} />
                </Field>
                <Field label="Y">
                    <input type="number" className={inputClass} value={y} onChange={(e) => setY(e.target.value)} />
                </Field>
            </div>
            {result && (
                <div className={resultBox}>
                    <p className="text-lg font-bold text-neutral-900 dark:text-white">{result}</p>
                </div>
            )}
        </div>
    );
}