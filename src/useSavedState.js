import { useCallback, useState } from "react";

/**
 * @param {string} key
 * @param {any} defaultValue
 */
export function useSavedState (key, defaultValue) {
    const [ state, setState ] = useState(() => {
        const saved = localStorage.getItem(key);

        if (saved === null) return defaultValue;

        try {
            return JSON.parse(saved);
        } catch (e) {
            return defaultValue;
        }
    });

    const saveState = useCallback((newState) => {
        setState(newState);

        localStorage.setItem(key, JSON.stringify(newState));
    }, [key, setState]);

    return [ state, saveState ];
}