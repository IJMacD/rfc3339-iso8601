import './App.css';
import React, { useEffect, useState } from 'react';
import { formatAuto } from './format';
import Diagram from './Diagram';
import { useSavedState } from './useSavedState';
import { DownloadTestFile } from './DownloadTestFile';
import { date as date_formats, time as time_formats, period as period_formats, range as range_formats, dateTime as date_time_formats } from './formats';

function App() {
  const [ now, setNow ] = useState(() => new Date());
  const [ showHTML, setShowHTML ] = useSavedState("rfciso.showHTML", false);
  const [ showColours, setShowColours ] = useSavedState("rfciso.showColours", false);

  useEffect(() => {
    const intervalID = setInterval(() => setNow(new Date()), 1000);
    return () => clearTimeout(intervalID);
  }, []);

  useEffect(() => {
    document.title = `RFC 3339 vs ISO 8601${showHTML ? " vs HTML" : "" }`;
  }, [showHTML]);

  /** @type {import('react').CSSProperties} */
  const sectionHeaderStyle = {
    background: "#E5E5E5",
    textAlign: "left",
  };

  return (
    <div className="App">
      <h1>RFC 3339 vs ISO 8601 { showHTML && "vs HTML" }</h1>
      <Diagram date={now} html={showHTML} showKey={showColours} />
      <p>
        <label>
          <input type="checkbox" checked={showHTML} onChange={e => setShowHTML(e.target.checked)} />
          Show HTML
        </label>
        <label>
          <input type="checkbox" checked={showColours} onChange={e => setShowColours(e.target.checked)} />
          Show Key
        </label>
      </p>
      <h2 style={{marginBottom:0}}>Format Listing</h2>
      <p style={{marginBottom:0}}>Notes:</p>
      <ul>
        <li>This table is not exhaustive.</li>
        <li>This page targets <a href="https://www.iso.org/obp/ui#iso:std:iso:8601:-1:ed-1:v1:en">ISO 8601-1:2019</a> and <a href="https://www.iso.org/obp/ui#iso:std:iso:8601:-2:ed-1:v1:en">ISO 8601-2:2019</a>. Previous editions and drafts contain key differences.</li>
        <li><a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC 3339</a> allows for other characters to replace <code>T</code> but only gives a space character as an example.</li>
        <li>RFC 3339 and ISO 8601 are both case-insensitive so every <code>T</code>, <code>W</code>, <code>P</code>, <code>R</code>, or <code>Z</code> could be <code>t</code>, <code>w</code>, <code>p</code>, <code>r</code>, or <code>z</code> respectively.</li>
        <li>ISO 8601 allows decimal fractions of the smallest time value. These are represented here by a single fractional digit but the standard allows arbitrary precision.</li>
        <li>ISO 8601 prefers commas to dots for decimal separation but they are interchangeable in all formats.</li>
        <li>ISO 8601 recommends U+2212 MINUS "−" for timezones west of Greenwich. The formatter defaults to U+2D HYPHEN MINUS "-" which is valid under both standards.</li>
        <li>
          ISO 8601-1:2019 permits omitting the <code>T</code> in the <em>time of day</em> representations (<b>Times</b>)*. However, a <code>T</code> (or <code>t</code>) is always required for <em>date and time of day</em> representations (<b>Date-Times</b>).<br/>
          Previous editions also allowed omitting the <code>T</code> in Date-Times but it was never permitted to <em>insert</em> alternative characters (e.g. space or underscore). [* when unambiguous]
        </li>
        { showHTML && <li>The HTML living standard defines a microsyntax for <a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#dates-and-times">Dates and times</a> based on ISO 8601 and RFC 3339. It has far fewer ambiguities than either standard and gives explicit parsing rules.</li> }
        <li>The format key is given below the table.</li>
      </ul>
      <table className="App-FormatTable">
        <thead>
          <tr>
            <th>Format</th>
            <th>Now</th>
            <th>RFC 3339</th>
            <th>ISO 8601</th>
            { showHTML && <th>HTML</th> }
          </tr>
        </thead>
        <tbody>
          <tr><th colSpan={100} style={sectionHeaderStyle}>Dates</th></tr>
          {
            date_formats.map(f => <ExampleRow key={f.format} format={f.format} now={now} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={100} style={sectionHeaderStyle}>Times</th></tr>
          {
            time_formats.map(f => <ExampleRow key={f.format} format={f.format} now={now} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={100} style={sectionHeaderStyle}>Date-Times</th></tr>
          {
            date_time_formats.map(f => <ExampleRow key={f.format} format={f.format} now={now} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={100} style={sectionHeaderStyle}>Periods</th></tr>
          {
            period_formats.map(f => <ExampleRow key={f.format} format={f.format} now={now} iso html={f.html} showHTML={showHTML} />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={100} style={sectionHeaderStyle}>Ranges</th></tr>
          {
            range_formats.map(f => <ExampleRow key={f.format} format={f.format} now={now} iso showHTML={showHTML} />)
          }
        </tbody>
      </table>
      <h3>Format Key</h3>
      <pre style={{backgroundColor:"#F4F4F4"}}>
        <code>
          {`
%L - Millennium
%C - Century
%X - Decade
%Y - Year
%M - Month
%D - Day
%V - Week Year
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
      <DownloadTestFile now={now} showHTML={showHTML} />
      <p><a href="https://github.com/IJMacD/rfc3339-iso8601">Source on GitHub</a></p>
    </div>
  );
}

export default App;

function ExampleRow ({ format: formatString, now, rfc = false, iso = false, html = false, showHTML = false }) {
  if (!showHTML && !rfc && !iso) return null;

  return <tr>
    <td><code>{formatString}</code></td>
    <td>{formatAuto(formatString, now)}</td>
    <td>{ rfc && "✔️" }</td>
    <td>{ iso && "✔️" }</td>
    { showHTML && <td>{ html && "✔️" }</td> }
  </tr>;
}
