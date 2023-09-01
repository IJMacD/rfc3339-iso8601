
import React from 'react';
import { formatAuto } from '../util/format';
import { date as date_formats, time as time_formats, period as period_formats, range as range_formats, dateTime as date_time_formats } from '../formats';
import { getCurrentTimezoneOffset } from '../util/timeZone';
import TimeZoneContext from '../TimeZoneContext';

export const FormatTable = React.memo(FormatTableRaw);

/**
 * @param {object} props
 * @param {Date} props.date
 * @param {boolean} props.showHTML
 * @param {boolean} props.isPaused
 * @param {string} [props.timeZone]
 */
function FormatTableRaw ({ date, showHTML, isPaused }) {
    const timeZone = React.useContext(TimeZoneContext);

    const timeZoneOffset = typeof timeZone === "string" ? getCurrentTimezoneOffset(timeZone) : (void 0);

    return (
        <table className="App-FormatTable">
            <thead>
            <tr>
                <th>Format</th>
                <th>{ isPaused ? "Example" : "Now" }</th>
                <th>RFC 3339</th>
                <th>ISO 8601</th>
                { showHTML && <th>HTML</th> }
            </tr>
            </thead>
            <tbody>
            <tr><th colSpan={100}>Dates</th></tr>
            {
                date_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} timeZoneOffset={timeZoneOffset} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
            }
            </tbody>
            <tbody>
            <tr><th colSpan={100}>Times</th></tr>
            {
                time_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} timeZoneOffset={timeZoneOffset} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
            }
            </tbody>
            <tbody>
            <tr><th colSpan={100}>Date-Times</th></tr>
            {
                date_time_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} timeZoneOffset={timeZoneOffset} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
            }
            </tbody>
            <tbody>
            <tr><th colSpan={100}>Periods</th></tr>
            {
                period_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} timeZoneOffset={timeZoneOffset} iso={f.iso} html={f.html} showHTML={showHTML} />)
            }
            </tbody>
            <tbody>
            <tr><th colSpan={100}>Ranges</th></tr>
            {
                range_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} timeZoneOffset={timeZoneOffset} iso showHTML={showHTML} />)
            }
            </tbody>
        </table>
    );
}

function ExampleRow ({ format: formatString, date, timeZoneOffset, rfc = false, iso = false, html = false, showHTML = false }) {
  if (!showHTML && !rfc && !iso) return null;

  return <tr>
    <td><code>{formatString}</code></td>
    <td>{formatAuto(formatString, date, timeZoneOffset)}</td>
    <td>{ rfc && "✔️" }</td>
    <td>{ iso && "✔️" }</td>
    { showHTML && <td>{ html && "✔️" }</td> }
  </tr>;
}
