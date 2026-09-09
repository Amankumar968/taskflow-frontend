import { useState } from "react";
import { Field, inputClass, btnClass, resultBox } from "./shared";

export default function GSTCalculator() {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("18");
    const [mode, setMode] = useState("add");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const a = parseFloat(amount);
        const r = parseFloat(rate);
        if (!a || !r) return;

        if (mode === "add") {
            const gstAmount = (a * r) / 100;
            setResult({ base: a, gst: gstAmount, total: a + gstAmount });
        } else {
            const base = a / (1 + r / 100);
            const gstAmount = a - base;
            setResult({ base, gst: gstAmount, total: a });
        }
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 max-w-xl shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
            <h1 className=" text-2xl font-semibold text-neutral-900 dark:text-white mb-6">GST Calculator</h1>
            <div className="flex gap-2 mb-5">
                <button onClick={() => setMode("add")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${mode === "add" ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"}`}>
                    Add GST
                </button>
                <button onClick={() => setMode("remove")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${mode === "remove" ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"}`}>
                    Remove GST (inclusive amount)
                </button>
            </div>
            <Field label={mode === "add" ? "Amount (excluding GST)" : "Amount (including GST)"}>
                <input type="number" className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1000" />
            </Field>
            <Field label="GST Rate (%)">
                <select className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)}>
                    {[5, 12, 18, 28].map((r) => <option key={r} value={r}>{r}%</option>)}
                </select>
            </Field>
            <button onClick={calculate} className={btnClass}>Calculate</button>

            {result && (
                <div className={resultBox}>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <p className="text-xs text-neutral-500">Base Amount</p>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">₹{result.base.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500">GST</p>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">₹{result.gst.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500">Total</p>
                            <p className="text-base font-bold text-neutral-900 dark:text-white">₹{result.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}