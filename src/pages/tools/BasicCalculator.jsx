import { useState } from "react";

export default function BasicCalculator() {
    const [display, setDisplay] = useState("0");
    const [prevValue, setPrevValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === "0" ? String(digit) : display + digit);
        }
    };

    const inputDecimal = () => {
        if (!display.includes(".")) setDisplay(display + ".");
    };

    const clear = () => {
        setDisplay("0");
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const compute = (a, b, op) => {
        switch (op) {
            case "+": return a + b;
            case "-": return a - b;
            case "×": return a * b;
            case "÷": return b === 0 ? NaN : a / b;
            default: return b;
        }
    };

    const handleOperator = (nextOp) => {
        const inputValue = parseFloat(display);
        if (prevValue === null) {
            setPrevValue(inputValue);
        } else if (operator) {
            const result = compute(prevValue, inputValue, operator);
            setDisplay(String(result));
            setPrevValue(result);
        }
        setWaitingForOperand(true);
        setOperator(nextOp);
    };

    const handleEquals = () => {
        if (operator === null || prevValue === null) return;
        const inputValue = parseFloat(display);
        const result = compute(prevValue, inputValue, operator);
        setDisplay(String(result));
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    return (
        <div className="max-w-xs">
            <div className="bg-neutral-900 rounded-xl p-4 mb-4 text-right dark:bg-neutral-950">
                <p className="text-3xl font-bold text-white truncate">{display}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {["C", "÷", "×", "-"].map((b) => (
                    <button
                        key={b}
                        onClick={() => b === "C" ? clear() : handleOperator(b)}
                        className="py-3 rounded-xl bg-neutral-100 text-primary-600 font-medium hover:bg-neutral-200 transition-colors dark:bg-neutral-800 dark:text-primary-300 dark:hover:bg-neutral-700"
                    >
                        {b}
                    </button>
                ))}
                {["7", "8", "9"].map((d) => (
                    <button key={d} onClick={() => inputDigit(d)} className="py-3 rounded-xl bg-white border border-neutral-200 text-neutral-800 font-medium hover:bg-neutral-50 transition-colors dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700">{d}</button>
                ))}
                <button onClick={() => handleOperator("+")} className="py-3 rounded-xl bg-neutral-100 text-primary-600 font-medium hover:bg-neutral-200 transition-colors row-span-2 dark:bg-neutral-800 dark:text-primary-300 dark:hover:bg-neutral-700">+</button>
                {["4", "5", "6"].map((d) => (
                    <button key={d} onClick={() => inputDigit(d)} className="py-3 rounded-xl bg-white border border-neutral-200 text-neutral-800 font-medium hover:bg-neutral-50 transition-colors dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700">{d}</button>
                ))}
                {["1", "2", "3"].map((d) => (
                    <button key={d} onClick={() => inputDigit(d)} className="py-3 rounded-xl bg-white border border-neutral-200 text-neutral-800 font-medium hover:bg-neutral-50 transition-colors dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700">{d}</button>
                ))}
                <button onClick={handleEquals} className="py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-500 transition-colors row-span-2">=</button>
                <button onClick={() => inputDigit("0")} className="py-3 rounded-xl bg-white border border-neutral-200 text-neutral-800 font-medium hover:bg-neutral-50 transition-colors col-span-2 dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700">0</button>
                <button onClick={inputDecimal} className="py-3 rounded-xl bg-white border border-neutral-200 text-neutral-800 font-medium hover:bg-neutral-50 transition-colors dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700">.</button>
            </div>
        </div>
    );
}