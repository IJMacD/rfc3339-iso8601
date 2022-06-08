import { useCallback, useState } from "react";

const ls = typeof localStorage !== "undefined" ? localStorage : { getItem: () => null, setItem: () => {} };

/**
 * @param {string} key
 * @param {any} defaultValue
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