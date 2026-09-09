import { useState } from "react";
import { Field, inputClass, btnClass, resultBox } from "./shared";

const CURRENCIES = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "SGD", "AED", "CNY"];

export default function CurrencyConverter() {
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const convert = async () => {
        const a = parseFloat(amount);
        if (!a) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
            const data = await res.json();
            if (data.result !== "success") throw new Error();
            const rate = data.rates[to];
            setResult({ converted: a * rate, rate });
        } catch {
            setError("Could not fetch live rates. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 max-w-xl shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
            <h1 className=" text-2xl font-semibold text-neutral-900 dark:text-white mb-6">Currency Converter</h1>
            <Field label="Amount">
                <input type="number" className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" />
            </Field>
            <div className="flex gap-3 items-end">
                <Field label="From">
                    <select className={inputClass} value={from} onChange={(e) => setFrom(e.target.value)}>
                        {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </Field>
                <Field label="To">
                    <select className={inputClass} value={to} onChange={(e) => setTo(e.target.value)}>
                        {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </Field>
            </div>
            <button onClick={convert} disabled={loading} className={btnClass}>
                {loading ? "Converting..." : "Convert"}
            </button>

            {error && <p className="text-xs text-danger-500 mt-3">{error}</p>}

            {result && (
                <div className={resultBox}>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {result.converted.toFixed(2)} {to}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">1 {from} = {result.rate.toFixed(4)} {to}</p>
                </div>
            )}
        </div>
    );
}