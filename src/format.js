import * as datetime from './date';

/**
 * %C - Century
 * %Y - Year
 * %m - Month
 * %d - Day
 * %G - Week Year
 * %W - Week
 * %w - Week Day
 * %o - Ordinal Day
 *
 * %H - Hour
 * %M - Minute
 * %S - Second
 * %U - Millisecond
 *
 * %Z - Zone Hour including +/-
 * %z - Zone Minute
 */

/**
 * @param {string} format
 * @param {Date} [date]
 * @param {number} [timezoneOffset] minutes
 */
export function format(format, date = new Date(), timezoneOffset = 0) {
    const d = timezoneOffset !== 0 ? new Date(+date + timezoneOffset * 60 * 1000) : date;

    return format.replace(/%[a-z]/ig, m => {
        switch (m) {
            case "%C": return ((d.getFullYear() / 100)|0).toString().padStart(2, "0");
            case "%Y": return d.getFullYear().toString().padStart(4, "0");
            case "%m": return pad2(d.getMonth() + 1);
            case "%d": return pad2(d.getDate());
            case "%G": return datetime.getWeekYear(d).toString().padStart(2, "0");
            case "%W": return pad2(datetime.getWeek(d));
            case "%w": return datetime.getWeekDay(d).toString();
            case "%o": return datetime.getYearDay(d).toString().padStart(3, "0");
            case "%H": return pad2(d.getHours());
            case "%M": return pad2(d.getMinutes());
            case "%S": return pad2(d.getSeconds());
            case "%U": return d.getMilliseconds().toString().padStart(3, "0");
            case "%Z": {
                const zH = -(d.getTimezoneOffset() / 60)|0;
                return `${zH < 0 ? "−" : "+"}${Math.abs(zH).toString().padStart(2, "0")}`;
            }
            case "%z": {
                const zM = d.getTimezoneOffset() % 60;
                return Math.abs(zM).toString().padStart(2, "0");
            }
            default: return m;
        }
    });
}

/**
 * @param {string} format
 * @param {Date} [date]
 * @param {number} [timezoneOffset] minutes
 */
export function formatUTC(format, date = new Date(), timezoneOffset = 0) {
    const d = timezoneOffset !== 0 ? new Date(+date + timezoneOffset * 60 * 1000) : date;

    return format.replace(/%[a-z]/ig, m => {
        switch (m) {
            case "%C": return ((d.getUTCFullYear() / 100)|0).toString().padStart(2, "0");
            case "%Y": return d.getUTCFullYear().toString().padStart(4, "0");
            case "%m": return pad2(d.getUTCMonth() + 1);
            case "%d": return pad2(d.getUTCDate());
            case "%G": return datetime.getWeekYear(d).toString().padStart(2, "0");
            case "%W": return pad2(datetime.getWeek(d));
            case "%w": return datetime.getWeekDay(d).toString();
            case "%o": return datetime.getYearDay(d).toString().padStart(3, "0");
            case "%H": return pad2(d.getUTCHours());
            case "%M": return pad2(d.getUTCMinutes());
            case "%S": return pad2(d.getUTCSeconds());
            case "%U": return d.getUTCMilliseconds().toString().padStart(3, "0");
            case "%Z": return "Z";
            case "%z": return "";
            default: return m;
        }
    });
}

/**
 * @param {number} n
 */
function pad2(n) {
    return n.toString().padStart(2, "0");
}
