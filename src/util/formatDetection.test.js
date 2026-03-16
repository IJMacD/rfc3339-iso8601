import { whatIsThis, detectFormat, checkFormatSimple } from './formatDetection';

// Simple test cases to verify functionality
describe('Format Detection', () => {
    test('detects basic ISO 8601 datetime', () => {
        const result = detectFormat('2025-01-15T10:30:45Z');
        expect(result.isValid).toBe(true);
        expect(result.formats.length).toBeGreaterThan(0);
        expect(result.formats.some(f => f.standard === 'ISO 8601')).toBe(true);
    });

    test('detects RFC 3339 datetime', () => {
        const result = detectFormat('2025-01-15T10:30:45.123Z');
        expect(result.isValid).toBe(true);
        expect(result.formats.some(f => f.standard === 'RFC 3339')).toBe(true);
    });

    test('handles invalid date strings', () => {
        const result = detectFormat('2025/04\\03:15-22/4433');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('does not match any recognized date-time formats');
    });

    test('whatIsThis returns human readable output', () => {
        const result = whatIsThis('2025-01-15T10:30:45Z');
        expect(result).toContain('✅');
        expect(result).toContain('Parsed as:');
        expect(result).toContain('Matching formats:');
    });

    test('checkFormatSimple returns structured data', () => {
        const result = checkFormatSimple('2025-01-15T10:30:45Z');
        expect(result.valid).toBe(true);
        expect(result.epochMs).toBeDefined();
        expect(result.isoString).toBeDefined();
        expect(result.standards).toBeDefined();
    });
});

// Manual test function for development
export function runManualTests() {
    console.log('=== Manual Format Detection Tests ===');
    
    const testCases = [
        '2025-01-15T10:30:45Z',
        '2025-01-15T10:30:45.123Z',
        '2025-01-15 10:30:45',
        '2025-01-15',
        '10:30:45',
        'P1Y2M',
        '2025/04\\03:15-22/4433',
        'invalid-string',
        '+002025-01-15T10:30:45Z'
    ];

    testCases.forEach(testCase => {
        console.log(`\n--- Testing: "${testCase}" ---`);
        console.log(whatIsThis(testCase));
    });
}

// Uncomment to run manual tests
// runManualTests();