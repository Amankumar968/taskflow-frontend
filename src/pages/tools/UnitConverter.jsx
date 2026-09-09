import { useState } from "react";
import { Field, inputClass, selectClass, resultBox } from "./shared";

const UNIT_GROUPS = {
    Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mile: 1609.34, yard: 0.9144, foot: 0.3048, inch: 0.0254 },
    Weight: { kg: 1000, g: 1, mg: 0.001, lb: 453.592, oz: 28.3495 },
};

export default function UnitConverter() {
    const [category, setCategory] = useState("Length");
    const [from, setFrom] = useState("m");
    const [to, setTo] = useState("km");
    const [value, setValue] = useState("");

    const convert = () => {
        const v = parseFloat(value);
        if (isNaN(v)) return null;

        if (category === "Temperature") {
            let celsius;
            if (from === "C") celsius = v;
            else if (from === "F") celsius = (v - 32) * (5 / 9);
            else celsius = v - 273.15;

            if (to === "C") return celsius;
            if (to === "F") return celsius * (9 / 5) + 32;
            return celsius + 273.15;
        }

        const units = UNIT_GROUPS[category];
        const base = v * units[from];
        return base / units[to];
    };

    const result = convert();
    const unitOptions =
        category === "Temperature" ? ["C", "F", "K"] : Object.keys(UNIT_GROUPS[category]);

    const handleCategoryChange = (cat) => {
        setCategory(cat);
        const opts = cat === "Temperature" ? ["C", "F", "K"] : Object.keys(UNIT_GROUPS[cat]);
        setFrom(opts[0]);
        setTo(opts[1]);
    };

    return (
        <div>
            <Field label="Category">
                <select className={selectClass} value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option>Length</option>
                    <option>Weight</option>
                    <option>Temperature</option>
                </select>
            </Field>
            <div className="flex gap-3 items-end">
                <Field label="Value">
                    <input type="number" className={inputClass} value={value} onChange={(e) => setValue(e.target.value)} />
                </Field>
                <Field label="From">
                    <select className={selectClass} value={from} onChange={(e) => setFrom(e.target.value)}>
                        {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                </Field>
                <Field label="To">
                    <select className={selectClass} value={to} onChange={(e) => setTo(e.target.value)}>
                        {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                </Field>
            </div>
            {result !== null && !isNaN(result) && (
                <div className={resultBox}>
                    <p className="text-lg font-bold text-neutral-900 dark:text-white">
                        {value} {from} = {result.toFixed(4)} {to}
                    </p>
                </div>
            )}
        </div>
    );
}