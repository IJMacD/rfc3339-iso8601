import './App.css';
import React, { useEffect, useState } from 'react';
import Diagram from './Components/Diagram';
import { useSavedState } from './hooks/useSavedState';
import { DownloadTestFile } from './Components/DownloadTestFile';
import { CheckFormat } from './Components/CheckFormat';
import { FormatTable } from './Components/FormatTable';
import { ISO8601aaS } from './Components/ISO8601aaS';
import { TimeZonePicker } from './Components/TimeZonePicker';
import { getBrowserTimezone } from './util/timeZone';
import TimeZoneContext from './TimeZoneContext';

function App ({
  initialDate = /** @type {Date?} */ (null),
  initialShowISO = true,
  initialShowRFC = true,
  initialShowHTML = false,
  initialShowColours = false,
  readOnlyMode = false,
  showDiagram = true,
  initialTimeZone = /** @type {string?} */ (null),
}) {
  const [ now, setNow ] = useState(() => (initialDate || new Date()));
  const [ showISO, setShowISO ] = useSavedState("rfciso.showISO", initialShowISO);
  const [ showRFC, setShowRFC ] = useSavedState("rfciso.showRFC", initialShowRFC);
  const [ showHTML, setShowHTML ] = useSavedState("rfciso.showHTML", initialShowHTML);
  const [ showColours, setShowColours ] = useSavedState("rfciso.showColours", initialShowColours);
  const [ isPaused, setIsPaused ] = useState(initialDate !== null);
  const [ selectedTimeZone, setSelectedTimeZone ] = useSavedState("rfciso.selectedTimeZone", initialTimeZone || getBrowserTimezone() || "");

  useEffect(() => {
    if (!isPaused) {
      const update = () => setNow(new Date());
      update();
      const intervalID = setInterval(update, 1000);
      return () => clearTimeout(intervalID);
    }
  }, [isPaused]);

  useEffect(() => {
    document.title = getTitle(showRFC, showISO, showHTML);
  }, [showISO, showRFC, showHTML]);

  useEffect(() => {
    const cb = e => {
      if (e.ctrlKey && e.key === "m") {
        setIsPaused(pause => !pause);
      }
    }

    document.addEventListener("keyup", cb);

    return () => document.removeEventListener("keyup", cb);
  }, [setIsPaused]);

  return (
    <TimeZoneContext.Provider value={selectedTimeZone}>
      <div className="App">
        { !readOnlyMode && <h1>{getTitle(showRFC, showISO, showHTML)}</h1> }
        { showDiagram &&
          <>
            <Diagram date={now} iso={showISO} rfc={showRFC} html={showHTML} showKey={showColours} />
            {
              !readOnlyMode &&
              <p className='App-DiagramControls'>
                <label>
                  <input type="checkbox" checked={showISO} onChange={e => setShowISO(e.target.checked)} />
                  Show ISO 8601
                </label>
                <label>
                  <input type="checkbox" checked={showRFC} onChange={e => setShowRFC(e.target.checked)} />
                  Show RFC 3339
                </label>
                <label>
                  <input type="checkbox" checked={showHTML} onChange={e => setShowHTML(e.target.checked)} />
                  Show HTML
                </label>
                <label>
                  <input type="checkbox" checked={showColours} onChange={e => setShowColours(e.target.checked)} />
                  Show Colours
                </label>
              </p>
            }
          </>
        }
        <h2 style={{marginBottom:0}}>Format Listing</h2>
        <p style={{marginBottom:0}}>Notes:</p>
        <ul>
          <li>This table is not exhaustive.</li>
          <li>This page targets <a href="https://www.iso.org/obp/ui#iso:std:iso:8601:-1:ed-1:v1:en">ISO 8601-1:2019</a>. Previous editions and drafts contain key differences.</li>
          <li><a href="https://www.iso.org/obp/ui#iso:std:iso:8601:-2:ed-1:v1:en">ISO 8601-2:2019</a> contains additional representations including sub-year groupings (e.g. for seasons); grouped units; sets; uncertainty qualifications; and date arithmetic. These are not yet represented on this page.</li>
          <li><a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC 3339</a> suggests other characters could be specified to replace the <code>T</code> in downstream standards but only gives a space character as an example.</li>
          <li>RFC 3339 is case-insensitive so every <code>T</code> or <code>Z</code> could also be <code>t</code> or <code>z</code> respectively. Previous editions of ISO 8601 were also case-insensitive.</li>
          {/* ISO 8601-1:2019 § 5.3.1.4 */}
          <li title="ISO 8601-1:2019 § 5.3.1.4">ISO 8601 allows decimal fractions of the smallest time value. These are mostly represented here by a single fractional digit but the standard allows arbitrary precision.</li>
          {/* ISO 8601-1:2019 § 3.2.6 */}
          <li title="ISO 8601-1:2019 § 3.2.6">ISO 8601 allows commas and dots for decimal separation but they are interchangeable in all formats.</li>
          {/* ISO 8601-1:2019 § 3.2.1 */}
          <li title="ISO 8601-1:2019 § 3.2.1">
            ISO 8601 uses a <em>hyphen</em> character (in Unicode, <code>U+2010 HYPHEN "‐"</code>) and <em>minus</em> character (in Unicode, <code>U+2212 MINUS "−"</code>).<br/>
            When using character sets which don't have these characters a <em>hyphen-minus</em> character (in Unicode, <code>U+2D HYPHEN-MINUS "-"</code>) should be used instead.<br/>
            The formatter defaults to using hyphen-minus which is valid under both standards.
          </li>
          {/* ISO 8601-1:2019 § 5.3.5 */}
          <li title="ISO 8601-1:2019 § 5.3.5">
            ISO 8601-1:2019 permits omitting the <code>T</code> in the <em>time of day</em> representations (<b>Times</b>) when unambiguous.<br/>However, a <code>T</code> is always required in <em>date and time of day</em> representations (<b>Date-Times</b>).<br/>
            Previous editions also allowed omitting the <code>T</code> in Date-Times but it was never permitted to <em>insert</em> alternative characters (e.g. space or underscore).
          </li>
          { showHTML && <li>The HTML living standard defines a microsyntax for <a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#dates-and-times">Dates and times</a> based on ISO 8601 and RFC 3339. It has far fewer ambiguities than either standard and gives explicit parsing rules.</li> }
          { !readOnlyMode && <li>Each <span onClick={() => window.open("https://xkcd.com/927/")}>standard</span> defines multiple formats for different purposes. <span onClick={() => window.open("https://xkcd.com/1179/")}>Other formats are therefore discouraged.</span></li> }
          <li>The format key is given below the table.</li>
        </ul>
        <FormatTable date={now} showHTML={showHTML} isPaused={isPaused} />
        <h3>Format Key</h3>
        <pre className='App-FormatKey'>
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
        {
          !readOnlyMode &&
          <>
            <DownloadTestFile now={now} showHTML={showHTML} />
            <CheckFormat now={now} showHTML={showHTML} />
            <ISO8601aaS />
            <TimeZonePicker value={selectedTimeZone} onChange={setSelectedTimeZone} />
            <p><a href="https://github.com/IJMacD/rfc3339-iso8601">Source on GitHub</a></p>
          </>
        }
      </div>
    </TimeZoneContext.Provider>
  );
}

export default App;

function getTitle(showRFC, showISO, showHTML) {
  const t = [];
  if (showRFC)
    t.push("RFC 3339");
  if (showISO)
    t.push("ISO 8601");
  if (showHTML)
    t.push("HTML");
  return t.join(" vs ");
}

