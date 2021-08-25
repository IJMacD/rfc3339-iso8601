import './App.css';
import React, { useEffect, useState } from 'react';
import { format, formatUTC } from './format';
import Diagram from './Diagram';

const time_formats_rfc_only = [
  "%H:%M:%S-00:00",
  "%H:%M:%.3S-00:00",
];

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

const date_formats_both_utc = [
  "%Y-%m-%d",
];

const time_formats_both_utc = [
  "%H:%M:%SZ",
  "%H:%M:%.3SZ",
  "%H:%M:%S+00:00",
  "%H:%M:%.3S+00:00",
];

const time_formats_both_local = [
  "%H:%M:%S%Z:%z",
  "%H:%M:%.3S%Z:%z",
];

const formats_both_utc = [
  "%Y-%m-%dT%H:%M:%SZ",
  "%Y-%m-%dT%H:%M:%.3SZ",
  "%Y-%m-%dT%H:%M:%S+00:00",
  "%Y-%m-%dT%H:%M:%.3S+00:00",
];

const formats_both_local = [
  "%Y-%m-%dT%H:%M:%S%Z:%z",
  "%Y-%m-%dT%H:%M:%.3S%Z:%z",
];

const full_date_formats = [
  "%Y-%m-%d",
  "%G-W%W-%w",
  "%Y-%o",
];

const basic_time_formats_iso_only = [
  "%H",
  "%,1H",
  "%.1H",
  "%H:%M",
  "%H:%,1M",
  "%H:%.1M",
  "%H:%M:%S",
  "%H:%M:%,3S",
  "%H:%M:%.3S",
];

const time_formats_iso_only = [
  ...basic_time_formats_iso_only,
  ...basic_time_formats_iso_only.map(s => "T" + s),
];

const merged = crossJoin(full_date_formats, basic_time_formats_iso_only).map(([d,t]) => `${d}T${t}`);
const mergedBasic = merged.map(s => s.replace(/[-:]/g, ""));
const mergedBoth = [ ...merged, ...mergedBasic ];

const formats_negative = [
  "%Y-%m-%dT%H:%M:%S%Z:%z",
  "%Y-%m-%dT%H:%M:%.3S%Z:%z",
];

const formats_negative_2212 = [
  "%Y-%m-%dT%H%−Z",
  "%Y-%m-%dT%H:%M%−Z",
  "%Y-%m-%dT%H:%M:%S%−Z",
  "%Y-%m-%dT%H:%M:%S,%U%−Z",
  "%Y-%m-%dT%H:%M:%S.%U%−Z",
  "%Y-%m-%dT%H%−Z:%z",
  "%Y-%m-%dT%H:%M%−Z:%z",
  "%Y-%m-%dT%H:%M:%S%−Z:%z",
  "%Y-%m-%dT%H:%M:%S,%U%−Z:%z",
  "%Y-%m-%dT%H:%M:%S.%U%−Z:%z",
  "%Y%m%dT%H%−Z",
  "%Y%m%dT%H%M%−Z",
  "%Y%m%dT%H%M%S%−Z",
  "%Y%m%dT%H%M%S,%U%−Z",
  "%Y%m%dT%H%M%S.%U%−Z",
  "%Y%m%dT%H%−Z%z",
  "%Y%m%dT%H%M%−Z%z",
  "%Y%m%dT%H%M%S%−Z%z",
  "%Y%m%dT%H%M%S,%U%−Z%z",
  "%Y%m%dT%H%M%S.%U%−Z%z",
];

const date_formats_iso_only = [
  "%N",
  "%C",
  "%D",
  "%Y",
  "%Y-%m",
  "%Y-%o",
  "%G-W%W",
  "%G-W%W-%w",
  "%Y%o",
  "%GW%W",
  "%GW%W%w",
];

const formats_iso_only = [
  ...mergedBoth,
  ...mergedBoth.map(s => s + "%Z"),
  ...merged.map(s => s + "%Z:%z"),
  ...mergedBasic.map(s => s + "%Z%z"),
].filter(s => !formats_both_local.includes(s));

const periods = [
  "P1Y",
  "P1,5Y",
  "P1.5Y",
  "P1M",
  "P1,5M",
  "P1.5M",
  "P1W",
  "P1D",
  "PT1H",
  "PT1M",
  "PT1S",
  "P1Y1M",
  "P1Y1D",
  "P1Y1M1D",
  "P1DT1H",
  "P1MT1M",
  "P1DT1M",
  "P1WT1M",
  "P1WT1M1S",
];

const example_periods = [
  "P1Y",
  "P1M",
  "P1D",
];

const ranges = [
  ...crossJoin(full_date_formats, example_periods).map(([d,p]) => `${d}/${p}`),
  ...crossJoin(full_date_formats, full_date_formats).map(([d1,d2]) => `${d1}/${d2}`),
  ...crossJoin(example_periods, full_date_formats).map(([p,d]) => `${p}/${d}`),

  ...crossJoin(merged, ["P1DT1H"]).map(([d,p]) => `${d}/${p}`),

  ...crossJoin(full_date_formats, ["P1Y"]).map(([d,p]) => `R/${d}/${p}`),
  ...crossJoin(full_date_formats, full_date_formats).map(([d1,d2]) => `R/${d1}/${d2}`),

  ...crossJoin(full_date_formats, ["P1Y"]).map(([d,p]) => `R10/${d}/${p}`),
  ...crossJoin(full_date_formats, full_date_formats).map(([d1,d2]) => `R10/${d1}/${d2}`),
];

function App() {
  const [ now, setNow ] = useState(() => new Date());

  useEffect(() => {
    const intervalID = setInterval(() => setNow(new Date()), 1000);
    return () => clearTimeout(intervalID);
  }, []);

  /** @type {import('react').CSSProperties} */
  const sectionHeaderStyle = {
    background: "#E5E5E5",
    textAlign: "left",
  };

  return (
    <div className="App">
      <h1>RFC 3339 vs ISO 8601</h1>
      <Diagram date={now} />
      <h2>Format Listing</h2>
      <p>Notes:</p>
      <ul>
        <li>This table is not exhaustive.</li>
        <li>Both formats are case-insensitive so every <code>T</code>, <code>W</code>, <code>P</code>, <code>R</code>, and <code>Z</code> could be <code>t</code>, <code>w</code>, <code>p</code>, <code>r</code>, or <code>z</code> respectively.</li>
        <li>RFC 3339 allows for other characters to replace the <code>T</code> but only gives examples using a space character.</li>
        <li>ISO 8601 allows decimal fractions of the smallest time value. These are represented here by a single fractional digit but the standard allows arbitrary precision.</li>
        <li>ISO 8601 prefers commas to dots for decimal separation but they are interchangeable in all formats.</li>
        <li>ISO 8601 recommends U+2212 MINUS "−" for timezones west of Greenwich. The formatter defaults to U+2D HYPHEN MINUS "-" which is valid under both standards.</li>
        <li>The format key is given below the table.</li>
      </ul>
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
          <tr><th colSpan={4} style={sectionHeaderStyle}>Dates</th></tr>
          {
            date_formats_both_utc.map(f => <ExampleRow key={f} format={f} now={now} timezone={0} rfc iso />)
          }
          {
            date_formats_iso_only.map(f => <ExampleRow key={f} format={f} now={now} iso />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={4} style={sectionHeaderStyle}>Times</th></tr>
          {
            time_formats_rfc_only.map(f => <ExampleRow key={f} format={f} now={now} timezone={0} rfc />)
          }
          {
            time_formats_both_utc.map(f => <ExampleRow key={f} format={f} now={now} timezone={0} rfc iso />)
          }
          {
            time_formats_both_local.map(f => <ExampleRow key={f} format={f} now={now} rfc iso />)
          }
          {
            time_formats_iso_only.map(f => <ExampleRow key={f} format={f} now={now} iso />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={4} style={sectionHeaderStyle}>Date-Times</th></tr>
          {
            formats_rfc_only.map(f => <ExampleRow key={f} format={f} now={now} timezone={0} rfc />)
          }
          {
            formats_both_utc.map(f => <ExampleRow key={f} format={f} now={now} timezone={0} rfc iso />)
          }
          {
            formats_both_local.map(f => <ExampleRow key={f} format={f} now={now} rfc iso />)
          }
          {
            formats_negative.map(f => <ExampleRow key={f} format={f} now={now} timezone={-4 * 60} rfc iso />)
          }
          {
            formats_negative_2212.map(f => <ExampleRow key={f} format={f} now={now} timezone={-4 * 60} iso />)
          }
          {
            formats_iso_only.map(f => <ExampleRow key={f} format={f} now={now} iso />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={4} style={sectionHeaderStyle}>Periods</th></tr>
          {
            periods.map(f => <ExampleRow key={f} format={f} now={now} iso />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={4} style={sectionHeaderStyle}>Ranges</th></tr>
          {
            ranges.map(f => <ExampleRow key={f} format={f} now={now} iso />)
          }
        </tbody>
      </table>
      <h3>Format Key</h3>
      <pre style={{backgroundColor:"#F4F4F4"}}>
        <code>
          {`
%N - Millennium
%C - Century
%D - Decade
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

%[,.]3x - Value including fraction with given precision, using either comma or dot.
%−Z     - Use U+2212 for negative timezone hours (ISO recommended)
`}
        </code>
      </pre>
      <p><a href="https://github.com/IJMacD/rfc3339-iso8601">Source on GitHub</a></p>
    </div>
  );
}

export default App;

function ExampleRow ({ format: formatString, now, timezone = NaN, rfc = false, iso = false }) {
  return <tr>
    <td><code>{formatString}</code></td>
    <td>{isNaN(timezone) ? format(formatString, now) : formatUTC(formatString, now, timezone)}</td>
    <td>{ rfc && "✔️" }</td>
    <td>{ iso && "✔️" }</td>
  </tr>;
}

function crossJoin (aa, bb) {
  const out = [];

  for (const a of aa) {
    for (const b of bb) {
      out.push([a,b]);
    }
  }

  return out;
}