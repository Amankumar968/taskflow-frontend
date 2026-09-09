import { createContext, useContext, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";

const ToastContext = createContext(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}

const ICONS = {
    success: faCircleCheck,
    error: faCircleXmark,
    info: faCircleInfo,
};

const STYLES = {
    success: "bg-success-500/10 border-success-500/30 text-success-500",
    error: "bg-danger-500/10 border-danger-500/30 text-danger-500",
    info: "bg-primary-500/10 border-primary-500/30 text-primary-500",
};

const ICON_COLOR = {
    success: "text-success-500",
    error: "text-danger-500",
    info: "text-primary-500",
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = "success", duration = 3000) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const dismissToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2.5 w-full max-w-sm pointer-events-none">
                {toasts.map((toast) => {
                    const icon = ICONS[toast.type];
                    return (
                        <div
                            key={toast.id}
                            className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-2xl border
                                        bg-white backdrop-blur-md shadow-warm-lg animate-[slideIn_0.3s_ease] ${STYLES[toast.type]}`}
                        >
                            <FontAwesomeIcon icon={icon} className={`h-5 w-5 shrink-0 mt-0.5 ${ICON_COLOR[toast.type]}`} />
                            <p className="text-sm font-medium text-neutral-700 flex-1">{toast.message}</p>
                            <button
                                onClick={() => dismissToast(toast.id)}
                                className="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}