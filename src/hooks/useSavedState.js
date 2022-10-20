import { useCallback, useState } from "react";

const ls = typeof localStorage !== "undefined" ? localStorage : { getItem: () => null, setItem: () => {} };

/**
 * @template T
 * @param {string} key
 * @param {T} defaultValue
 * @returns {[T, (newValue: T) => void]}
 */
export function useSavedState (key, defaultValue) {
    const [ state, setState ] = useState(() => {
        const saved = ls.getItem(key);

        if (saved === null) return defaultValue;

        try {
            return JSON.parse(saved);
        } catch (e) {
            return defaultValue;
        }
    });

    const saveState = useCallback((newState) => {
        setState(newState);

        ls.setItem(key, JSON.stringify(newState));
    }, [key, setState]);

    return [ state, saveState ];
}