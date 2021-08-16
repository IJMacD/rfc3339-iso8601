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

const formats_both_utc = [
  "%Y-%m-%d",
  "%H:%M:%SZ",
  "%Y-%m-%dT%H:%M:%SZ",
  "%Y-%m-%dT%H:%M:%S.%UZ",
  "%Y-%m-%dT%H:%M:%S+00:00",
  "%Y-%m-%dT%H:%M:%S.%U+00:00",
];

const formats_both_local = [
  "%Y-%m-%dT%H:%M:%S%Z:%z",
  "%Y-%m-%dT%H:%M:%S.%U%Z:%z",
];

const full_date_formats = [
  "%Y-%m-%d",
  "%G-W%W-%w",
  "%Y-%o",
];

const time_formats = [
  "%H",
  "%H,5",
  "%H.5",
  "%H:%M",
  "%H:%M,5",
  "%H:%M.5",
  "%H:%M:%S",
  "%H:%M:%S,%U",
  "%H:%M:%S.%U",
];

const merged = mergeDatesWithTimes(full_date_formats, time_formats);
const mergedBasic = merged.map(s => s.replace(/[-:]/g, ""));
const mergedBoth = [ ...merged, ...mergedBasic ];

const formats_negative = [
  "%Y-%m-%dT%H:%M:%S-04:00",
  "%Y-%m-%dT%H:%M:%S.%U-04:00",
];

const formats_negative_2212 = [
  "%Y-%m-%dT%H−04:00",
  "%Y-%m-%dT%H:%M−04:00",
  "%Y-%m-%dT%H:%M:%S−04:00",
  "%Y-%m-%dT%H:%M:%S,%U−04:00",
  "%Y-%m-%dT%H:%M:%S.%U−04:00",
];

const formats_iso_only = [
  "%C",
  "%Y",
  "%Y-%m",
  "%Y-%o",
  "%Y-W%W",
  "%Y-W%W-%w",
  "%Y%o",
  "%YW%W",
  "%YW%W%w",
  ...time_formats,
  ...time_formats.map(s => "T" + s),
  ...mergedBoth,
  ...mergedBoth.map(s => s + "%Z"),
  ...merged.map(s => s + "%Z:%z"),
  ...mergedBasic.map(s => s + "%Z%z"),
].filter(s => !formats_both_local.includes(s));

function App() {
  const [ now, setNow ] = useState(() => new Date());

  useEffect(() => {
    const intervalID = setInterval(() => setNow(new Date()), 1000);
    return () => clearTimeout(intervalID);
  }, []);

  return (
    <div className="App">
      <h1>RFC 3339 vs ISO 8601</h1>
      <Diagram date={now} />
      <h2>Format Listing</h2>
      <p>Notes:
        <ul>
          <li>This table is not exhaustive.</li>
          <li>Both formats are case-insensitive so every <code>T</code>, <code>W</code>, <code>P</code>, <code>R</code>, and <code>Z</code> could be <code>t</code>, <code>w</code>, <code>p</code>, <code>r</code>, or <code>z</code> respectively.</li>
          <li>RFC 3339 allows for other characters to replace the <code>T</code> but only gives examples using a space character.</li>
          <li>ISO 8601 allows decimal fractions for the smallest time value. These are just represented by <code>,5</code> and <code>.5</code> due to a limitation of the formatter.</li>
          <li>ISO 8601 prefers commas to dots for decimal separation but they are interchangeable in all formats.</li>
          <li>The format key is given below the table.</li>
        </ul>
      </p>
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
            formats_rfc_only.map(f => <ExampleRow key={f} format={f} now={now} utc rfc />)
          }
          {
            formats_both_utc.map(f => <ExampleRow key={f} format={f} now={now} utc rfc iso />)
          }
          {
            formats_both_local.map(f => <ExampleRow key={f} format={f} now={now} rfc iso />)
          }
          {
            formats_negative.map(f => <ExampleRow key={f} format={f} now={now} timezone={-4 * 60} utc rfc iso />)
          }
          {
            formats_negative_2212.map(f => <ExampleRow key={f} format={f} now={now} timezone={-4 * 60} utc iso />)
          }
          {
            formats_iso_only.map(f => <ExampleRow key={f} format={f} now={now} iso />)
          }
        </tbody>
      </table>
      <h3>Format Key</h3>
      <pre style={{backgroundColor:"#F4F4F4"}}>
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
      <p><a href="https://github.com/IJMacD/rfc3339-iso8601">Source on GitHub</a></p>
    </div>
  );
}

export default App;

function ExampleRow ({ format: formatString, now, utc = false, timezone = 0, rfc = false, iso = false }) {
  return <tr>
    <td><code>{formatString}</code></td>
    <td>{utc?formatUTC(formatString, now, timezone):format(formatString, now, timezone)}</td>
    <td>{ rfc && "✔️" }</td>
    <td>{ iso && "✔️" }</td>
  </tr>;
}

function mergeDatesWithTimes (dates, times) {
  const out = [];

  for (const d of dates) {
    for (const t of times) {
      out.push(`${d}T${t}`)
    }
  }

  return out;
}