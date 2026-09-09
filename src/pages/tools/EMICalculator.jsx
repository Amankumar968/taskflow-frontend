import { useState } from "react";
import { Field, inputClass, btnClass, resultBox } from "./shared";

export default function EMICalculator() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [tenureType, setTenureType] = useState("years");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const P = parseFloat(principal);
        const annualRate = parseFloat(rate);
        const years = parseFloat(tenure);
        if (!P || !annualRate || !years) return;

        const n = tenureType === "years" ? years * 12 : years;
        const r = annualRate / 12 / 100;

        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        setResult({
            emi: emi.toFixed(0),
            totalPayment: totalPayment.toFixed(0),
            totalInterest: totalInterest.toFixed(0),
        });
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 max-w-xl shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
            <h1 className=" text-2xl font-semibold text-neutral-900 dark:text-white mb-6">EMI Calculator</h1>
            <Field label="Loan Amount (₹)">
                <input type="number" className={inputClass} value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="500000" />
            </Field>
            <Field label="Annual Interest Rate (%)">
                <input type="number" className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.5" />
            </Field>
            <div className="flex gap-3">
                <Field label="Tenure">
                    <input type="number" className={inputClass} value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="5" />
                </Field>
                <Field label="Unit">
                    <select className={inputClass} value={tenureType} onChange={(e) => setTenureType(e.target.value)}>
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                    </select>
                </Field>
            </div>
            <button onClick={calculate} className={btnClass}>Calculate</button>

            {result && (
                <div className={resultBox}>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">₹{Number(result.emi).toLocaleString()}<span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal"> /month</span></p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div>
                            <p className="text-xs text-neutral-500">Total Interest</p>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">₹{Number(result.totalInterest).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500">Total Payment</p>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">₹{Number(result.totalPayment).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}