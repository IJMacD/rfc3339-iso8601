import './App.css';
import React, { useEffect, useState } from 'react';
import Diagram from './Diagram';
import { useSavedState } from './useSavedState';
import { DownloadTestFile } from './DownloadTestFile';
import { CheckFormat } from './CheckFormat';
import { FormatTable } from './FormatTable';

function App ({ initialDate = null, initalShowHTML = false, initalShowColours = false, readOnlyMode = false, showDiagram = true }) {
  const [ now, setNow ] = useState(() => (initialDate || new Date()));
  const [ showHTML, setShowHTML ] = useSavedState("rfciso.showHTML", initalShowHTML);
  const [ showColours, setShowColours ] = useSavedState("rfciso.showColours", initalShowColours);
  const [ isPaused, setIsPaused ] = useState(initialDate !== null);

  useEffect(() => {
    if (!isPaused) {
      const update = () => setNow(new Date());
      update();
      const intervalID = setInterval(update, 1000);
      return () => clearTimeout(intervalID);
    }
  }, [isPaused]);

  useEffect(() => {
    document.title = `RFC 3339 vs ISO 8601${showHTML ? " vs HTML" : "" }`;
  }, [showHTML]);

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
    <div className="App">
      { !readOnlyMode && <h1>RFC 3339 vs ISO 8601 { showHTML && "vs HTML" }</h1> }
      { showDiagram &&
        <>
          <Diagram date={now} html={showHTML} showKey={showColours} />
          {
            !readOnlyMode &&
            <p className='App-DiagramControls'>
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
        <li><a href="https://www.iso.org/obp/ui#iso:std:iso:8601:-2:ed-1:v1:en">ISO 8601-2:2019</a> contains additional representations including sub-year groupings such as for seasons; grouped units; sets; uncertainty qualifications; and date arithmetic. These are not yet represented on this page.</li>
        <li><a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC 3339</a> allows for other characters to replace <code>T</code> but only gives a space character as an example.</li>
        <li>RFC 3339 is case-insensitive so every <code>T</code> or <code>Z</code> could also be <code>t</code> or <code>z</code> respectively. Previous editions of ISO 8601 were also case-insensitive.</li>
        <li>ISO 8601 allows decimal fractions of the smallest time value. These are represented here by a single fractional digit but the standard allows arbitrary precision.</li>
        <li>ISO 8601 prefers commas to dots for decimal separation but they are interchangeable in all formats.</li>
        <li>ISO 8601 recommends U+2212 MINUS "−" for timezones west of Greenwich. The formatter defaults to U+2D HYPHEN MINUS "-" which is valid under both standards.</li>
        <li>
          ISO 8601-1:2019 permits omitting the <code>T</code> in the <em>time of day</em> representations (<b>Times</b>) when unambiguous.<br/>However, a <code>T</code> (or <code>t</code>) is always required for <em>date and time of day</em> representations (<b>Date-Times</b>).<br/>
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
          <p><a href="https://github.com/IJMacD/rfc3339-iso8601">Source on GitHub</a></p>
        </>
      }
    </div>
  );
}

export default App;
