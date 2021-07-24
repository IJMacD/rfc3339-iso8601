import './App.css';
import React, { useEffect, useState } from 'react';
import { format, formatUTC } from './format';
import Diagram from './Diagram';

const formats_rfc_only = [
  "%Y-%m-%d %H:%M:%SZ",
  "%Y-%m-%d_%H:%M:%SZ",
  "%Y-%m-%d %H:%M:%Sz",
  "%Y-%m-%d_%H:%M:%Sz",
  "%Y-%m-%d %H:%M:%S.%UZ",
  "%Y-%m-%d_%H:%M:%S.%UZ",
  "%Y-%m-%d %H:%M:%S.%Uz",
  "%Y-%m-%d_%H:%M:%S.%Uz",
  "%Y-%m-%d %H:%M:%S-00:00",
  "%Y-%m-%d %H:%M:%S.%U-00:00",
  "%Y-%m-%dT%H:%M:%S-00:00",
  "%Y-%m-%dT%H:%M:%S.%U-00:00",
];

const formats_both = [
  "%Y-%m-%d",
  "%H:%M:%SZ",
  "%Y-%m-%dT%H:%M:%SZ",
  "%Y-%m-%dt%H:%M:%SZ",
  "%Y-%m-%dT%H:%M:%S.%UZ",
  "%Y-%m-%dt%H:%M:%S.%UZ",
  "%Y-%m-%dT%H:%M:%S+00:00",
  "%Y-%m-%dt%H:%M:%S+00:00",
  "%Y-%m-%dT%H:%M:%S.%U+00:00",
  "%Y-%m-%dt%H:%M:%S.%U+00:00",
];

const full_date_formats = [
  "%Y-%m-%d",
  "%G-W%W-%w",
  "%Y-%o",
];

const time_formats = [
  "%H",
  "%H.5",
  "%H,5",
  "%H:%M",
  "%H:%M.5",
  "%H:%M,5",
  "%H:%M:%S",
  "%H:%M:%S.%U",
  "%H:%M:%S,%U",
];

const merged = mergeDatesWithTimes(full_date_formats, time_formats);
const mergedBasic = merged.map(s => s.replace(/[-:]/g, ""));

const formats_iso_only = [
  "%C",
  "%Y",
  "%Y-%m",
  "%Y-%o",
  "%Y-W%W",
  "%Y-W%W-%w",
  ...merged,
  ...mergedBasic,
];

function App() {
  const [ now, setNow ] = useState(() => new Date());

  useEffect(() => {
    const intervalID = setInterval(() => setNow(new Date()), 1000);
    return () => clearTimeout(intervalID);
  }, []);

  return (
    <div className="App">
      <Diagram date={now} />
      <p>This table is not exhaustive. Both formats are case-insensitive so every <code>T</code> and <code>Z</code> could be <code>t</code> and <code>z</code> respectively. See below the table for format definition.</p>
      <table className="App-FormatTable">
        <thead>
          <tr>
            <th>Format</th>
            <th>Now</th>
            <th>RFC 3339</th>
            <th>ISO 8601</th>
          </tr>
        </thead>
        <tbody>
          {
            formats_rfc_only.map(f => <tr key={f}><td><code>{f}</code></td><td>{formatUTC(f, now)}</td><td>✔️</td><td></td></tr>)
          }
          {
            formats_both.map(f => <tr key={f}><td><code>{f}</code></td><td>{formatUTC(f, now)}</td><td>✔️</td><td>✔️</td></tr>)
          }
          {
            [
              "%Y-%m-%dT%H−04:00",
              "%Y-%m-%dT%H:%M−04:00",
              "%Y-%m-%dT%H:%M:%S−04:00",
              "%Y-%m-%dT%H:%M:%S.%U−04:00",
              "%Y-%m-%dT%H:%M:%S,%U−04:00",
            ].map(f => <tr key={f}><td><code>{f}</code></td><td>{formatUTC(f, now, -4 * 60)}</td><td></td><td>✔️</td></tr>)
          }
          {
            formats_iso_only.map(f => <tr key={f}><td><code>{f}</code></td><td>{format(f, now)}</td><td></td><td>✔️</td></tr>)
          }
          {
            merged.map(f => <tr key={f}><td><code>{f}</code></td><td>{formatUTC(f, now)}Z</td><td></td><td>✔️</td></tr>)
          }
          {
            mergedBasic.map(f => <tr key={f}><td><code>{f}</code></td><td>{formatUTC(f, now)}Z</td><td></td><td>✔️</td></tr>)
          }
        </tbody>
      </table>
      <pre>
        <code>
          {`
%C - Century
%Y - Year
%m - Month
%d - Day
%G - Week Year
%W - Week
%w - Week Day
%o - Ordinal Day

%H - Hour
%M - Minute
%S - Second
%U - Millisecond

%Z - Zone Hour including +/-
%z - Zone Minute
`}
        </code>
      </pre>
    </div>
  );
}

export default App;

function mergeDatesWithTimes (dates, times) {
  const out = [];

  for (const d of dates) {
    for (const t of times) {
      out.push(`${d}T${t}`)
    }
  }

  return out;
}