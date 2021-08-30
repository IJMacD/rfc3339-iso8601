import './App.css';
import React, { useEffect, useState } from 'react';
import { format, formatUTC } from './format';
import Diagram from './Diagram';

const time_formats_rfc_only = [
  "%h:%m:%s-00:00",
  "%h:%m:%.3s-00:00",
];

const formats_rfc_only = [
  "%Y-%M-%D %h:%m:%sZ",
  "%Y-%M-%D_%h:%m:%sZ",
  "%Y-%M-%D %h:%m:%sz",
  "%Y-%M-%D_%h:%m:%sz",
  "%Y-%M-%D %h:%m:%.3sZ",
  "%Y-%M-%D_%h:%m:%.3sZ",
  "%Y-%M-%D %h:%m:%.3sz",
  "%Y-%M-%D_%h:%m:%.3sz",
  "%Y-%M-%D %h:%m:%s-00:00",
  "%Y-%M-%D %h:%m:%.3s-00:00",
  "%Y-%M-%DT%h:%m:%s-00:00",
  "%Y-%M-%DT%h:%m:%.3s-00:00",
];

const date_formats_both = [
  "%Y-%M-%D",
];

const time_formats_both_utc = [
  "%h:%m:%sZ",
  "%h:%m:%.1sZ",
  "%h:%m:%.3sZ",
  "%h:%m:%s.%uZ",
  "%h:%m:%s+00:00",
  "%h:%m:%.1s+00:00",
  "%h:%m:%.3s+00:00",
  "%h:%m:%s.%u+00:00",
];

const time_formats_both_local = [
  "%h:%m:%s%Z:%z",
  "%h:%m:%.1s%Z:%z",
  "%h:%m:%.3s%Z:%z",
  "%h:%m:%s.%u%Z:%z",
];

const formats_both_utc = [
  "%Y-%M-%DT%h:%m:%sZ",
  "%Y-%M-%DT%h:%m:%.3sZ",
  "%Y-%M-%DT%h:%m:%s+00:00",
  "%Y-%M-%DT%h:%m:%.3s+00:00",
  "%Y-%M-%DT%h:%m:%s.%u+00:00",
];

const formats_both_local = [
  "%Y-%M-%DT%h:%m:%s%Z:%z",
  "%Y-%M-%DT%h:%m:%.3s%Z:%z",
  "%Y-%M-%DT%h:%m:%s.%u%Z:%z",
];

const full_date_formats = [
  "%Y-%M-%D",
  "%G-W%W-%w",
  "%Y-%O",
];

const basic_time_formats_iso_only = [
  "%h",
  "%,1h",
  "%.1h",
  "%h:%m",
  "%h:%,1m",
  "%h:%.1m",
  "%h:%m:%s",
  "%h:%m:%,3s",
  "%h:%m:%.3s",
  "%h:%m:%s,%u",
  "%h:%m:%s.%u",
];

const expanded_time_formats_iso_only = [
  ...basic_time_formats_iso_only,
  ...basic_time_formats_iso_only.map(s => "T" + s),
];

const time_formats_iso_only = [
  ...new Set([
    ...expanded_time_formats_iso_only,
    ...expanded_time_formats_iso_only.map(s => s.replace(/[-:]/g, "")),
  ]
)];

const time_formats_iso_utc = time_formats_iso_only.map(s => s + "Z").filter(s => !time_formats_both_utc.includes(s));

const merged = crossJoin(full_date_formats, basic_time_formats_iso_only).map(([d,t]) => `${d}T${t}`);
const mergedBasic = merged.map(s => s.replace(/[-:]/g, ""));
const mergedBoth = [ ...merged, ...mergedBasic ];

const formats_negative = [
  "%Y-%M-%DT%h:%m:%s%Z:%z",
  "%Y-%M-%DT%h:%m:%.3s%Z:%z",
];

const formats_negative_2212 = [
  "%Y-%M-%DT%h%−Z",
  "%Y-%M-%DT%h:%m%−Z",
  "%Y-%M-%DT%h:%m:%s%−Z",
  "%Y-%M-%DT%h:%m:%,3s%−Z",
  "%Y-%M-%DT%h:%m:%.3s%−Z",
  "%Y-%M-%DT%h%−Z:%z",
  "%Y-%M-%DT%h:%m%−Z:%z",
  "%Y-%M-%DT%h:%m:%s%−Z:%z",
  "%Y-%M-%DT%h:%m:%,3s%−Z:%z",
  "%Y-%M-%DT%h:%m:%.3s%−Z:%z",
  "%Y%M%DT%h%−Z",
  "%Y%M%DT%h%m%−Z",
  "%Y%M%DT%h%m%s%−Z",
  "%Y%M%DT%h%m%,3s%−Z",
  "%Y%M%DT%h%m%.3s%−Z",
  "%Y%M%DT%h%−Z%z",
  "%Y%M%DT%h%m%−Z%z",
  "%Y%M%DT%h%m%s%−Z%z",
  "%Y%M%DT%h%m%,3s%−Z%z",
  "%Y%M%DT%h%m%.3s%−Z%z",
];

const date_formats_iso_only = [
  "%N",
  "%C",
  "%X",
  "%Y",
  "%Y-%M",
  "%Y-%O",
  "%G-W%W",
  "%G-W%W-%w",
  "%Y%O",
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
        <li>Both standards are case-insensitive so every <code>T</code>, <code>W</code>, <code>P</code>, <code>R</code>, and <code>Z</code> could be <code>t</code>, <code>w</code>, <code>p</code>, <code>r</code>, or <code>z</code> respectively.</li>
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
            date_formats_both.map(f => <ExampleRow key={f} format={f} now={now} rfc iso />)
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
          {
            time_formats_iso_utc.map(f => <ExampleRow key={f} format={f} now={now} timezone={0} iso />)
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
%X - Decade
%Y - Year
%M - Month
%D - Day
%G - Week Year
%W - Week
%w - Week Day
%O - Ordinal Day

%h - Hour
%m - Minute
%s - Second
%u - Microsecond

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

/**
 * @param {any[]} aa
 * @param {any[]} bb
 */
function crossJoin (aa, bb) {
  return aa.map(a => bb.map(b => [a,b])).flat();
}
