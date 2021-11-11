import './App.css';
import React, { useEffect, useState } from 'react';
import { format, formatUTC } from './format';
import Diagram from './Diagram';
import { date_formats, time_formats, date_time_formats, periods, ranges, html_formats } from './standardFormats';
import { downloadFile } from './downloadFile';
import { useSavedState } from './useSavedState';

function App() {
  const [ now, setNow ] = useState(() => new Date());
  const [ testFileType, setTestFileType ] = useState("both");
  const [ showHTML, setShowHTML ] = useSavedState("rfciso.showHTML", false);

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

  function handleDownload () {
    const yesRFC = testFileType === "rfc3339" || testFileType === "both";
    const yesISO = testFileType === "iso8601" || testFileType === "both";

    const str = [];

    str.push("# Dates");

    str.push(...date_formats.filter(f => (f.rfc && yesRFC) || (f.iso && yesISO)).map(f => format(f.format, now)));

    str.push("# Times");

    str.push(...time_formats.filter(f => (f.rfc && yesRFC) || (f.iso && yesISO)).map(f => formatUTC(f.format, now, f.timezone)));

    str.push("# Date-Times");

    str.push(...date_time_formats.filter(f => (f.rfc && yesRFC) || (f.iso && yesISO)).map(f => formatUTC(f.format, now, f.timezone)));

    downloadFile(str.join("\n"), `date-test-values-${yesRFC?"rfc3339":""}${yesRFC&&yesISO?"-":""}${yesISO?"iso8601":""}.txt`);
  }

  return (
    <div className="App">
      <h1>RFC 3339 vs ISO 8601 { showHTML && "vs HTML" }</h1>
      <Diagram date={now} html={showHTML} />
      <p>
        <label>
          <input type="checkbox" checked={showHTML} onChange={e => setShowHTML(e.target.checked)} />
          Show HTML
        </label>
      </p>
      <h2>Format Listing</h2>
      <p style={{marginBottom:0}}>Notes:</p>
      <ul>
        <li>This table is not exhaustive.</li>
        <li>This page targets ISO 8601-1:2019 and ISO 8601-2:2019 editions. Previous editions and drafts contain key differences.</li>
        <li>Both standards are case-insensitive so every <code>T</code>, <code>W</code>, <code>P</code>, <code>R</code>, or <code>Z</code> could be <code>t</code>, <code>w</code>, <code>p</code>, <code>r</code>, or <code>z</code> respectively.</li>
        <li>RFC 3339 allows for other characters to replace <code>T</code> but only gives a space character as an example.</li>
        <li>ISO 8601 allows decimal fractions of the smallest time value. These are represented here by a single fractional digit but the standard allows arbitrary precision.</li>
        <li>ISO 8601 prefers commas to dots for decimal separation but they are interchangeable in all formats.</li>
        <li>ISO 8601 recommends U+2212 MINUS "−" for timezones west of Greenwich. The formatter defaults to U+2D HYPHEN MINUS "-" which is valid under both standards.</li>
        <li>ISO 8601-1:2019 permits omitting the <code>T</code> in the <em>time of day</em> representations (<b>Times</b>)*. However, a <code>T</code> (or <code>t</code>) is always required for <em>date and time of day</em> representations (<b>Date-Times</b>). Previous editions also allowed omitting the <code>T</code> in Date-Times but it was never permitted to <em>insert</em> alternative characters (e.g. space or underscore). [* When unambiguous]</li>
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
          { showHTML && <ExampleRow key={"--%M-%D"} format={"--%M-%D"} now={now} html showHTML={true}  /> }
        </tbody>
        <tbody>
          <tr><th colSpan={100} style={sectionHeaderStyle}>Times</th></tr>
          {
            time_formats.map(f => <ExampleRow key={f.format} format={f.format} now={now} timezone={f.timezone} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={100} style={sectionHeaderStyle}>Date-Times</th></tr>
          {
            date_time_formats.map((f, i) => <ExampleRow key={i} format={f.format} now={now} timezone={f.timezone} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={100} style={sectionHeaderStyle}>Periods</th></tr>
          {
            periods.map(f => <ExampleRow key={f} format={f} now={now} iso html={html_formats.includes(f)} showHTML={showHTML} />)
          }
        </tbody>
        <tbody>
          <tr><th colSpan={100} style={sectionHeaderStyle}>Ranges</th></tr>
          {
            ranges.map(f => <ExampleRow key={f} format={f} now={now} iso showHTML={showHTML} />)
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
      {/* @ts-ignore */}
      <p onChange={e => setTestFileType(e.target.value)}>
        <button onClick={() => handleDownload()}>Download test file</button>
        <label><input type="radio" name="test-file-includes" value="rfc3339" checked={testFileType === "rfc3339"} />RFC 3339</label>
        <label><input type="radio" name="test-file-includes" value="iso8601" checked={testFileType === "iso8601"} />ISO 8601</label>
        <label><input type="radio" name="test-file-includes" value="both" checked={testFileType === "both"} />Union</label>
      </p>
      <p><a href="https://github.com/IJMacD/rfc3339-iso8601">Source on GitHub</a></p>
    </div>
  );
}

export default App;

function ExampleRow ({ format: formatString, now, timezone = NaN, rfc = false, iso = false, html = false, showHTML = false }) {
  return <tr>
    <td><code>{formatString}</code></td>
    <td>{isNaN(timezone) ? format(formatString, now) : formatUTC(formatString, now, timezone)}</td>
    <td>{ rfc && "✔️" }</td>
    <td>{ iso && "✔️" }</td>
    { showHTML && <td>{ html && "✔️" }</td> }
  </tr>;
}
