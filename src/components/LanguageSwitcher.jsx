import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCheck } from "@fortawesome/free-solid-svg-icons";

const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "mr", label: "मराठी" },
    { code: "gu", label: "ગુજરાતી" },
];

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(
        localStorage.getItem("preferredLang") || "en"
    );
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const changeLanguage = (code) => {
        setIsOpen(false);
        localStorage.setItem("preferredLang", code);
        setCurrent(code);

        // Google Translate reads/writes language via a cookie named googtrans
        const cookieValue = code === "en" ? "" : `/en/${code}`;
        document.cookie = `googtrans=${cookieValue};path=/`;
        document.cookie = `googtrans=${cookieValue};path=/;domain=${window.location.hostname}`;

        // Reload so the widget picks up the new cookie on page load
        window.location.reload();
    };

    const currentLabel = LANGUAGES.find((l) => l.code === current)?.label || "English";

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 h-10 px-3 rounded-xl
                           bg-neutral-100 border border-neutral-200 text-neutral-600 text-sm font-medium
                           hover:bg-neutral-200 transition-all duration-200
                           dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
                <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLabel}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-neutral-200 bg-white shadow-warm-lg py-1.5 z-50
                                 dark:border-neutral-800 dark:bg-neutral-900">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-neutral-700
                                       hover:bg-neutral-100 transition-colors
                                       dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                            {lang.label}
                            {lang.code === current && (
                                <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

