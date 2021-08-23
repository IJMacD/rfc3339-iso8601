

//  31  28  31   30   31   30   31   31   30   31   30   31
const month_index = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

function isLeapYear(year) {
    return (year % 4 === 0 && (year % 400 === 0 || year % 100 !== 0));
}

export function getYearDay(dt) {
    const leap_day = dt.getMonth() > 1 && isLeapYear(dt.getFullYear()) ? 1 : 0;
    return month_index[dt.getMonth()] + dt.getDate() + leap_day;
}

/**
 * ISO Week Number
 * Algorithm from https://www.tondering.dk/claus/cal/week.php
 */
export function getWeek (dt) {
    let n, g, s;

    if (dt.getMonth() < 2) {
        const a = dt.getFullYear() - 1;
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = 0;
        const f = dt.getDate() - 1 + int(31 * dt.getMonth());
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }
    else {
        const a = dt.getFullYear();
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = s + 1;
        const f = dt.getDate() + int((153 * int(dt.getMonth() - 2) + 2) / 5) + 58 + s;
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
 * ISO Week Year
 * Algorithm from https://www.tondering.dk/claus/cal/week.php
 */
export function getWeekYear (dt) {
    let n, g, s;

    if (dt.getMonth() < 2) {
        const a = dt.getFullYear() - 1;
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = 0;
        const f = dt.getDate() - 1 + int(31 * dt.getMonth());
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }
    else {
        const a = dt.getFullYear();
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = s + 1;
        const f = dt.getDate() + int((153 * int(dt.getMonth() - 2) + 2) / 5) + 58 + s;
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }

    if (n < 0) {
        return dt.getFullYear() - 1;
    }
    else if (n > 364 + s) {
        return dt.getFullYear() + 1;
    }
    else {
        return dt.getFullYear();
    }
}

/**
 * ISO Week Number
 * Algorithm from https://www.tondering.dk/claus/cal/week.php
 */
export function getWeekDay (dt) {
    let d;

    if (dt.getMonth() < 2) {
        const a = dt.getFullYear() - 1;
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const e = 0;
        const f = dt.getDate() - 1 + int(31 * dt.getMonth());
        const g = (a + b) % 7;
        d = (f + g - e) % 7;
    }
    else {
        const a = dt.getFullYear();
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        const s = b - c;
        const e = s + 1;
        const f = dt.getDate() + int((153 * int(dt.getMonth() - 2) + 2) / 5) + 58 + s;
        const g = (a + b) % 7;
        d = (f + g - e) % 7;
    }

    return d + 1;
}

function int (n) {
    return n|0;
}