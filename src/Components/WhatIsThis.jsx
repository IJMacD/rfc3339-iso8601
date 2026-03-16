import React, { useState, useEffect } from "react";
import { whatIsThis, checkFormatSimple } from "../util/formatDetection";

export function WhatIsThis() {
    // Check for URL hash parameter on component mount
    const getInitialValue = () => {
        const hash = window.location.hash;
        const whatIsThisMatch = hash.match(/[#&]whatIsThis=([^&]+)/);
        if (whatIsThisMatch) {
            return decodeURIComponent(whatIsThisMatch[1]);
        }
        return "2025/04\\03:15-22/4433";
    };

    const [inputValue, setInputValue] = useState(getInitialValue());
    const [result, setResult] = useState("");
    const [simpleResult, setSimpleResult] = useState(null);

    // Auto-analyze the initial value and when URL changes
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const whatIsThisMatch = hash.match(/[#&]whatIsThis=([^&]+)/);
            if (whatIsThisMatch) {
                const newValue = decodeURIComponent(whatIsThisMatch[1]);
                setInputValue(newValue);
                analyzeValue(newValue);
            }
        };

        // Analyze initial value
        if (inputValue) {
            analyzeValue(inputValue);
        }

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []); // Empty dependency array for mount-only effect

    const analyzeValue = (value) => {
        if (value && value.trim()) {
            const analysis = whatIsThis(value);
            const simple = checkFormatSimple(value);
            setResult(analysis);
            setSimpleResult(simple);
            console.log("What Is This Analysis:", analysis);
            console.log("Simple Result:", simple);
        } else {
            setResult("");
            setSimpleResult(null);
        }
    };

    const handleAnalyze = () => {
        if (!inputValue.trim()) {
            setResult("Please enter a date-time string to analyze.");
            setSimpleResult(null);
            return;
        }

        const analysis = whatIsThis(inputValue);
        const simple = checkFormatSimple(inputValue);
        
        setResult(analysis);
        setSimpleResult(simple);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        analyzeValue(value);
    };

    const handleExampleClick = (example) => {
        setInputValue(example);
        analyzeValue(example);
    };

    const examples = [
        "2025/04\\03:15-22/4433",
        "2025-01-15T10:30:45Z",
        "2025-01-15T10:30:45.123Z", 
        "2025-01-15 10:30:45",
        "2025-01-15",
        "10:30:45",
        "2025-01-15T10:30:45+05:30",
        "20250115T103045Z",
        "invalid-date-string"
    ];

    return (
        <div className="ToolBox-Card">
            <h2>What Is This? - Date Format Detective</h2>
            <p>
                Enter any date-time string and this tool will analyze it, attempt to parse it, 
                and identify which RFC 3339, ISO 8601, or HTML standards it matches.
            </p>
            
            <div style={{ marginBottom: "1em" }}>
                <label>
                    <span style={{ display: "block", fontSize: "0.8em", fontWeight: "bold", marginBottom: "0.25em" }}>
                        Date-Time String to Analyze
                    </span>
                    <input 
                        type="text"
                        placeholder="Enter date-time string (e.g., 2025-01-15T10:30:45Z)"
                        value={inputValue}
                        onChange={handleInputChange}
                        style={{ 
                            width: "100%", 
                            padding: "0.5em",
                            fontFamily: "monospace",
                            fontSize: "1em"
                        }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: "1em" }}>
                <strong>Try these examples:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5em", marginTop: "0.5em" }}>
                    {examples.map((example, index) => (
                        <button
                            key={index}
                            onClick={() => handleExampleClick(example)}
                            style={{
                                padding: "0.25em 0.5em",
                                fontSize: "0.8em",
                                fontFamily: "monospace",
                                backgroundColor: "#f0f0f0",
                                border: "1px solid #ccc",
                                borderRadius: "3px",
                                cursor: "pointer"
                            }}
                        >
                            {example}
                        </button>
                    ))}
                </div>
            </div>

            {result && (
                <div style={{ 
                    marginTop: "1em", 
                    padding: "1em", 
                    backgroundColor: "#f9f9f9", 
                    border: "1px solid #ddd",
                    borderRadius: "4px"
                }}>
                    <h3>Analysis Result:</h3>
                    <pre style={{ 
                        fontFamily: "monospace", 
                        fontSize: "0.9em",
                        whiteSpace: "pre-wrap",
                        margin: 0,
                        lineHeight: "1.4"
                    }}>
                        {result}
                    </pre>
                    
                    {simpleResult && simpleResult.valid && (
                        <div style={{ marginTop: "1em", fontSize: "0.9em" }}>
                            <h4>Quick Summary:</h4>
                            <ul style={{ margin: "0.5em 0", paddingLeft: "1.5em" }}>
                                {simpleResult.epochMs && (
                                    <li><strong>Epoch milliseconds:</strong> {simpleResult.epochMs}</li>
                                )}
                                {simpleResult.isoString && (
                                    <li><strong>ISO String:</strong> {simpleResult.isoString}</li>
                                )}
                                {Object.entries(simpleResult.standards).length > 0 && (
                                    <li>
                                        <strong>Standards:</strong>
                                        <ul style={{ marginTop: "0.25em" }}>
                                            {Object.entries(simpleResult.standards).map(([standard, types]) => (
                                                <li key={standard}>
                                                    <strong>{standard}:</strong> {types.join(", ")}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}