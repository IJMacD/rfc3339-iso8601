import * as datetime from './date';

/**
 * %C - Century
 * %Y - Year
 * %m - Month
 * %d - Day
 * %V - Week Year
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
 */
export function format(format, date = new Date()) {
    return formatUTC(format, date, -date.getTimezoneOffset());
}

/**
 * Takes timezone from the format automatically
 * @param {string} format
 * @param {Date} [date]
 */
export function formatAuto(format, date = new Date()) {
    const empty = format.replace(/%(−?)(.\d)?([a-z])/ig, "");

    let timezoneOffset = -date.getTimezoneOffset();

    if (empty.match(/Z$/i)) {
        timezoneOffset = 0;
    } else {
        const match = /([-+−])(\d{2}):?(\d{2})?$/.exec(empty);
        if (match) {
            const sign = match[1] === "+";
            const hours = +match[2];
            const minutes = match[3] ? +match[3] : 0;

            timezoneOffset = (sign ? 1 : -1) * ((hours * 60) + minutes);
        }
    }

    return formatUTC(format, date, timezoneOffset);
}

/**
 * @param {string} format
 * @param {Date} [date]
 * @param {number} [timezoneOffset] minutes
 */
export function formatUTC(format, date = new Date(), timezoneOffset = 0) {
    // timezoneOffset === NaN: use local time
    if (isNaN(timezoneOffset)) timezoneOffset = -date.getTimezoneOffset();

    const d = timezoneOffset !== 0 ? new Date(+date + timezoneOffset * 60 * 1000) : date;
    let fraction = "";

    return format.replace(/%(−?)(.\d)?([a-z])/ig, (m, u, w, s) => {
        if (w) {
            const dot = w[0];
            const precision = +w[1];
            switch (s) {
                case "L": fraction = frac(((d.getUTCFullYear() % 1000)/1000), precision).substr(1);     break;
                case "C": fraction = frac(((d.getUTCFullYear() % 100)/100), precision).substr(1);       break;
                case "X": fraction = frac(((d.getUTCFullYear() % 10)/10), precision).substr(1);         break;
                case "Y": fraction = frac((d.getUTCMonth() / 12), precision).substr(1);                 break;
                case "M": fraction = frac(((d.getUTCDate() - 1)/(365/12)), precision).substr(1);        break;
                case "D": fraction = frac((d.getUTCHours() / 24), precision).substr(1);                 break;
                case "V": fraction = frac((datetime.getWeek(d)/52), precision).substr(1);               break;
                case "W": fraction = frac(((datetime.getWeekDay(d) - 1) / 7), precision).substr(1);     break;
                case "w": fraction = frac((d.getUTCHours() / 24), precision).substr(1);                 break;
                case "O": fraction = frac((d.getUTCHours() / 24), precision).substr(1);                 break;
                case "h": fraction = frac((d.getUTCMinutes() / 60), precision).substr(1);               break;
                case "m": fraction = frac((d.getUTCSeconds() / 60), precision).substr(1);               break;
                case "s": fraction = frac((d.getUTCMilliseconds() / 1000), precision).substr(1);        break;
                case "u": fraction = 0..toFixed(precision).substr(1);                                   break;
                case "Z": fraction = "";   break;
                case "z": fraction = "";   break;
                default: fraction = "";
            }

            fraction = fraction.replace(".", dot);
        }

        switch (s) {
            case "L": return ((d.getUTCFullYear() / 1000)|0).toString()                    + fraction;
            case "C": return ((d.getUTCFullYear() / 100)|0).toString().padStart(2, "0")    + fraction;
            case "X": return ((d.getUTCFullYear() / 10)|0).toString().padStart(3, "0")     + fraction;
            case "Y": return d.getUTCFullYear().toString().padStart(4, "0")                + fraction;
            case "M": return pad2(d.getUTCMonth() + 1)                                     + fraction;
            case "D": return pad2(d.getUTCDate())                                          + fraction;
            case "V": return datetime.getWeekYear(d).toString().padStart(2, "0")           + fraction;
            case "W": return pad2(datetime.getWeek(d))                                     + fraction;
            case "w": return datetime.getWeekDay(d).toString()                             + fraction;
            case "O": return datetime.getYearDay(d).toString().padStart(3, "0")            + fraction;
            case "h": return pad2(d.getUTCHours())                                         + fraction;
            case "m": return pad2(d.getUTCMinutes())                                       + fraction;
            case "s": return pad2(d.getUTCSeconds())                                       + fraction;
            case "u": return (d.getUTCMilliseconds()*1000).toString().padStart(6, "0")     + fraction;
            case "Z": {
                const zH = -(timezoneOffset / 60)|0;
                return `${zH <= 0 ? "+" : (u || "-")}${Math.abs(zH).toString().padStart(2, "0")}`;
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