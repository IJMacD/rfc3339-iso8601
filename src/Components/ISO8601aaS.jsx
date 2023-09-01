import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { JsonHighlighter } from "./JsonHighlighter";

const SERVICE_BASE = "https://iso8601aas.ijmacd.com";

const ENABLE_HIGHLIGHT = true;

export function ISO8601aaS () {
    const [ testValue, setTestValue ] = useState("");
    const [ result, setResult ] = useState(null);
    const debouncedTestValue = useDebounce(testValue, 500);

    useEffect(() => {
        let current = true;

        if (debouncedTestValue) {
            fetch(`${SERVICE_BASE}/${debouncedTestValue}`)
            .then(r => {
                if (r.ok) return r.json();
            })
            .then(d => {
                if (current) setResult(d);
            })
            .catch(() => setResult(null));
        }

        return () => { current = false; }
    }, [debouncedTestValue, setResult]);

    return (
        <div className="ToolBox-Card">
            <h2>ISO 8601 as a Service</h2>
            <p>
                <strong>Beta test</strong> a <a href={SERVICE_BASE}>service</a> to try parsing some ISO 8601 formats. <br/>
                <span className="hint">Only <b>Date</b>, <b>Time</b>, and <b>DateTime</b> are supported at the moment. There is no support for <b>Period</b> or <b>Range</b>.</span>
            </p>
            <label>
                <span style={{display: "block", fontSize: "0.8em", fontWeight: "bold"}}>Input String</span>
                <input placeholder="Input string" value={testValue} onChange={e => setTestValue(e.target.value)} />
            </label>
            {
                result &&
                <>
                    <span style={{display: "block", fontSize: "0.8em", fontWeight: "bold"}}>Result</span>
                    {
                        ENABLE_HIGHLIGHT ?
                            <JsonHighlighter data={result} /> :
                            <pre><code>{JSON.stringify(result, null, 4)}</code></pre>
                    }
                </>
            }
        </div>
    );
}