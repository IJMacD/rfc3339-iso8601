                //  31  28  31  30   31   30   31   31   30   31   30   31
const month_index = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

/**
 * @param {number} year
 */
export function isLeapYear(year) {
    return (year % 4 === 0 && (year % 400 === 0 || year % 100 !== 0));
}

/**
 * @param {Date} dt
 */
export function getYearDay(dt) {
    const leap_day = dt.getUTCMonth() > 1 && isLeapYear(dt.getUTCFullYear()) ? 1 : 0;
    return month_index[dt.getUTCMonth()] + dt.getUTCDate() + leap_day;
}

/**
 * @param {Date} d
 */
export function getMonthLength (d) {
    const m = d.getUTCMonth();
    if (m === 1) return isLeapYear(d.getUTCFullYear()) ? 29 : 28;
    return [31,,31,30,31,30,31,31,30,31,30,31][m];
}

/**
 * @param {Date} d
 */
export function getLastWeekInYear (d) {
    const d2 = new Date(d);
    d2.setUTCMonth(11);
    d2.setUTCDate(31);
    return getWeek(d2);
}

/**
 * Gives ISO Week Number for a given date. Week 1 is the first week the majority of days
 * in the new year. (Also the week with 4th January and the first Thursday of the year)
 *
 * Algorithm from https://www.tondering.dk/claus/cal/week.php
 * Uses UTC values
 * @param {Date} dt
 */
export function getWeek (dt) {
    let n, g, s;

    if (dt.getUTCMonth() < 2) {
        const a = dt.getUTCFullYear() - 1;
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = 0;
        const f = dt.getUTCDate() - 1 + int(31 * dt.getUTCMonth());
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }
    else {
        const a = dt.getUTCFullYear();
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = s + 1;
        const f = dt.getUTCDate() + int((153 * int(dt.getUTCMonth() - 2) + 2) / 5) + 58 + s;
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }

    if (n < 0) {
        return 53 - int((g - s) / 5);
    }
    else if (n > 364 + s) {
        return 1;
    }
    else {
        return int(n / 7) + 1;
    }
}


/**
 * Returns the ISO Week Year for the given date. The returned year may be
 * one lower, one higher, or the same as the calendar year.
 *
 * Algorithm from https://www.tondering.dk/claus/cal/week.php
 * Uses UTC values
 * @param {Date} dt
 */
export function getWeekYear (dt) {
    let n, g, s;

    if (dt.getUTCMonth() < 2) {
        const a = dt.getUTCFullYear() - 1;
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = 0;
        const f = dt.getUTCDate() - 1 + int(31 * dt.getUTCMonth());
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }
    else {
        const a = dt.getUTCFullYear();
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = s + 1;
        const f = dt.getUTCDate() + int((153 * int(dt.getUTCMonth() - 2) + 2) / 5) + 58 + s;
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }

    if (n < 0) {
        return dt.getUTCFullYear() - 1;
    }
    else if (n > 364 + s) {
        return dt.getUTCFullYear() + 1;
    }
    else {
        return dt.getUTCFullYear();
    }
}

/**
 * Return the ISO Week Day for a given date with 1 being Monday, 7 being Sunday
 *
 * Algorithm from https://www.tondering.dk/claus/cal/week.php
 * Uses UTC values
 * @param {Date} dt
 */
export function getWeekDay (dt) {
    let d;

    if (dt.getUTCMonth() < 2) {
        const a = dt.getUTCFullYear() - 1;
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const e = 0;
        const f = dt.getUTCDate() - 1 + int(31 * dt.getUTCMonth());
        const g = (a + b) % 7;
        d = (f + g - e) % 7;
    }
    else {
        const a = dt.getUTCFullYear();
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        const s = b - c;
        const e = s + 1;
        const f = dt.getUTCDate() + int((153 * int(dt.getUTCMonth() - 2) + 2) / 5) + 58 + s;
        const g = (a + b) % 7;
        d = (f + g - e) % 7;
    }

    return d + 1;
}

function int (n) {
    return n|0;
}