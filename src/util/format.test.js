import { formatUTC } from "./format";

describe("Individual format specifiers", () => {
    test("Millennium", () => {
        expect(formatUTC("%L", new Date("2000-01-01T00:00:00Z"))).toBe("2");
        expect(formatUTC("%L", new Date("3000-01-01T00:00:00Z"))).toBe("3");
        expect(formatUTC("%L", new Date("1999-12-31T23:59:59.999Z"))).toBe("1");
    });

    test("Century", () => {
        expect(formatUTC("%C", new Date("2000-01-01T00:00:00Z"))).toBe("20");
        expect(formatUTC("%C", new Date("3000-01-01T00:00:00Z"))).toBe("30");
        expect(formatUTC("%C", new Date("1999-12-31T23:59:59.999Z"))).toBe("19");
    });

    test("Decade", () => {
        expect(formatUTC("%X", new Date("2000-01-01T00:00:00Z"))).toBe("200");
        expect(formatUTC("%X", new Date("3000-01-01T00:00:00Z"))).toBe("300");
        expect(formatUTC("%X", new Date("1999-12-31T23:59:59.999Z"))).toBe("199");
    });

    test("Year", () => {
        expect(formatUTC("%Y", new Date("2000-01-01T00:00:00Z"))).toBe("2000");
        expect(formatUTC("%Y", new Date("3000-01-01T00:00:00Z"))).toBe("3000");
        expect(formatUTC("%Y", new Date("1999-12-31T23:59:59.999Z"))).toBe("1999");
    });

    test("Month", () => {
        expect(formatUTC("%M", new Date("2000-01-01T00:00:00Z"))).toBe("01");
        expect(formatUTC("%M", new Date("3000-01-01T00:00:00Z"))).toBe("01");
        expect(formatUTC("%M", new Date("1999-12-31T23:59:59.999Z"))).toBe("12");
    });

    test("Day", () => {
        expect(formatUTC("%D", new Date("2000-01-01T00:00:00Z"))).toBe("01");
        expect(formatUTC("%D", new Date("3000-01-01T00:00:00Z"))).toBe("01");
        expect(formatUTC("%D", new Date("1999-12-31T23:59:59.999Z"))).toBe("31");
    });

    test("Week Year", () => {
        expect(formatUTC("%V", new Date("2000-01-01T00:00:00Z"))).toBe("1999");
        expect(formatUTC("%V", new Date("3000-01-01T00:00:00Z"))).toBe("3000");
        expect(formatUTC("%V", new Date("1999-12-31T23:59:59.999Z"))).toBe("1999");
    });

    test("Week", () => {
        expect(formatUTC("%W", new Date("2000-01-01T00:00:00Z"))).toBe("52");
        expect(formatUTC("%W", new Date("3000-01-01T00:00:00Z"))).toBe("01");
        expect(formatUTC("%W", new Date("1999-12-31T23:59:59.999Z"))).toBe("52");
    });

    test("Week Day", () => {
        expect(formatUTC("%w", new Date("2000-01-01T00:00:00Z"))).toBe("6");
        expect(formatUTC("%w", new Date("3000-01-01T00:00:00Z"))).toBe("3");
        expect(formatUTC("%w", new Date("1999-12-31T23:59:59.999Z"))).toBe("5");
        // Leap Year
        expect(formatUTC("%w", new Date("2000-03-01T00:00:00Z"))).toBe("3");
        // Leap Year
        expect(formatUTC("%w", new Date("2004-03-01T00:00:00Z"))).toBe("1");
        // Non-Leap Year
        expect(formatUTC("%w", new Date("2100-03-01T00:00:00Z"))).toBe("1");
    });

    test("Year Day", () => {
        expect(formatUTC("%O", new Date("2000-01-01T00:00:00Z"))).toBe("001");
        expect(formatUTC("%O", new Date("3000-01-01T00:00:00Z"))).toBe("001");
        expect(formatUTC("%O", new Date("1999-12-31T23:59:59.999Z"))).toBe("365");
        // Leap Year
        expect(formatUTC("%O", new Date("2000-03-01T00:00:00Z"))).toBe("061");
        // Non-Leap Year
        expect(formatUTC("%O", new Date("2001-03-01T00:00:00Z"))).toBe("060");
        // Leap Year
        expect(formatUTC("%O", new Date("2004-03-01T00:00:00Z"))).toBe("061");
        // Non-Leap Year
        expect(formatUTC("%O", new Date("2100-03-01T00:00:00Z"))).toBe("060");
    });

    test("Hour", () => {
        expect(formatUTC("%h", new Date("2000-01-01T00:00:00Z"))).toBe("00");
        expect(formatUTC("%h", new Date("3000-01-01T00:00:00Z"))).toBe("00");
        expect(formatUTC("%h", new Date("1999-12-31T23:59:59.999Z"))).toBe("23");
    });

    test("Minute", () => {
        expect(formatUTC("%m", new Date("2000-01-01T00:00:00Z"))).toBe("00");
        expect(formatUTC("%m", new Date("3000-01-01T00:00:00Z"))).toBe("00");
        expect(formatUTC("%m", new Date("1999-12-31T23:59:59.999Z"))).toBe("59");
    });

    test("Seconds", () => {
        expect(formatUTC("%s", new Date("2000-01-01T00:00:00Z"))).toBe("00");
        expect(formatUTC("%s", new Date("3000-01-01T00:00:00Z"))).toBe("00");
        expect(formatUTC("%s", new Date("1999-12-31T23:59:59.999Z"))).toBe("59");
    });

    test("Microseconds", () => {
        expect(formatUTC("%u", new Date("2000-01-01T00:00:00Z"))).toBe("000000");
        expect(formatUTC("%u", new Date("3000-01-01T00:00:00Z"))).toBe("000000");
        expect(formatUTC("%u", new Date("1999-12-31T23:59:59.999Z"))).toBe("999000");
    });

    test("Zone Hours", () => {
        expect(formatUTC("%Z", new Date("2000-01-01T00:00:00Z"))).toBe("+00");
    });

    test("Zone minutes", () => {
        expect(formatUTC("%z", new Date("2000-01-01T00:00:00Z"))).toBe("00");
    });

});

describe("Fractional format specifiers", () => {
    test("Millennium", () => {
        expect(formatUTC("%.1L", new Date("2000-01-01T00:00:00Z"))).toBe("2.0");
        expect(formatUTC("%.1L", new Date("3000-01-01T00:00:00Z"))).toBe("3.0");
        expect(formatUTC("%.1L", new Date("1999-12-31T23:59:59.999Z"))).toBe("1.9");
        expect(formatUTC("%.1L", new Date("2500-12-31T23:59:59.999Z"))).toBe("2.5");
    });

    test("Century", () => {
        expect(formatUTC("%.1C", new Date("2000-01-01T00:00:00Z"))).toBe("20.0");
        expect(formatUTC("%.1C", new Date("3000-01-01T00:00:00Z"))).toBe("30.0");
        expect(formatUTC("%.1C", new Date("1999-12-31T23:59:59.999Z"))).toBe("19.9");
        expect(formatUTC("%.1C", new Date("2050-12-31T23:59:59.999Z"))).toBe("20.5");
    });

    test("Decade", () => {
        expect(formatUTC("%.1X", new Date("2000-01-01T00:00:00Z"))).toBe("200.0");
        expect(formatUTC("%.1X", new Date("3000-01-01T00:00:00Z"))).toBe("300.0");
        expect(formatUTC("%.1X", new Date("1999-12-31T23:59:59.999Z"))).toBe("199.9");
        expect(formatUTC("%.1X", new Date("2005-12-31T23:59:59.999Z"))).toBe("200.5");
    });

    test("Year", () => {
        expect(formatUTC("%.1Y", new Date("2000-01-01T00:00:00Z"))).toBe("2000.0");
        expect(formatUTC("%.1Y", new Date("3000-01-01T00:00:00Z"))).toBe("3000.0");
        expect(formatUTC("%.1Y", new Date("1999-12-31T23:59:59.999Z"))).toBe("1999.9");
        expect(formatUTC("%.1Y", new Date("2000-07-02T00:00:00Z"))).toBe("2000.5");

        expect(formatUTC("%.3Y", new Date("2000-01-01T00:00:00Z"))).toBe("2000.000");
        expect(formatUTC("%.3Y", new Date("3000-01-01T00:00:00Z"))).toBe("3000.000");
        expect(formatUTC("%.3Y", new Date("1999-12-31T23:59:59.999Z"))).toBe("1999.999");
        expect(formatUTC("%.3Y", new Date("2000-07-02T00:00:00Z"))).toBe("2000.500");
    });

    test("Month", () => {
        expect(formatUTC("%.1M", new Date("2000-01-01T00:00:00Z"))).toBe("01.0");
        expect(formatUTC("%.1M", new Date("3000-01-01T00:00:00Z"))).toBe("01.0");
        expect(formatUTC("%.1M", new Date("1999-12-31T23:59:59.999Z"))).toBe("12.9");
        expect(formatUTC("%.1M", new Date("2000-07-12T00:00:00Z"))).toBe("07.3");

        expect(formatUTC("%.3M", new Date("2000-01-01T00:00:00Z"))).toBe("01.000");
        expect(formatUTC("%.3M", new Date("3000-01-01T00:00:00Z"))).toBe("01.000");
        expect(formatUTC("%.3M", new Date("1999-12-31T23:59:59.999Z"))).toBe("12.999");
        expect(formatUTC("%.3M", new Date("2000-06-16T00:00:00Z"))).toBe("06.500");
    });

    test("Day", () => {
        expect(formatUTC("%.1D", new Date("2000-01-01T00:00:00Z"))).toBe("01.0");
        expect(formatUTC("%.1D", new Date("3000-01-01T00:00:00Z"))).toBe("01.0");
        expect(formatUTC("%.1D", new Date("1999-12-31T23:59:59.999Z"))).toBe("31.9");
        expect(formatUTC("%.1D", new Date("2000-07-12T08:00:00Z"))).toBe("12.3");

        expect(formatUTC("%.3D", new Date("2000-01-01T00:00:00Z"))).toBe("01.000");
        expect(formatUTC("%.3D", new Date("3000-01-01T00:00:00Z"))).toBe("01.000");
        expect(formatUTC("%.3D", new Date("1999-12-31T23:59:59.999Z"))).toBe("31.999");
        expect(formatUTC("%.3D", new Date("2000-06-16T16:00:00Z"))).toBe("16.666");
    });

    test("Week Year", () => {
        expect(formatUTC("%.1V", new Date("2000-01-01T00:00:00Z"))).toBe("1999.9");
        expect(formatUTC("%.1V", new Date("3000-01-01T00:00:00Z"))).toBe("3000.4");
        expect(formatUTC("%.1V", new Date("1999-12-31T23:59:59.999Z"))).toBe("1999.9");
        expect(formatUTC("%.1V", new Date("2000-07-12T08:00:00Z"))).toBe("2000.5");

        expect(formatUTC("%.3V", new Date("2000-01-01T00:00:00Z"))).toBe("1999.997");
        expect(formatUTC("%.3V", new Date("3000-01-01T00:00:00Z"))).toBe("3000.428");
        expect(formatUTC("%.3V", new Date("1999-12-31T23:59:59.999Z"))).toBe("1999.997");
        expect(formatUTC("%.3V", new Date("2000-07-02T00:00:00Z"))).toBe("2000.500");
    });

    test("Week", () => {
        expect(formatUTC("%.1W", new Date("2000-01-01T00:00:00Z"))).toBe("52.7");
        expect(formatUTC("%.1W", new Date("3000-01-01T00:00:00Z"))).toBe("01.2");
        expect(formatUTC("%.1W", new Date("1999-12-31T23:59:59.999Z"))).toBe("52.7");
        expect(formatUTC("%.1W", new Date("2000-07-12T08:00:00Z"))).toBe("28.3");

        expect(formatUTC("%.3W", new Date("2000-01-01T00:00:00Z"))).toBe("52.714");
        expect(formatUTC("%.3W", new Date("3000-01-01T00:00:00Z"))).toBe("01.285");
        expect(formatUTC("%.3W", new Date("1999-12-31T23:59:59.999Z"))).toBe("52.714");
        expect(formatUTC("%.3W", new Date("2000-06-16T16:00:00Z"))).toBe("24.666");
    });

    test("Week Day", () => {
        expect(formatUTC("%.1w", new Date("2000-01-01T00:00:00Z"))).toBe("6.0");
        expect(formatUTC("%.1w", new Date("3000-01-01T00:00:00Z"))).toBe("3.0");
        expect(formatUTC("%.1w", new Date("1999-12-31T23:59:59.999Z"))).toBe("5.9");
        expect(formatUTC("%.1w", new Date("2000-07-12T08:00:00Z"))).toBe("3.3");

        expect(formatUTC("%.3w", new Date("2000-01-01T00:00:00Z"))).toBe("6.000");
        expect(formatUTC("%.3w", new Date("3000-01-01T00:00:00Z"))).toBe("3.000");
        expect(formatUTC("%.3w", new Date("1999-12-31T23:59:59.999Z"))).toBe("5.999");
        expect(formatUTC("%.3w", new Date("2000-06-16T16:00:00Z"))).toBe("5.666");
    });

    test("Hour", () => {
        expect(formatUTC("%.1h", new Date("2000-01-01T00:00:00Z"))).toBe("00.0");
        expect(formatUTC("%.1h", new Date("3000-01-01T00:00:00Z"))).toBe("00.0");
        expect(formatUTC("%.1h", new Date("1999-12-31T23:59:59.999Z"))).toBe("23.9");

        expect(formatUTC("%.3h", new Date("2000-01-01T00:00:00Z"))).toBe("00.000");
        expect(formatUTC("%.3h", new Date("3000-01-01T00:00:00Z"))).toBe("00.000");
        expect(formatUTC("%.3h", new Date("1999-12-31T23:59:59.999Z"))).toBe("23.999");
    });

    test("Minute", () => {
        expect(formatUTC("%.1m", new Date("2000-01-01T00:00:00Z"))).toBe("00.0");
        expect(formatUTC("%.1m", new Date("3000-01-01T00:00:00Z"))).toBe("00.0");
        expect(formatUTC("%.1m", new Date("1999-12-31T23:59:59.999Z"))).toBe("59.9");

        expect(formatUTC("%.3m", new Date("2000-01-01T00:00:00Z"))).toBe("00.000");
        expect(formatUTC("%.3m", new Date("3000-01-01T00:00:00Z"))).toBe("00.000");
        expect(formatUTC("%.3m", new Date("1999-12-31T23:59:59.999Z"))).toBe("59.999");
    });

    test("Seconds", () => {
        expect(formatUTC("%.1s", new Date("2000-01-01T00:00:00Z"))).toBe("00.0");
        expect(formatUTC("%.1s", new Date("3000-01-01T00:00:00Z"))).toBe("00.0");
        expect(formatUTC("%.1s", new Date("1999-12-31T23:59:59.999Z"))).toBe("59.9");

        expect(formatUTC("%.3s", new Date("2000-01-01T00:00:00Z"))).toBe("00.000");
        expect(formatUTC("%.3s", new Date("3000-01-01T00:00:00Z"))).toBe("00.000");
        expect(formatUTC("%.3s", new Date("1999-12-31T23:59:59.999Z"))).toBe("59.999");
    });

    test("Microseconds", () => {
        expect(formatUTC("%.1u", new Date("2000-01-01T00:00:00Z"))).toBe("000000.0");
        expect(formatUTC("%.1u", new Date("3000-01-01T00:00:00Z"))).toBe("000000.0");
        expect(formatUTC("%.1u", new Date("1999-12-31T23:59:59.999Z"))).toBe("999000.0");

        expect(formatUTC("%.3u", new Date("2000-01-01T00:00:00Z"))).toBe("000000.000");
        expect(formatUTC("%.3u", new Date("3000-01-01T00:00:00Z"))).toBe("000000.000");
        expect(formatUTC("%.3u", new Date("1999-12-31T23:59:59.999Z"))).toBe("999000.000");
    });

    test("Comma", () => {
        expect(formatUTC("%,3h", new Date("2000-01-01T00:00:00Z"))).toBe("00,000");
    });
});

describe("Combined formats", () => {
    test("Space", () => {
        expect(formatUTC("%Y %M", new Date("2000-01-01T00:00:00Z"))).toBe("2000 01");
    });

    test("No Space", () => {
        expect(formatUTC("%Y%M", new Date("2000-01-01T00:00:00Z"))).toBe("200001");
    });

    test("Hyphen", () => {
        expect(formatUTC("%Y-%M", new Date("2000-01-01T00:00:00Z"))).toBe("2000-01");
    });
});

describe("Non-format characters", () => {
    test("Punctuation", () => {
        expect(formatUTC("+-_%:")).toBe("+-_%:");
    });

    test("letters", () => {
        expect(formatUTC("abc YMD hms HMS")).toBe("abc YMD hms HMS");
    });

    test("numbers", () => {
        expect(formatUTC("000 123 999")).toBe("000 123 999");
    });

    test("unrecognised specifier", () => {
        expect(formatUTC("%a %b %c %-E %F %.1G")).toBe("%a %b %c %-E %F %.1G");
    });

    test("Combined", () => {
        expect(formatUTC("Year: %Y and Month: %M", new Date("2000-01-01T00:00:00Z"))).toBe("Year: 2000 and Month: 01");
    });
})