import { getFormatsAsArrays } from "./formatExtractor";
import { formatAuto, setFractionalSeconds } from "./format";

/**
 * Attempts to parse a date-time string and identify its format type
 * Uses two-way validation: string -> Date -> string to ensure accuracy
 * @param {string} input - The input date-time string to analyze
 * @returns {Object} Detection result with format info and validation
 */
export function detectFormat(input) {
    if (!input || typeof input !== 'string') {
        return {
            isValid: false,
            message: "No input provided or invalid input type",
            formats: []
        };
    }

    const trimmedInput = input.trim();
    if (!trimmedInput) {
        return {
            isValid: false,
            message: "Empty input string",
            formats: []
        };
    }

    // Try to parse the input as a Date
    const parsedDate = new Date(trimmedInput);
    
    // Check if parsing resulted in a valid date
    if (isNaN(parsedDate.getTime())) {
        return {
            isValid: false,
            message: "Input does not match any recognized date-time formats",
            formats: []
        };
    }

    // Get all formats from the centralized extractor (avoiding DRY violations)
    const allFormats = getFormatsAsArrays();
    const detectedFormats = [];
    
    // Test RFC 3339 formats (all formats from formal definitions and diagram)
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.rfc.dateTime, 'RFC 3339', 'DateTime', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.rfc.date, 'RFC 3339', 'Date', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.rfc.time, 'RFC 3339', 'Time', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.rfc.period, 'RFC 3339', 'Period', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.rfc.range, 'RFC 3339', 'Range', detectedFormats);
    
    // Test ISO 8601 formats (all formats from formal definitions and diagram)
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.iso.dateTime, 'ISO 8601', 'DateTime', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.iso.date, 'ISO 8601', 'Date', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.iso.time, 'ISO 8601', 'Time', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.iso.period, 'ISO 8601', 'Period', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.iso.range, 'ISO 8601', 'Range', detectedFormats);
    
    // Test HTML formats (all formats from formal definitions and diagram)
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.html.dateTime, 'HTML', 'DateTime', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.html.date, 'HTML', 'Date', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.html.time, 'HTML', 'Time', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.html.period, 'HTML', 'Period', detectedFormats);
    testFormatsAgainstInput(trimmedInput, parsedDate, allFormats.html.range, 'HTML', 'Range', detectedFormats);

    if (detectedFormats.length === 0) {
        return {
            isValid: true,
            parsedDate: parsedDate,
            message: `Parsed as valid date (${parsedDate.toISOString()}) but doesn't match any predefined RFC 3339, ISO 8601, or HTML formats`,
            formats: []
        };
    }

    return {
        isValid: true,
        parsedDate: parsedDate,
        message: `Successfully identified ${detectedFormats.length} matching format${detectedFormats.length > 1 ? 's' : ''}`,
        formats: detectedFormats
    };
}

/**
 * Tests a list of format patterns against the input string
 * @param {string} input - Original input string
 * @param {Date} parsedDate - Parsed Date object
 * @param {string[]} formatList - Array of format patterns to test
 * @param {string} standard - Standard name (RFC 3339, ISO 8601, HTML)
 * @param {string} type - Format type (Date, Time, DateTime, Period, Range)
 * @param {Array} results - Array to push successful matches to
 */
function testFormatsAgainstInput(input, parsedDate, formatList, standard, type, results) {
    for (const formatPattern of formatList) {
        try {
            // Set fractional seconds based on the input date's milliseconds
            const fractionalSeconds = parsedDate.getUTCMilliseconds() / 1000;
            setFractionalSeconds(fractionalSeconds);
            
            // Generate a string using this format pattern
            const formatted = formatAuto(formatPattern, parsedDate);
            
            // Check if the formatted string matches the input
            // We need to handle some variations like case-insensitivity for T/Z
            if (normalizeForComparison(formatted) === normalizeForComparison(input)) {
                results.push({
                    standard: standard,
                    type: type,
                    format: formatPattern,
                    formatted: formatted,
                    exactMatch: formatted === input
                });
            }
        } catch (error) {
            // Skip formats that cause errors
            continue;
        }
    }
}

/**
 * Normalizes strings for comparison by handling case variations
 * @param {string} str - String to normalize
 * @returns {string} Normalized string
 */
function normalizeForComparison(str) {
    // Handle case insensitivity for T/Z as mentioned in RFC 3339
    return str.toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Provides a human-readable analysis of the input string
 * @param {string} input - The input date-time string to analyze
 * @returns {string} Human-readable analysis
 */
export function whatIsThis(input) {
    const detection = detectFormat(input);
    
    if (!detection.isValid) {
        return `❌ "${input}" - ${detection.message}`;
    }

    if (detection.formats.length === 0) {
        return `⚠️  "${input}" - ${detection.message}`;
    }

    const lines = [`✅ "${input}" - ${detection.message}`];
    lines.push(`   Parsed as: ${detection.parsedDate.toISOString()}`);
    lines.push(`   Epoch milliseconds: ${detection.parsedDate.getTime()}`);
    lines.push('');
    lines.push('   Matching formats:');
    
    // Group by standard
    const byStandard = detection.formats.reduce((acc, format) => {
        if (!acc[format.standard]) acc[format.standard] = [];
        acc[format.standard].push(format);
        return acc;
    }, {});

    for (const [standard, formats] of Object.entries(byStandard)) {
        lines.push(`   📋 ${standard}:`);
        for (const format of formats) {
            const exactStr = format.exactMatch ? '' : ' (case/whitespace variation)';
            lines.push(`     • ${format.type}: ${format.format}${exactStr}`);
        }
    }

    return lines.join('\n');
}

/**
 * Simple format checker that returns just the standards and types
 * @param {string} input - The input date-time string to check
 * @returns {Object} Simple result object
 */
export function checkFormatSimple(input) {
    const detection = detectFormat(input);
    
    if (!detection.isValid) {
        return {
            valid: false,
            message: detection.message,
            standards: {}
        };
    }

    if (detection.formats.length === 0) {
        return {
            valid: true,
            parsedAsDate: true,
            message: "Valid date but no matching standard formats",
            standards: {}
        };
    }

    const standards = {};
    for (const format of detection.formats) {
        if (!standards[format.standard]) {
            standards[format.standard] = new Set();
        }
        standards[format.standard].add(format.type);
    }

    // Convert Sets to Arrays for JSON serialization
    for (const standard in standards) {
        standards[standard] = Array.from(standards[standard]);
    }

    return {
        valid: true,
        epochMs: detection.parsedDate.getTime(),
        isoString: detection.parsedDate.toISOString(),
        standards: standards
    };
}