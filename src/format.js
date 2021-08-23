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
 * @param {Date} [d]
 */
 export function format(format, d = new Date()) {
    let fraction = "";

    return format.replace(/%(−?)([.,]\d)?([a-z])/ig, (m, u, w, s) => {
        if (w) {
            const dot = w[0];
            const precision = +w[1];

            switch (s) {
                case "N": fraction = frac(((d.getFullYear() % 1000)/1000), precision).substr(1);     break;
                case "C": fraction = frac(((d.getFullYear() % 100)/100), precision).substr(1);       break;
                case "D": fraction = frac(((d.getFullYear() % 10)/10), precision).substr(1);         break;
                case "Y": fraction = frac((d.getMonth() / 12), precision).substr(1);                 break;
                case "m": fraction = frac(((d.getDate() - 1)/(365/12)), precision).substr(1);        break;
                case "d": fraction = frac((d.getHours() / 24), precision).substr(1);                 break;
                case "G": fraction = frac((datetime.getWeek(d)/52), precision).substr(1);            break;
                case "W": fraction = frac(((datetime.getWeekDay(d) - 1) / 7), precision).substr(1);  break;
                case "w": fraction = frac((d.getHours() / 24), precision).substr(1);                 break;
                case "o": fraction = frac((d.getHours() / 24), precision).substr(1);                 break;
                case "H": fraction = frac((d.getMinutes() / 60), precision).substr(1);               break;
                case "M": fraction = frac((d.getSeconds() / 60), precision).substr(1);               break;
                case "S": fraction = frac((d.getMilliseconds() / 1000), precision).substr(1);        break;
                case "U": fraction = 0..toFixed(precision).substr(1);                                break;
                case "Z": fraction = "";   break;
                case "z": fraction = "";   break;
                default: fraction = "";
            }

            fraction = fraction.replace(".", dot);
        }

        switch (s) {
            case "N": return ((d.getFullYear() / 1000)|0).toString()                    + fraction;
            case "C": return ((d.getFullYear() / 100)|0).toString().padStart(2, "0")    + fraction;
            case "D": return ((d.getFullYear() / 10)|0).toString().padStart(3, "0")     + fraction;
            case "Y": return d.getFullYear().toString().padStart(4, "0")                + fraction;
            case "m": return pad2(d.getMonth() + 1)                                     + fraction;
            case "d": return pad2(d.getDate())                                          + fraction;
            case "G": return datetime.getWeekYear(d).toString().padStart(2, "0")        + fraction;
            case "W": return pad2(datetime.getWeek(d))                                  + fraction;
            case "w": return datetime.getWeekDay(d).toString()                          + fraction;
            case "o": return datetime.getYearDay(d).toString().padStart(3, "0")         + fraction;
            case "H": return pad2(d.getHours())                                         + fraction;
            case "M": return pad2(d.getMinutes())                                       + fraction;
            case "S": return pad2(d.getSeconds())                                       + fraction;
            case "U": return d.getMilliseconds().toString().padStart(3, "0")            + fraction;
            case "Z": {
                const zH = -(d.getTimezoneOffset() / 60)|0;
                return `${zH < 0 ? (u || "−") : "+"}${Math.abs(zH).toString().padStart(2, "0")}`;
            }
            case "z": {
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
    let fraction = "";

    return format.replace(/%(−?)(.\d)?([a-z])/ig, (m, u, w, s) => {
        if (w) {
            const dot = w[0];
            const precision = +w[1];
            switch (s) {
                case "N": fraction = frac(((d.getUTCFullYear() % 1000)/1000), precision).substr(1);     break;
                case "C": fraction = frac(((d.getUTCFullYear() % 100)/100), precision).substr(1);       break;
                case "D": fraction = frac(((d.getUTCFullYear() % 10)/10), precision).substr(1);         break;
                case "Y": fraction = frac((d.getUTCMonth() / 12), precision).substr(1);                 break;
                case "m": fraction = frac(((d.getUTCDate() - 1)/(365/12)), precision).substr(1);        break;
                case "d": fraction = frac((d.getUTCHours() / 24), precision).substr(1);                 break;
                case "G": fraction = frac((datetime.getWeek(d)/52), precision).substr(1);               break;
                case "W": fraction = frac(((datetime.getWeekDay(d) - 1) / 7), precision).substr(1);     break;
                case "w": fraction = frac((d.getUTCHours() / 24), precision).substr(1);                 break;
                case "o": fraction = frac((d.getUTCHours() / 24), precision).substr(1);                 break;
                case "H": fraction = frac((d.getUTCMinutes() / 60), precision).substr(1);               break;
                case "M": fraction = frac((d.getUTCSeconds() / 60), precision).substr(1);               break;
                case "S": fraction = frac((d.getUTCMilliseconds() / 1000), precision).substr(1);        break;
                case "U": fraction = 0..toFixed(precision).substr(1);                                   break;
                case "Z": fraction = "";   break;
                case "z": fraction = "";   break;
                default: fraction = "";
            }

            fraction = fraction.replace(".", dot);
        }

        switch (s) {
            case "N": return ((d.getUTCFullYear() / 1000)|0).toString()                    + fraction;
            case "C": return ((d.getUTCFullYear() / 100)|0).toString().padStart(2, "0")    + fraction;
            case "D": return ((d.getUTCFullYear() / 10)|0).toString().padStart(3, "0")     + fraction;
            case "Y": return d.getUTCFullYear().toString().padStart(4, "0")                + fraction;
            case "m": return pad2(d.getUTCMonth() + 1)                                     + fraction;
            case "d": return pad2(d.getUTCDate())                                          + fraction;
            case "G": return datetime.getWeekYear(d).toString().padStart(2, "0")           + fraction;
            case "W": return pad2(datetime.getWeek(d))                                     + fraction;
            case "w": return datetime.getWeekDay(d).toString()                             + fraction;
            case "o": return datetime.getYearDay(d).toString().padStart(3, "0")            + fraction;
            case "H": return pad2(d.getUTCHours())                                         + fraction;
            case "M": return pad2(d.getUTCMinutes())                                       + fraction;
            case "S": return pad2(d.getUTCSeconds())                                       + fraction;
            case "U": return d.getUTCMilliseconds().toString().padStart(3, "0")            + fraction;
            case "Z": {
                const zH = -(timezoneOffset / 60)|0;
                return `${zH < 0 ? "+" : (u || "-")}${Math.abs(zH).toString().padStart(2, "0")}`;
            }
            case "z": {
                const zM = timezoneOffset % 60;
                return Math.abs(zM).toString().padStart(2, "0");
            }
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

function frac (n, precision) {
    const exp = 10 ** precision;
    return (Math.floor(n * exp) / exp).toFixed(precision);
}