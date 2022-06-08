import { useState } from "react";
import { date as rfc_date, time as rfc_time, dateTime as rfc_dateTime } from "../formats/rfc";
import { date as iso_date, time as iso_time, dateTime as iso_dateTime, period as iso_period, range as iso_range } from "../formats/iso";
import { date as html_date, time as html_time, dateTime as html_dateTime, period as html_period } from "../formats/html";
import { formatAuto } from "../util/format";

export function CheckFormat ({ now, showHTML }) {
    const [ testValue, setTestValue ] = useState("%Y-%M-%D");

    const rfcStatus = testValue.length > 0 && (rfc_date.includes(testValue) ?
        "✔️ Date" :
        (
            rfc_time.includes(testValue) ?
            "✔️ Time" :
            (
                rfc_dateTime.includes(testValue) ?
                "✔️ Date" :
                "Invalid"
            )
        ));

    const isoStatus = testValue.length > 0 && (iso_date.includes(testValue) ?
        "✔️ Date" :
        (
            iso_time.includes(testValue) ?
            "✔️ Time" :
            (
                iso_dateTime.includes(testValue) ?
                "✔️ Date" :
                (
                    iso_period.includes(testValue) ?
                    "✔️ Period" :
                    (
                        iso_range.includes(testValue) ?
                        "✔️ Range" :
                        "Invalid"
                    )
                )
            )
        ));

    const htmlStatus = testValue.length > 0 && (html_date.includes(testValue) ?
        "✔️ Date" :
        (
            html_time.includes(testValue) ?
            "✔️ Time" :
            (
                html_dateTime.includes(testValue) ?
                "✔️ Date" :
                (
                    html_period.includes(testValue) ?
                    "✔️ Period" :
                    "Invalid"
                )
            )
        ));

    return (
        <div className="ToolBox-Card">
            <h2>Format Checker</h2>
            <p>
                Type a format using the format key above to check a format's validity.<br/>
                <span className="hint"><strong>Note</strong>: doesn't check all possible formats, only checks formats in the table.</span>
            </p>
            <label>
                <span style={{display: "block", fontSize: "0.8em", fontWeight: "bold"}}>Format</span>
                <input placeholder="%Y-%M-%D" value={testValue} onChange={e => setTestValue(e.target.value)} />
            </label>
            <span style={{ padding: "0.5em" }}>{formatAuto(testValue, now)}</span>
            <ul>
                <li>RFC 3339: {rfcStatus}</li>
                <li>ISO 8601: {isoStatus}</li>
                { showHTML && <li>HTML: {htmlStatus}</li> }
            </ul>
        </div>
    );
}