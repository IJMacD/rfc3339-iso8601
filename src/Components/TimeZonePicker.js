import React from "react";
import { getTimeZones } from 'iana-timezones'

export function TimeZonePicker ({ value, onChange }) {
    return (
        <div className="ToolBox-Card">
            <h2>Time Zone Switcher</h2>
            <p>Select a timezone to adjust zone for local dates and times.</p>
            <p>
                <select value={value} onChange={e => onChange(e.target.value)}>
                    <option value="">- Browser Default -</option>
                    {
                        getTimeZones().map(tz => <option key={tz}>{tz}</option>)
                    }
                </select>
            </p>
        </div>
    );
}