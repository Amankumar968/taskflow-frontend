import { useState } from "react";
import { Field, inputClass, btnClass } from "./shared";

export default function ProfitLossCalculator() {
    const [cost, setCost] = useState("");
    const [selling, setSelling] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const c = parseFloat(cost);
        const s = parseFloat(selling);
        if (!c || !s) return;

        const diff = s - c;
        const isProfit = diff >= 0;
        const percent = (Math.abs(diff) / c) * 100;

        setResult({ isProfit, amount: Math.abs(diff), percent });
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 max-w-xl shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
            <h1 className=" text-2xl font-semibold text-neutral-900 dark:text-white mb-6">Profit & Loss Calculator</h1>
            <Field label="Cost Price (₹)">
                <input type="number" className={inputClass} value={cost} onChange={(e) => setCost(e.target.value)} placeholder="500" />
            </Field>
            <Field label="Selling Price (₹)">
                <input type="number" className={inputClass} value={selling} onChange={(e) => setSelling(e.target.value)} placeholder="650" />
            </Field>
            <button onClick={calculate} className={btnClass}>Calculate</button>

            {result && (
                <div className={`mt-5 p-4 rounded-xl border ${result.isProfit ? "bg-success-500/10 border-success-500/20" : "bg-danger-500/10 border-danger-500/20"}`}>
                    <p className={`text-2xl font-bold ${result.isProfit ? "text-success-500" : "text-danger-500"}`}>
                        {result.isProfit ? "Profit" : "Loss"}: ₹{result.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{result.percent.toFixed(2)}% {result.isProfit ? "profit" : "loss"}</p>
                </div>
            )}
        </div>
    );
}