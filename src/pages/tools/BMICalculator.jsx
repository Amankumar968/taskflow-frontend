import { useState } from "react";
import { Field, inputClass, resultBox, btnClass } from "./shared";

export default function BMICalculator() {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);
        if (!h || !w) return;
        const bmi = w / (h * h);
        let category = "Normal";
        let color = "text-success-500";
        if (bmi < 18.5) { category = "Underweight"; color = "text-warning-500"; }
        else if (bmi >= 25 && bmi < 30) { category = "Overweight"; color = "text-warning-500"; }
        else if (bmi >= 30) { category = "Obese"; color = "text-danger-500"; }
        setResult({ bmi: bmi.toFixed(1), category, color });
    };

    return (
        <div>
            <Field label="Height (cm)">
                <input type="number" className={inputClass} value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" />
            </Field>
            <Field label="Weight (kg)">
                <input type="number" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="65" />
            </Field>
            <button onClick={calculate} className={btnClass}>
                Calculate
            </button>
            {result && (
                <div className={resultBox}>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">{result.bmi}</p>
                    <p className={`text-sm font-medium mt-1 ${result.color}`}>{result.category}</p>
                </div>
            )}
        </div>
    );
}