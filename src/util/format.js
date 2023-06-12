import * as datetime from './date';

// Spoof milliseconds/microseconds
let FRACTIONAL_SECONDS = Math.random();

/**
 * @param {number} f
 */
export function setFractionalSeconds (f) {
    FRACTIONAL_SECONDS = f;
}

/**
 *  %L - Millennium
 *  %C - Century
 *  %X - Decade
 *  %Y - Year
 *  %M - Month
 *  %D - Day
 *  %V - Week Year
 *  %W - Week
 *  %w - Week Day
 *  %O - Ordinal Day

 *  %h - Hour
 *  %m - Minute
 *  %s - Second
 *  %u - Microsecond

 *  %Z - Zone Hour including +/-
 *  %z - Zone Minute

 *  %[,.]3x - Value including fraction with given precision, using either comma or dot.
 *  %−Z     - Use U+2212 for negative timezone hours (ISO recommended)
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
 * @param {number} [timezoneOffset]
 */
export function formatAuto(format, date = new Date(), timezoneOffset = -date.getTimezoneOffset()) {
    const empty = format.replace(/%(−?)(.\d+)?([a-z])/ig, "");

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

    return format.replace(/%(−?)(.\d+)?([a-z])/ig, (m, u, w, s) => {
        let fraction = "";

        if (w) {
            const dot = w[0];
            const precision = +w.substring(1);

            // To support far too many digits of precision, use milliseconds in the fraction
            const dayMs = +d % 86400000;
            const dayFrac = dayMs / 86400000;

            switch (s) {
                case "L": fraction = frac(((d.getUTCFullYear() % 1000)/1000), precision);               break;
                case "C": fraction = frac(((d.getUTCFullYear() % 100)/100), precision);                 break;
                case "X": fraction = frac(((d.getUTCFullYear() % 10)/10), precision);                   break;
                case "Y":
                    const yearDay = datetime.getYearDay(d) - 1;
                    const yearLength = datetime.isLeapYear(d.getUTCFullYear()) ? 366: 365;
                    fraction = frac((yearDay + dayFrac)/(yearLength), precision);
                    break;
                case "M":
                    const monthDay = d.getUTCDate() - 1;
                    const monthLength = datetime.getMonthLength(d);
                    fraction = frac((monthDay + dayFrac)/monthLength, precision);
                    break;
                case "D": fraction = frac(dayFrac, precision);                                          break;
                case "V":
                    const weekNum = datetime.getWeek(d) - 1;
                    const totalWeeks = datetime.getLastWeekInYear(d);
                    const day = datetime.getWeekDay(d) + dayFrac;
                    fraction = frac((weekNum + day / 7)/totalWeeks, precision);
                    break;
                case "W": fraction = frac(((datetime.getWeekDay(d) - 1 + dayFrac) / 7), precision);     break;
                case "w": fraction = frac(dayFrac, precision);                                          break;
                case "O": fraction = frac(dayFrac, precision);                                          break;
                case "h": fraction = frac((dayMs % 3600000) / 3600000, precision);                      break;
                case "m": fraction = frac((dayMs % 60000) / 60000, precision);                          break;
                case "s": fraction = frac(FRACTIONAL_SECONDS, precision);                               break;
                // We said precise, not necessarily accurate
                case "u": fraction = ((FRACTIONAL_SECONDS * 1e6)%1).toFixed(precision);                 break;
                case "Z":
                case "z":
                default:
                    // NOP
            }

            // Use replace() for cases where fraction is still empty string 
            fraction = fraction.substring(1).replace(".", dot);
        }

        switch (s) {
            case "L": return ((d.getUTCFullYear() / 1000)|0).toString()                    + fraction;
            case "C": return pad2((d.getUTCFullYear() / 100)|0)                            + fraction;
            case "X": return pad3((d.getUTCFullYear() / 10)|0)                             + fraction;
            case "Y": return pad4(d.getUTCFullYear())                                      + fraction;
            case "M": return pad2(d.getUTCMonth() + 1)                                     + fraction;
            case "D": return pad2(d.getUTCDate())                                          + fraction;
            case "V": return pad4(datetime.getWeekYear(d))                                 + fraction;
            case "W": return pad2(datetime.getWeek(d))                                     + fraction;
            case "w": return datetime.getWeekDay(d).toString()                             + fraction;
            case "O": return pad3(datetime.getYearDay(d))                                  + fraction;
            case "h": return pad2(d.getUTCHours())                                         + fraction;
            case "m": return pad2(d.getUTCMinutes())                                       + fraction;
            case "s": return pad2(d.getUTCSeconds())                                       + fraction;
            case "u": return Math.round(FRACTIONAL_SECONDS*1e6).toString().padStart(6,"0") + fraction;
            case "Z": {
                const zH = -(timezoneOffset / 60)|0;
                return `${zH <= 0 ? "+" : (u || "-")}${pad2(Math.abs(zH))}`;
            }
            case "z": {
                const zM = timezoneOffset % 60;
                return pad2(Math.abs(zM));
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

/**
 * @param {number} n
 */
function pad3(n) {
    return n.toString().padStart(3, "0");
}

/**
 * @param {number} n
 */
function pad4(n) {
    return n.toString().padStart(4, "0");
}

function frac (n, precision) {
    const exp = 10 ** precision;
    return (Math.floor(n * exp) / exp).toFixed(precision);
}