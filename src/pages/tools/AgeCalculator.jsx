import { useState } from "react";
import { Field, inputClass, resultBox, btnClass } from "./shared";

export default function AgeCalculator() {
    const [dob, setDob] = useState("");
    const [age, setAge] = useState(null);

    const calculate = () => {
        if (!dob) return;
        const birth = new Date(dob);
        const today = new Date();
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
        setAge({ years, months, days, totalDays });
    };

    return (
        <div>
            <Field label="Date of Birth">
                <input type="date" className={inputClass} value={dob} onChange={(e) => setDob(e.target.value)} />
            </Field>
            <button onClick={calculate} className={btnClass}>
                Calculate
            </button>
            {age && (
                <div className={resultBox}>
                    <p className="text-lg font-bold text-neutral-900 dark:text-white">
                        {age.years} years, {age.months} months, {age.days} days
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Total: {age.totalDays.toLocaleString()} days</p>
                </div>
            )}
        </div>
    );
}