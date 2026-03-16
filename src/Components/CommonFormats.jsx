import React, { useMemo } from "react";
import commonFormatsData from "../data/commonFormats.json";

/**
 * Component that shows common non-standard datetime formats
 * Only displays formats that match the whatIsThis query
 * @param {Object} props
 * @param {string} props.whatIsThisQuery - The query string to match against
 */
export function CommonFormats({ whatIsThisQuery }) {
    // Simple pattern matching - check if the input roughly matches any of the example patterns
    const matchingFormats = useMemo(() => {
        if (!whatIsThisQuery || !whatIsThisQuery.trim()) {
            return [];
        }

        const query = whatIsThisQuery.trim();
        const matches = [];

        for (const format of commonFormatsData.formats) {
            // Check if the query matches any of the examples for this format
            const isMatch = format.examples.some(example => {
                return matchesPattern(query, example, format);
            });

            if (isMatch) {
                matches.push(format);
            }
        }

        return matches;
    }, [whatIsThisQuery]);

    if (matchingFormats.length === 0) {
        return null; // Don't show anything if no matches
    }

    return (
        <div style={{ 
            textAlign: "center", 
            maxWidth: "1400px", 
            margin: "2em auto",
            padding: "1em",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6", 
            borderRadius: "8px"
        }}>
            <h3 style={{ 
                color: "#dc3545", 
                marginTop: 0,
                marginBottom: "1em"
            }}>
                ⚠️ Matching non-RFC3339 and non-ISO8601 formats
            </h3>
            
            <p style={{ 
                fontSize: "0.9em", 
                color: "#666",
                marginBottom: "1.5em",
                fontStyle: "italic"
            }}>
                Your input matches these popular formats that are <strong>neither RFC 3339 nor ISO 8601</strong> compliant:
            </p>

            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(650px, 1fr))", 
                gap: "1em",
                textAlign: "left"
            }}>
                {matchingFormats.map((format, index) => (
                    <div key={index} style={{
                        backgroundColor: "white",
                        padding: "0.75em",
                        borderRadius: "6px",
                        border: "1px solid #e0e0e0",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                        {/* First line: Name, Pattern, Locale */}
                        <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "1em", 
                            marginBottom: "0.5em",
                            fontSize: "0.9em"
                        }}>
                            <h4 style={{ 
                                margin: "0", 
                                color: "#dc3545",
                                fontSize: "1em",
                                minWidth: "fit-content"
                            }}>
                                {format.name}
                            </h4>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75em", flex: 1 }}>
                                <span>
                                    <strong>Pattern:</strong> <code style={{ 
                                        backgroundColor: "#f1f3f4", 
                                        padding: "2px 6px",
                                        borderRadius: "3px",
                                        fontSize: "0.9em"
                                    }}>{format.pattern}</code>
                                </span>
                                
                                <span>
                                    <strong>Locale:</strong> <span style={{ 
                                        backgroundColor: "#e3f2fd", 
                                        padding: "2px 6px",
                                        borderRadius: "3px",
                                        fontSize: "0.85em"
                                    }}>{format.locale}</span>
                                </span>
                            </div>
                        </div>
                        
                        {/* Second line: Examples and Notes */}
                        <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "1em",
                            fontSize: "0.85em"
                        }}>
                            <div style={{ flex: 1 }}>
                                <strong>Examples:</strong>
                                {format.examples.map((example, exIdx) => (
                                    <span key={exIdx} style={{
                                        display: "inline-block",
                                        margin: "0 6px 0 4px",
                                        padding: "2px 6px",
                                        backgroundColor: matchesPattern(whatIsThisQuery, example, format) 
                                            ? "#ffebee" 
                                            : "#f8f9fa",
                                        border: matchesPattern(whatIsThisQuery, example, format)
                                            ? "1px solid #f44336"
                                            : "1px solid #dee2e6",
                                        borderRadius: "3px",
                                        fontFamily: "monospace",
                                        fontSize: "0.9em",
                                        fontWeight: matchesPattern(whatIsThisQuery, example, format)
                                            ? "bold"
                                            : "normal"
                                    }}>
                                        {example}
                                    </span>
                                ))}
                            </div>
                            
                            <div style={{ 
                                fontSize: "0.8em", 
                                color: "#666",
                                fontStyle: "italic",
                                minWidth: "fit-content",
                                maxWidth: "40%"
                            }}>
                                {format.notes}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p style={{ 
                fontSize: "0.8em", 
                color: "#666",
                marginTop: "1.5em",
                marginBottom: 0
            }}>
                💡 <strong>Tip:</strong> For international compatibility, consider using RFC 3339 or ISO 8601 formats instead.
            </p>
        </div>
    );
}

/**
 * Enhanced pattern matching using roundtrip validation with locale-aware formatting
 */
function matchesPattern(query, example, format) {
    if (!query || !example) return false;
    
    // Exact match
    if (query === example) return true;
    
    // Case insensitive match
    if (query.toLowerCase() === example.toLowerCase()) return true;
    
    // For timestamp patterns, check if query is a valid number in the right range
    if (format.pattern === "seconds" && /^\d{10}$/.test(query)) {
        const num = parseInt(query);
        return num >= -219753436800 && num < 253402300800; // Between 5000 BC and 9999 AD
    }
    
    if (format.pattern === "milliseconds" && /^\d{13}$/.test(query)) {
        const num = parseInt(query);
        return num >= -219753436800000 && num < 253402300800000; // Between 5000 BC and 9999 AD
    }
    
    if (format.pattern === "excel-serial" && /^\d{4,5}$/.test(query)) {
        const num = parseInt(query);
        return num >= 1 && num < 2958465; // Between 1900-01-01 and 9999-12-31 (Excel's limitation)
    }
    
    // Roundtrip test: parse query as Date, then see if it can be formatted to match the example
    try {
        const parsedDate = new Date(query);
        if (!isNaN(parsedDate.getTime())) {
            // For formats with specific locales, try to format back using that locale
            if (format.locale && !['excel', 'unix', 'js', 'sql', 'oracle'].includes(format.locale)) {
                try {
                    const formatter = new Intl.DateTimeFormat(format.locale, {
                        year: 'numeric',
                        month: 'short', 
                        day: 'numeric'
                    });
                    const formatted = formatter.format(parsedDate);
                    
                    // Check if the formatted result has similar structure to the query
                    const queryPattern = query.replace(/\d+/g, 'N').replace(/[a-zA-Z]+/g, 'L');
                    const formattedPattern = formatted.replace(/\d+/g, 'N').replace(/[a-zA-Z]+/g, 'L');
                    
                    if (queryPattern === formattedPattern) return true;
                } catch (localeError) {
                    // Fall through if locale formatting fails
                }
            }
        }
    } catch (error) {
        // Fall through to pattern matching if date parsing fails
    }
    
    // Pattern-based matching for other common formats
    // Remove common separators and spaces for comparison
    const normalizedQuery = query.replace(/[\s\-\/\.:]/g, '');
    const normalizedExample = example.replace(/[\s\-\/\.:]/g, '');
    
    // Length-based matching (crude but effective for many cases)
    if (normalizedQuery.length === normalizedExample.length) {
        // Check if they have similar digit/letter patterns
        const queryPattern = normalizedQuery.replace(/\d/g, 'D').replace(/[a-zA-Z]/g, 'L');
        const examplePattern = normalizedExample.replace(/\d/g, 'D').replace(/[a-zA-Z]/g, 'L');
        
        if (queryPattern === examplePattern) return true;
    }
    
    return false;
}