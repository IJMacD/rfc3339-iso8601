
import React from 'react';
import { formatAuto } from './format';
import { date as date_formats, time as time_formats, period as period_formats, range as range_formats, dateTime as date_time_formats } from './formats';

export const FormatTable = React.memo(FormatTableRaw);

function FormatTableRaw ({ date, showHTML, isPaused }) {

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
                date_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
            }
            </tbody>
            <tbody>
            <tr><th colSpan={100}>Times</th></tr>
            {
                time_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
            }
            </tbody>
            <tbody>
            <tr><th colSpan={100}>Date-Times</th></tr>
            {
                date_time_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} rfc={f.rfc} iso={f.iso} html={f.html} showHTML={showHTML}  />)
            }
            </tbody>
            <tbody>
            <tr><th colSpan={100}>Periods</th></tr>
            {
                period_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} iso={f.iso} html={f.html} showHTML={showHTML} />)
            }
            </tbody>
            <tbody>
            <tr><th colSpan={100}>Ranges</th></tr>
            {
                range_formats.map(f => <ExampleRow key={f.format} format={f.format} date={date} iso showHTML={showHTML} />)
            }
            </tbody>
        </table>
    );
}

function ExampleRow ({ format: formatString, date, rfc = false, iso = false, html = false, showHTML = false }) {
  if (!showHTML && !rfc && !iso) return null;

  return <tr>
    <td><code>{formatString}</code></td>
    <td>{formatAuto(formatString, date)}</td>
    <td>{ rfc && "✔️" }</td>
    <td>{ iso && "✔️" }</td>
    { showHTML && <td>{ html && "✔️" }</td> }
  </tr>;
}
