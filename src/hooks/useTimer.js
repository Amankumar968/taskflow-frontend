// import { useState, useEffect, useRef, useCallback } from "react";

// export function useTimer(durationInMinutes, onComplete) {
//     const totalSeconds = durationInMinutes * 60;

//     const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
//     const [isRunning, setIsRunning] = useState(false);

//     const intervalRef = useRef(null);
//     // Timestamp (ms) at which the timer should hit zero. Anchoring to a
//     // real clock time (instead of just decrementing a counter every tick)
//     // means the countdown stays accurate even if the browser throttles or
//     // pauses setInterval while the tab is in the background.
//     const endTimeRef = useRef(null);

//     // Reset whenever the selected duration changes (e.g. user picks a new preset)
//     useEffect(() => {
//         clearInterval(intervalRef.current);
//         endTimeRef.current = null;
//         setSecondsLeft(durationInMinutes * 60);
//         setIsRunning(false);
//     }, [durationInMinutes]);

//     const tick = useCallback(() => {
//         if (!endTimeRef.current) return;
//         const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
//         setSecondsLeft(remaining);

//         if (remaining <= 0) {
//             clearInterval(intervalRef.current);
//             setIsRunning(false);
//             endTimeRef.current = null;
//             if (onComplete) onComplete();
//         }
//     }, [onComplete]);

//     useEffect(() => {
//         if (!isRunning) return;

//         // Correct the displayed time immediately whenever the tab becomes
//         // visible again — covers the case where setInterval was fully
//         // suspended while the tab was hidden.
//         const handleVisibilityChange = () => {
//             if (document.visibilityState === "visible") {
//                 tick();
//             }
//         };

//         document.addEventListener("visibilitychange", handleVisibilityChange);
//         intervalRef.current = setInterval(tick, 1000);

//         return () => {
//             clearInterval(intervalRef.current);
//             document.removeEventListener("visibilitychange", handleVisibilityChange);
//         };
//     }, [isRunning, tick]);

//     const start = useCallback(() => {
//         setSecondsLeft((prevSeconds) => {
//             // Anchor end time based on whatever time is currently left
//             // (so Resume continues from where Pause left off).
//             endTimeRef.current = Date.now() + prevSeconds * 1000;
//             return prevSeconds;
//         });
//         setIsRunning(true);
//     }, []);

//     const pause = useCallback(() => {
//         if (endTimeRef.current) {
//             const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
//             setSecondsLeft(remaining);
//         }
//         clearInterval(intervalRef.current);
//         endTimeRef.current = null;
//         setIsRunning(false);
//     }, []);

//     const reset = useCallback(() => {
//         clearInterval(intervalRef.current);
//         endTimeRef.current = null;
//         setIsRunning(false);
//         setSecondsLeft(totalSeconds);
//     }, [totalSeconds]);

//     const minutes = Math.floor(secondsLeft / 60);
//     const seconds = secondsLeft % 60;
//     const progress = totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 0;

//     return {
//         secondsLeft,
//         minutes,
//         seconds,
//         isRunning,
//         progress,
//         start,
//         pause,
//         reset
//     };
// }


import { useState, useEffect, useRef, useCallback } from "react";

export function useTimer(durationInMinutes, onComplete) {
    const totalSeconds = durationInMinutes * 60;

    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef(null);
    // Timestamp (ms) at which the timer should hit zero. Anchoring to a
    // real clock time (instead of just decrementing a counter every tick)
    // means the countdown stays accurate even if the browser throttles or
    // pauses setInterval while the tab is in the background.
    const endTimeRef = useRef(null);
    // Set to true right before calling setDuration() as part of a recovery
    // flow, so the duration-change effect below skips its normal reset
    // instead of racing against the recovery's own state update.
    const skipNextResetRef = useRef(false);

    // Reset whenever the selected duration changes (e.g. user picks a new preset)
    useEffect(() => {
        if (skipNextResetRef.current) {
            skipNextResetRef.current = false;
            return;
        }
        clearInterval(intervalRef.current);
        endTimeRef.current = null;
        setSecondsLeft(durationInMinutes * 60);
        setIsRunning(false);
    }, [durationInMinutes]);

    const tick = useCallback(() => {
        if (!endTimeRef.current) return;
        const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
        setSecondsLeft(remaining);

        if (remaining <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            endTimeRef.current = null;
            if (onComplete) onComplete();
        }
    }, [onComplete]);

    useEffect(() => {
        if (!isRunning) return;

        // Correct the displayed time immediately whenever the tab becomes
        // visible again — covers the case where setInterval was fully
        // suspended while the tab was hidden.
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                tick();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        intervalRef.current = setInterval(tick, 1000);

        return () => {
            clearInterval(intervalRef.current);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isRunning, tick]);

    const start = useCallback(() => {
        setSecondsLeft((prevSeconds) => {
            // Anchor end time based on whatever time is currently left
            // (so Resume continues from where Pause left off).
            endTimeRef.current = Date.now() + prevSeconds * 1000;
            return prevSeconds;
        });
        setIsRunning(true);
    }, []);

    // Start the timer anchored to a specific remaining-seconds value —
    // used to recover an in-progress session after a reload/tab-discard,
    // where "remainingSeconds" is calculated from the backend's startedAt.
    const resumeFrom = useCallback((remainingSeconds) => {
        const clamped = Math.max(0, Math.round(remainingSeconds));
        endTimeRef.current = Date.now() + clamped * 1000;
        setSecondsLeft(clamped);
        setIsRunning(clamped > 0);
    }, []);

    // Like resumeFrom, but call this BEFORE any setDuration() that will
    // accompany the recovery (e.g. the recovered session used a different
    // duration than what's currently selected). Marks the upcoming
    // duration-change effect to skip its reset, then applies the recovered
    // remaining time directly — no setTimeout race involved.
    const recoverTo = useCallback((remainingSeconds) => {
        skipNextResetRef.current = true;
        const clamped = Math.max(0, Math.round(remainingSeconds));
        endTimeRef.current = Date.now() + clamped * 1000;
        setSecondsLeft(clamped);
        setIsRunning(clamped > 0);
    }, []);

    const pause = useCallback(() => {
        if (endTimeRef.current) {
            const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
            setSecondsLeft(remaining);
        }
        clearInterval(intervalRef.current);
        endTimeRef.current = null;
        setIsRunning(false);
    }, []);

    const reset = useCallback(() => {
        clearInterval(intervalRef.current);
        endTimeRef.current = null;
        setIsRunning(false);
        setSecondsLeft(totalSeconds);
    }, [totalSeconds]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const progress = totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 0;

    return {
        secondsLeft,
        minutes,
        seconds,
        isRunning,
        progress,
        start,
        pause,
        resumeFrom,
        recoverTo,
        reset
    };
}