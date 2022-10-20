/**
 * @param {string} timeZone IANA timezone name e.g. Europe/London
 * @returns {number|undefined} offset in minutes
 */
export function getCurrentTimezoneOffset (timeZone) {
    if (timeZone.length === 0) return void 0;
    try {
        const formatted = Intl.DateTimeFormat([], { timeZone, timeZoneName: "longOffset" }).format(new Date());
        const zoneString = formatted.substring(formatted.length - 6);
        const parts = zoneString.split(":").map(p => +p);

        // If sign is zero we must set to 1 to preserve minutes
        const sign = Math.sign(parts[0]) || 1;

        return parts[0] * 60 + sign * parts[1];
    } catch (e) {
        return void 0;
    }
}

export function getBrowserTimezone () {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    catch (e) {
        return void 0;
    }
}