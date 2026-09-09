import { useState } from "react";
import { Field, inputClass, btnClass, resultBox } from "./shared";

export default function DiscountCalculator() {
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [extraDiscount, setExtraDiscount] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const p = parseFloat(price);
        const d = parseFloat(discount);
        if (!p || !d) return;

        const afterFirst = p - (p * d) / 100;
        const extra = parseFloat(extraDiscount) || 0;
        const finalPrice = afterFirst - (afterFirst * extra) / 100;
        const totalSaved = p - finalPrice;

        setResult({ finalPrice, totalSaved, savedPercent: (totalSaved / p) * 100 });
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 max-w-xl shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
            <h1 className=" text-2xl font-semibold text-neutral-900 dark:text-white mb-6">Discount Calculator</h1>
            <Field label="Original Price (₹)">
                <input type="number" className={inputClass} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="2000" />
            </Field>
            <Field label="Discount (%)">
                <input type="number" className={inputClass} value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="20" />
            </Field>
            <Field label="Extra Discount (%) — optional">
                <input type="number" className={inputClass} value={extraDiscount} onChange={(e) => setExtraDiscount(e.target.value)} placeholder="0" />
            </Field>
            <button onClick={calculate} className={btnClass}>Calculate</button>

            {result && (
                <div className={resultBox}>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">₹{result.finalPrice.toFixed(2)}</p>
                    <p className="text-xs text-success-500 mt-1">
                        You save ₹{result.totalSaved.toFixed(2)} ({result.savedPercent.toFixed(1)}%)
                    </p>
                </div>
            )}
        </div>
    );
}