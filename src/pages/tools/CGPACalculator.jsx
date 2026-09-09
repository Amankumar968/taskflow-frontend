import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Field, inputClass, btnClass, resultBox } from "./shared";

export default function CGPACalculator() {
    const [subjects, setSubjects] = useState([{ credit: "", grade: "" }]);

    const addSubject = () => setSubjects([...subjects, { credit: "", grade: "" }]);
    const removeSubject = (idx) => setSubjects(subjects.filter((_, i) => i !== idx));
    const updateSubject = (idx, field, value) => {
        const updated = [...subjects];
        updated[idx][field] = value;
        setSubjects(updated);
    };

    const totalCredits = subjects.reduce((sum, s) => sum + (parseFloat(s.credit) || 0), 0);
    const weightedSum = subjects.reduce((sum, s) => sum + (parseFloat(s.credit) || 0) * (parseFloat(s.grade) || 0), 0);
    const cgpa = totalCredits > 0 ? weightedSum / totalCredits : 0;
    const percentage = cgpa * 9.5;

    return (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 max-w-xl shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
            <h1 className=" text-2xl font-semibold text-neutral-900 dark:text-white mb-6">CGPA Calculator</h1>

            <div className="space-y-3 mb-4">
                {subjects.map((s, idx) => (
                    <div key={idx} className="flex gap-3 items-end">
                        <Field label={`Subject ${idx + 1} Credits`}>
                            <input type="number" className={inputClass} value={s.credit} onChange={(e) => updateSubject(idx, "credit", e.target.value)} placeholder="4" />
                        </Field>
                        <Field label="Grade Point">
                            <input type="number" max="10" className={inputClass} value={s.grade} onChange={(e) => updateSubject(idx, "grade", e.target.value)} placeholder="9" />
                        </Field>
                        {subjects.length > 1 && (
                            <button onClick={() => removeSubject(idx)} className="mb-4 p-2.5 rounded-xl bg-neutral-100 text-danger-500 hover:bg-neutral-200 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700">
                                <FontAwesomeIcon icon={faTrashCan} className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button onClick={addSubject} className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200 mb-5">
                <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" /> Add Subject
            </button>

            {totalCredits > 0 && (
                <div className={resultBox}>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">{cgpa.toFixed(2)} CGPA</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">≈ {percentage.toFixed(2)}% (using CGPA × 9.5)</p>
                </div>
            )}
        </div>
    );
}