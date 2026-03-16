import React, { useState } from "react"
import TimeZoneContext from "../TimeZoneContext";
import { formatUTC } from "../util/format";
import { getCurrentTimezoneOffset } from "../util/timeZone";
import { detectFormat } from "../util/formatDetection";

/**
 * @typedef {typeof import("../types").mutualTypes[number]} MutualTypes
 */

/**
 * @param {object} props
 * @param {Date} props.date
 * @param {boolean} [props.rfc]
 * @param {boolean} [props.iso]
 * @param {boolean} [props.html]
 * @param {boolean} [props.showKey]
 * @param {MutualTypes} [props.initialMutual]
 * @param {string} [props.whatIsThisQuery]
 */
function Diagram (props) {
  const { date, rfc = true, iso = true, html = false, showKey = false, initialMutual = "mutual-six", whatIsThisQuery = "", ...restProps } = props;
  const [ showDate, setShowDate ] = React.useState(true);
  const [ showTime, setShowTime ] = React.useState(true);
  const [ showDateTime, setShowDateTime ] = React.useState(true);
  const [ showPeriod, setShowPeriod ] = React.useState(true);
  const [ showRange, setShowRange ] = React.useState(true);

  const [ mutual, setMutual ] = useState(initialMutual);

  const timeZone = React.useContext(TimeZoneContext);

  const timeZoneOffset = typeof timeZone === "string" ? getCurrentTimezoneOffset(timeZone) : (void 0);

  const className = `diagram ${showKey?"diagram--key":""} ${showDate?"":"diagram--hide-date"} ${showTime?"":"diagram--hide-time"} ${showDateTime?"":"diagram--hide-datetime"} ${showPeriod?"":"diagram--hide-period"} ${showRange?"":"diagram--hide-range"}`;

  // Determine which format patterns match the whatIsThis query
  const matchingFormats = React.useMemo(() => {
    if (!whatIsThisQuery) return new Set();
    
    try {
      const detection = detectFormat(whatIsThisQuery);
      if (!detection.isValid || detection.formats.length === 0) return new Set();
      
      return new Set(detection.formats.map(f => f.format));
    } catch (error) {
      return new Set();
    }
  }, [whatIsThisQuery]);

  // Helper function to check if a format pattern matches the query
  const isFormatMatch = (formatPattern) => {
    return matchingFormats.has(formatPattern);
  };

  // Helper function to render text with conditional red highlighting
  const renderText = (formatPattern, props, content) => {
    const isMatch = isFormatMatch(formatPattern);
    const textProps = {
      ...props,
      fontWeight: isMatch ? "bolder" : (props.fontWeight || "normal"),
      key: `${formatPattern}-${date.getTime()}-${whatIsThisQuery}` // Force re-render when date or query changes
    };
    return <text {...textProps}>{content}</text>;
  };

  return (
    <svg
      viewBox="10 50 270 190"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...restProps}
    >
      <style>{`text{font-family:sans-serif;font-size:2.653px;}text.key-label{font-size:10.503px;}`}</style>
      { showKey &&
        <g className="key">
          <g onClick={() => setShowDate(v => !v)}>
            <rect x={220} y={60} width={3} height={3} className={showDate?"key-date":"key-off"} />
            <text x={225} y={62}>Date</text>
          </g>
          <g onClick={() => setShowTime(v => !v)}>
            <rect x={220} y={65} width={3} height={3} className={showTime?"key-time":"key-off"} />
            <text x={225} y={67}>Time</text>
          </g>
          <g onClick={() => setShowDateTime(v => !v)}>
            <rect x={220} y={70} width={3} height={3} className={showDateTime?"key-datetime":"key-off"} />
            <text x={225} y={72}>DateTime</text>
          </g>
          <g onClick={() => setShowPeriod(v => !v)}>
            <rect x={220} y={75} width={3} height={3} className={showPeriod?"key-period":"key-off"} />
            <text x={225} y={77}>Period</text>
          </g>
          <g onClick={() => setShowRange(v => !v)}>
            <rect x={220} y={80} width={3} height={3} className={showRange?"key-range":"key-off"} />
            <text x={225} y={82}>Range</text>
          </g>
        </g>
      }
      { rfc &&
        <g id="rfc">
          <circle
            cx={75}
            cy={125}
            r={50}
            fill="none"
            stroke="#f0f"
            strokeWidth={0.372}
          />
          <text
            x={23.692}
            y={73.5}
            fill="#f0f"
            className="key-label"
          >
            {"RFC 3339"}
          </text>
          {renderText("%Y-%M-%D_%h:%m:%sZ", {x: 58, y: 82, className: "datetime"}, formatUTC("%Y-%M-%D_%h:%m:%sZ", date))}
          {renderText("%Y-%M-%D_%h:%m:%.3sZ", {x: 50, y: 88, className: "datetime"}, formatUTC("%Y-%M-%D_%h:%m:%.3sZ", date))}
          {renderText("%Y-%M-%DT%h:%m:%s-00:00", {x: 46, y: 94, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%s-00:00", date))}
          {renderText("%Y-%M-%Dt%h:%m:%sz", {x: 42, y: 100, className: "datetime"}, formatUTC("%Y-%M-%Dt%h:%m:%sz", date))}
          {renderText("%Y-%M-%Dt%h:%m:%s%Z:%z", {x: 32, y: 106, className: "datetime"}, formatUTC("%Y-%M-%Dt%h:%m:%s%Z:%z", date, timeZoneOffset))}
        </g>
      }
      { (rfc || html) &&
        <g id="rfc-html">
          {renderText("%Y-%M-%D %h:%m:%sZ", {x: 37, y: 128, className: "datetime"}, formatUTC("%Y-%M-%D %h:%m:%sZ", date))}
          {renderText("%Y-%M-%D %h:%m:%.3sZ", {x: 32, y: 134, className: "datetime"}, formatUTC("%Y-%M-%D %h:%m:%.3sZ", date))}
          {renderText("%Y-%M-%D %h:%m:%s%Z:%z", {x: 29, y: 140, className: "datetime"}, formatUTC("%Y-%M-%D %h:%m:%s%Z:%z", date, timeZoneOffset))}
          {/* <text x={30} y={148}>
            {format("%Y-%M-%D %h:%m:%.3s%Z:%z", date)}
          </text> */}
        </g>
      }
      { (iso || rfc || html) &&
        <g id="all">
          {renderText("%Y-%M-%D", {x: 76, y: 112, className: "date"}, formatUTC("%Y-%M-%D", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%m:%sZ", {x: 72, y: 116, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%sZ", date))}
          {renderText("%Y-%M-%DT%h:%m:%.1sZ", {x: 80, y: 120, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%.1sZ", date))}
          {renderText("%Y-%M-%DT%h:%m:%.2sZ", {x: 70, y: 128, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%.2sZ", date))}
          {renderText("%Y-%M-%DT%h:%m:%.3sZ", {x: 86, y: 132, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%.3sZ", date))}
          {renderText("%Y-%M-%DT%h:%m:%s+00:00", {x: 68, y: 140, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%s+00:00", date))}
          {renderText("%Y-%M-%DT%h:%m:%.1s+00:00", {x: 84, y: 144, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%.1s+00:00", date))}
          {renderText("%Y-%M-%DT%h:%m:%s%Z:%z", {x: 64, y: 148, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%s%Z:%z", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%m:%.1s%Z:%z", {x: 78, y: 152, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%.1s%Z:%z", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%m:%.2s%Z:%z", {x: 70, y: 160, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%.2s%Z:%z", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%m:%.3s%Z:%z", {x: 65, y: 164, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%.3s%Z:%z", date, timeZoneOffset))}
        </g>
      }
      { (iso || rfc) &&
        <g id="rfc-iso">

          {renderText("%h:%m:%sZ", {x: 96, y: 91, className: "time"}, formatUTC("%h:%m:%sZ", date))}
          {renderText("%h:%m:%.1sZ", {x: 92, y: 94, className: "time"}, formatUTC("%h:%m:%.1sZ", date))}
          {renderText("%h:%m:%.2sZ", {x: 98, y: 97, className: "time"}, formatUTC("%h:%m:%.2sZ", date))}
          {renderText("%h:%m:%.3sZ", {x: 90, y: 100, className: "time"}, formatUTC("%h:%m:%.3sZ", date))}
          {renderText("%h:%m:%.3s%Z:%z", {x: 96, y: 108, className: "time"}, formatUTC("%h:%m:%.3s%Z:%z", date, timeZoneOffset))}
          {renderText("%h:%m:%s%Z:%z", {x: 104, y: 112, className: "time"}, formatUTC("%h:%m:%s%Z:%z", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%m:%s.%uZ", {x: 80, y: 104, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%s.%uZ", date))}
        </g>
      }
      { iso &&
        <g id="iso">
          <circle
            cx={134.327}
            cy={148.288}
            r={72.135}
            fill="none"
            stroke="#00f"
            strokeWidth={0.265}
          />
          <text
            x={170}
            y={78.692}
            fill="#00f"
            className="key-label"
          >
            {"ISO 8601"}
            <tspan x={170.8} dy={6} style={{fontSize:"0.4em"}}>ISO 8601-1:2019</tspan>
          </text>
          {renderText("%Y-%M-%DT%,1h", {x: 110, y: 84, className: "datetime"}, formatUTC("%Y-%M-%DT%,1h", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%.1h", {x: 136, y: 84, className: "datetime"}, formatUTC("%Y-%M-%DT%.1h", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%,1m", {x: 116, y: 88, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%,1m", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%.1m", {x: 144, y: 88, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%.1m", date, timeZoneOffset))}
          {renderText("T%h:%m:%s", {x: 120, y: 92, className: "time"}, formatUTC("T%h:%m:%s", date, timeZoneOffset))}
          {renderText("T%h:%m:%sZ", {x: 136, y: 92, className: "time"}, formatUTC("T%h:%m:%sZ", date))}
          {renderText("T%h:%m:%s%Z:%z", {x: 154, y: 92, className: "time"}, formatUTC("T%h:%m:%s%Z:%z", date, timeZoneOffset))}
          {renderText("T%h:%m:%s%Z", {x: 164, y: 96, className: "time"}, formatUTC("T%h:%m:%s%Z", date, timeZoneOffset))}
          {renderText("%Y", {x: 120, y: 96, className: "date"}, formatUTC("%Y", date, timeZoneOffset))}
          {renderText("%X", {x: 132, y: 96, className: "date"}, formatUTC("%X", date, timeZoneOffset))}
          {renderText("%C", {x: 142, y: 96, className: "date"}, formatUTC("%C", date, timeZoneOffset))}
          {renderText("%h:%m:%s%Z", {x: 148, y: 96, className: "time"}, formatUTC("%h:%m:%s%Z", date, timeZoneOffset))}
          {renderText("%Y-%O", {x: 124, y: 100, className: "date"}, formatUTC("%Y-%O", date, timeZoneOffset))}
          {renderText("%Y-%OT%.1h", {x: 166, y: 100, className: "datetime"}, formatUTC("%Y-%OT%.1h", date, timeZoneOffset))}
          {renderText("%V-W%W-%w", {x: 146, y: 100, className: "date"}, formatUTC("%V-W%W-%w", date, timeZoneOffset))}

          {renderText("%Y-%OT%h:%m:%s", {x: 126, y: 104, className: "datetime"}, formatUTC("%Y-%OT%h:%m:%s", date, timeZoneOffset))}
          {renderText("%V-W%W-%wT%h:%m", {x: 166, y: 104, className: "datetime"}, formatUTC("%V-W%W-%wT%h:%m", date, timeZoneOffset))}

          {renderText("%Y-%M-%DT%h:%m:%s.%u", {x: 140, y: 108, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%s.%u", date, timeZoneOffset))}

          {renderText("%Y-%OT%h:%m", {x: 134, y: 112, className: "datetime"}, formatUTC("%Y-%OT%h:%m", date, timeZoneOffset))}
          {renderText("%V-W%W-%wT%h:%m:%s", {x: 162, y: 112, className: "datetime"}, formatUTC("%V-W%W-%wT%h:%m:%s", date, timeZoneOffset))}

          {renderText("%Y-W%W/P2M", {x: 128, y: 116, className: "range"}, formatUTC("%Y-W%W/P2M", date, timeZoneOffset))}
          {renderText("%Y-%O/P2M", {x: 164, y: 116, className: "range"}, formatUTC("%Y-%O/P2M", date, timeZoneOffset))}
          {renderText("%Y-%OT%h/PT2M", {x: 128, y: 120, className: "range"}, formatUTC("%Y-%OT%h/PT2M", date, timeZoneOffset))}
          {renderText("%Y-W%W-%wT%h:%m/PT2M", {x: 160, y: 120, className: "range"}, formatUTC("%Y-W%W-%wT%h:%m/PT2M", date, timeZoneOffset))}

          {renderText("%Y-W%W-%wT%h:%m:%s/PT2M", {x: 144, y: 124, className: "range"}, formatUTC("%Y-W%W-%wT%h:%m:%s/PT2M", date, timeZoneOffset))}

          {renderText("%Y/P2M", {x: 128, y: 128, className: "range"}, formatUTC("%Y/P2M", date, timeZoneOffset))}
          {renderText("%Y-%M/P2M", {x: 148, y: 128, className: "range"}, formatUTC("%Y-%M/P2M", date, timeZoneOffset))}
          {renderText("%Y-%M-%D/P2M", {x: 170, y: 128, className: "range"}, formatUTC("%Y-%M-%D/P2M", date, timeZoneOffset))}

          {renderText("%Y-%M-%DT%h/PT2M", {x: 130, y: 132, className: "range"}, formatUTC("%Y-%M-%DT%h/PT2M", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%m/PT2M", {x: 166, y: 132, className: "range"}, formatUTC("%Y-%M-%DT%h:%m/PT2M", date, timeZoneOffset))}

          {renderText("%Y-%M-%DT%h:%m:%s/P3D", {x: 128, y: 136, className: "range"}, formatUTC("%Y-%M-%DT%h:%m:%s/P3D", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%m:%s/PT2M", {x: 170, y: 136, className: "range"}, formatUTC("%Y-%M-%DT%h:%m:%s/PT2M", date, timeZoneOffset))}

          {renderText("%Y-%M-%DT%h/23", {x: 132, y: 140, className: "range"}, formatUTC("%Y-%M-%DT%h/23", date, timeZoneOffset))}
          {renderText("%Y-W%W-%w/P2M", {x: 184, y: 140, className: "range"}, formatUTC("%Y-W%W-%w/P2M", date, timeZoneOffset))}

          {renderText("%Y-%M-%D/28", {x: 134, y: 144, className: "range"}, formatUTC("%Y-%M-%D/28", date, timeZoneOffset))}
          {renderText("%Y-%M/12", {x: 192, y: 144, className: "range"}, formatUTC("%Y-%M/12", date, timeZoneOffset))}

          <text x={132} y={148} className="period">
            {"P1Y2M"}
          </text>

          <text x={136} y={152} className="period">
            {"P1.5W"}
          </text>

          <text x={134} y={156} className="period">
            {"P1,5Y"}
          </text>

          <text x={134} y={160} className="period">
            {"P1.5Y"}
          </text>

          <text x={133.5} y={164} className="period">
            {"P1W"}
          </text>

          <text x={134} y={168} className="period">
            {"P2M"}
          </text>

          <text x={134} y={172} className="period">
            {"P1Y"}
          </text>

          <text x={132} y={176} className="period">
            {"P2.5M"}
          </text>

          <text x={131} y={180} className="period">
            {"P2,5M"}
          </text>

          <text x={132} y={184} className="period">
            {"P1Y2.5M"}
          </text>

          <text x={128} y={188} className="period">
            {"P1Y2,5M"}
          </text>

          <text x={132} y={192} className="period">
            {"P1Y2.5MT4H"}
          </text>

          {renderText("%Y-%M-%D/%Y-12-31", {x: 126, y: 196, className: "range"}, formatUTC("%Y-%M-%D/%Y-12-31", date, timeZoneOffset))}

          {renderText("%Y-%M-%DT%h:%m/59", {x: 130, y: 200, className: "range"}, formatUTC("%Y-%M-%DT%h:%m/59", date, timeZoneOffset))}
          {renderText("%Y-%OT%h:%m:%s/PT3H", {x: 116, y: 204, className: "range"}, formatUTC("%Y-%OT%h:%m:%s/PT3H", date, timeZoneOffset))}

          {renderText("%Y-%M-%DT%h:%m:%s/59", {x: 136, y: 208, className: "range"}, formatUTC("%Y-%M-%DT%h:%m:%s/59", date, timeZoneOffset))}

          {renderText("R2/%Y-%O/P1Y2.5MT4H", {x: 114, y: 212, className: "range"}, formatUTC("R2/%Y-%O/P1Y2.5MT4H", date, timeZoneOffset))}

          {renderText("R/%Y-W%W-%wT%h/PT45M", {x: 120, y: 216, className: "range"}, formatUTC("R/%Y-W%W-%wT%h/PT45M", date, timeZoneOffset))}

          { mutual === "mutual-five" &&
            <g id="iso-mutual" transform="translate(20 -18)">
              <circle
                cx={150.327}
                cy={186.288}
                r={30.135}
                fill="none"
                stroke="#666"
                strokeWidth={0.372}
                strokeDasharray="4 4"
              />
              <text
                x={180}
                y={210}
                fill="#666"
                className="key-label"
                style={{fontSize:8}}
                onClick={() => setMutual("mutual-six")}
              >
                {"By Mutual Agreement"}
                <tspan x={180} dy={8} style={{fontSize:5}}>
                  (e.g. agreement on five-digit years)
                </tspan>
              </text>
              {renderText("+0%C", {x: 136, y: 164, className: "date"}, formatUTC("+0%C", date, timeZoneOffset))}
              {renderText("+0%X", {x: 144, y: 160, className: "date"}, formatUTC("+0%X", date, timeZoneOffset))}
              {renderText("+0%Y", {x: 148, y: 164, className: "date"}, formatUTC("+0%Y", date, timeZoneOffset))}
              {renderText("+0%Y-%M", {x: 154, y: 168, className: "date"}, formatUTC("+0%Y-%M", date, timeZoneOffset))}
              {renderText("+0%Y-%M-%D", {x: 128, y: 168, className: "date"}, formatUTC("+0%Y-%M-%D", date, timeZoneOffset))}
              {renderText("+0%Y%M%D", {x: 130, y: 172, className: "date"}, formatUTC("+0%Y%M%D", date, timeZoneOffset))}
              {renderText("+0%Y-%M-%DT%h", {x: 148, y: 172, className: "datetime"}, formatUTC("+0%Y-%M-%DT%h", date, timeZoneOffset))}
              {renderText("+0%Y%M", {x: 156, y: 176, className: "date"}, formatUTC("+0%Y%M", date, timeZoneOffset))}
              {renderText("+0%Y-%M-%DT%h:%m", {x: 124, y: 176, className: "datetime"}, formatUTC("+0%Y-%M-%DT%h:%m", date, timeZoneOffset))}
              {renderText("+0%Y-%M-%DT%h:%m:%s", {x: 148, y: 180, className: "datetime"}, formatUTC("+0%Y-%M-%DT%h:%m:%s", date, timeZoneOffset))}
              {renderText("+0%V-W%W-%wT%h", {x: 124, y: 184, className: "datetime"}, formatUTC("+0%V-W%W-%wT%h", date, timeZoneOffset))}
              {renderText("+0%Y-%OT%h:%m", {x: 154, y: 184, className: "datetime"}, formatUTC("+0%Y-%OT%h:%m", date, timeZoneOffset))}
              {renderText("+0%V-W%W-%wT%h:%m", {x: 138, y: 188, className: "datetime"}, formatUTC("+0%V-W%W-%wT%h:%m", date, timeZoneOffset))}
              {renderText("+0%Y-%OT%h", {x: 124, y: 192, className: "datetime"}, formatUTC("+0%Y-%OT%h", date, timeZoneOffset))}
              {renderText("+0%Y%OT%.3h", {x: 148, y: 192, className: "datetime"}, formatUTC("+0%Y%OT%.3h", date, timeZoneOffset))}
              {renderText("+0%Y-%OT%h:%m%Z:%z", {x: 130, y: 197, className: "datetime"}, formatUTC("+0%Y-%OT%h:%m%Z:%z", date, timeZoneOffset))}
              {renderText("+0%Y-%OT%h:%m:%s", {x: 128, y: 202, className: "datetime"}, formatUTC("+0%Y-%OT%h:%m:%s", date, timeZoneOffset))}
              {renderText("+0%Y%OT%h%m%s", {x: 144, y: 207, className: "datetime"}, formatUTC("+0%Y%OT%h%m%s", date, timeZoneOffset))}
              {renderText("+0%Y%M%DT%h%m%sZ", {x: 136, y: 212, className: "datetime"}, formatUTC("+0%Y%M%DT%h%m%sZ", date))}
            </g>
          }

          { mutual === "mutual-six" &&
            <g id="iso-mutual" transform="translate(20 -18)">
              <circle
                cx={150.327}
                cy={186.288}
                r={30.135}
                fill="none"
                stroke="#666"
                strokeWidth={0.372}
                strokeDasharray="4 4"
              />
              <text
                x={180}
                y={210}
                fill="#666"
                className="key-label"
                style={{fontSize:8}}
                onClick={() => setMutual("mutual-seven")}
              >
                {"By Mutual Agreement"}
                <tspan x={180} dy={8} style={{fontSize:5}}>
                  (e.g. agreement on six-digit years)
                </tspan>
              </text>
              {renderText("+00%C", {x: 136, y: 164, className: "date"}, formatUTC("+00%C", date, timeZoneOffset))}
              {renderText("+00%X", {x: 144, y: 160, className: "date"}, formatUTC("+00%X", date, timeZoneOffset))}
              {renderText("+00%Y", {x: 148, y: 164, className: "date"}, formatUTC("+00%Y", date, timeZoneOffset))}
              {renderText("+00%Y-%M", {x: 154, y: 168, className: "date"}, formatUTC("+00%Y-%M", date, timeZoneOffset))}
              {renderText("+00%Y-%M-%D", {x: 128, y: 168, className: "date"}, formatUTC("+00%Y-%M-%D", date, timeZoneOffset))}
              {renderText("+00%Y%M%D", {x: 130, y: 172, className: "date"}, formatUTC("+00%Y%M%D", date, timeZoneOffset))}
              {renderText("+00%Y-%M-%DT%h", {x: 148, y: 172, className: "datetime"}, formatUTC("+00%Y-%M-%DT%h", date, timeZoneOffset))}
              {renderText("+00%Y%M", {x: 156, y: 176, className: "date"}, formatUTC("+00%Y%M", date, timeZoneOffset))}
              {renderText("+00%Y-%M-%DT%h:%m", {x: 124, y: 176, className: "datetime"}, formatUTC("+00%Y-%M-%DT%h:%m", date, timeZoneOffset))}
              {renderText("+00%Y-%M-%DT%h:%m:%s", {x: 148, y: 180, className: "datetime"}, formatUTC("+00%Y-%M-%DT%h:%m:%s", date, timeZoneOffset))}
              {renderText("+00%V-W%W-%wT%h", {x: 124, y: 184, className: "datetime"}, formatUTC("+00%V-W%W-%wT%h", date, timeZoneOffset))}
              {renderText("+00%Y-%OT%h:%m", {x: 154, y: 184, className: "datetime"}, formatUTC("+00%Y-%OT%h:%m", date, timeZoneOffset))}
              {renderText("+00%V-W%W-%wT%h:%m", {x: 138, y: 188, className: "datetime"}, formatUTC("+00%V-W%W-%wT%h:%m", date, timeZoneOffset))}
              {renderText("+00%Y-%OT%h", {x: 124, y: 192, className: "datetime"}, formatUTC("+00%Y-%OT%h", date, timeZoneOffset))}
              {renderText("+00%Y%OT%.3h", {x: 148, y: 192, className: "datetime"}, formatUTC("+00%Y%OT%.3h", date, timeZoneOffset))}
              {renderText("+00%Y-%OT%h:%m%Z:%z", {x: 130, y: 197, className: "datetime"}, formatUTC("+00%Y-%OT%h:%m%Z:%z", date, timeZoneOffset))}
              {renderText("+00%Y-%OT%h:%m:%s", {x: 128, y: 202, className: "datetime"}, formatUTC("+00%Y-%OT%h:%m:%s", date, timeZoneOffset))}
              {renderText("+00%Y%OT%h%m%s", {x: 144, y: 207, className: "datetime"}, formatUTC("+00%Y%OT%h%m%s", date, timeZoneOffset))}
              {renderText("+00%Y%M%DT%h%m%sZ", {x: 136, y: 212, className: "datetime"}, formatUTC("+00%Y%M%DT%h%m%sZ", date))}
            </g>
          }

          { mutual === "mutual-seven" &&
            <g id="iso-mutual" transform="translate(20 -18)">
              <circle
                cx={150.327}
                cy={186.288}
                r={30.135}
                fill="none"
                stroke="#666"
                strokeWidth={0.372}
                strokeDasharray="4 4"
              />
              <text
                x={180}
                y={210}
                fill="#666"
                className="key-label"
                style={{fontSize:8}}
                onClick={() => setMutual("mutual-five")}
              >
                {"By Mutual Agreement"}
                <tspan x={180} dy={8} style={{fontSize:5}}>
                  (e.g. agreement on seven-digit years)
                </tspan>
              </text>
              {renderText("+000%C", {x: 136, y: 164, className: "date"}, formatUTC("+000%C", date, timeZoneOffset))}
              {renderText("+000%X", {x: 144, y: 160, className: "date"}, formatUTC("+000%X", date, timeZoneOffset))}
              {renderText("+000%Y", {x: 148, y: 164, className: "date"}, formatUTC("+000%Y", date, timeZoneOffset))}
              {renderText("+000%Y-%M", {x: 154, y: 168, className: "date"}, formatUTC("+000%Y-%M", date, timeZoneOffset))}
              {renderText("+000%Y-%M-%D", {x: 128, y: 168, className: "date"}, formatUTC("+000%Y-%M-%D", date, timeZoneOffset))}
              {renderText("+000%Y%M%D", {x: 130, y: 172, className: "date"}, formatUTC("+000%Y%M%D", date, timeZoneOffset))}
              {renderText("+000%Y-%M-%DT%h", {x: 148, y: 172, className: "datetime"}, formatUTC("+000%Y-%M-%DT%h", date, timeZoneOffset))}
              {renderText("+000%Y%M", {x: 156, y: 176, className: "date"}, formatUTC("+000%Y%M", date, timeZoneOffset))}
              {renderText("+000%Y-%M-%DT%h:%m", {x: 124, y: 176, className: "datetime"}, formatUTC("+000%Y-%M-%DT%h:%m", date, timeZoneOffset))}
              {renderText("+000%Y-%M-%DT%h:%m:%s", {x: 148, y: 180, className: "datetime"}, formatUTC("+000%Y-%M-%DT%h:%m:%s", date, timeZoneOffset))}
              {renderText("+000%V-W%W-%wT%h", {x: 124, y: 184, className: "datetime"}, formatUTC("+000%V-W%W-%wT%h", date, timeZoneOffset))}
              {renderText("+000%Y-%OT%h:%m", {x: 154, y: 184, className: "datetime"}, formatUTC("+000%Y-%OT%h:%m", date, timeZoneOffset))}
              {renderText("+000%V-W%W-%wT%h:%m", {x: 138, y: 188, className: "datetime"}, formatUTC("+000%V-W%W-%wT%h:%m", date, timeZoneOffset))}
              {renderText("+000%Y-%OT%h", {x: 124, y: 192, className: "datetime"}, formatUTC("+000%Y-%OT%h", date, timeZoneOffset))}
              {renderText("+000%Y%OT%.3h", {x: 148, y: 192, className: "datetime"}, formatUTC("+000%Y%OT%.3h", date, timeZoneOffset))}
              {renderText("+000%Y-%OT%h:%m%Z:%z", {x: 130, y: 197, className: "datetime"}, formatUTC("+000%Y-%OT%h:%m%Z:%z", date, timeZoneOffset))}
              {renderText("+000%Y-%OT%h:%m:%s", {x: 128, y: 202, className: "datetime"}, formatUTC("+000%Y-%OT%h:%m:%s", date, timeZoneOffset))}
              {renderText("+000%Y%OT%h%m%s", {x: 144, y: 207, className: "datetime"}, formatUTC("+000%Y%OT%h%m%s", date, timeZoneOffset))}
              {renderText("+000%Y%M%DT%h%m%sZ", {x: 136, y: 212, className: "datetime"}, formatUTC("+000%Y%M%DT%h%m%sZ", date))}
            </g>
          }
        </g>
      }
      { html &&
        <g id="html" transform="translate(-12 0)">
          <circle
            cx={90}
            cy={161}
            r={55}
            fill="none"
            stroke="#3c790a"
            strokeWidth={0.265}
          />
          <text
            x={45}
            y={222}
            fill="#3c790a"
            className="key-label"
          >
            {"HTML"}
            <tspan dx={-28} dy={6} style={{fontSize:"0.4em"}}>Living Standard</tspan>
          </text>
          {renderText("1 D", {x: 74, y: 180, className: "period"}, formatUTC("1 D", date, timeZoneOffset))}
          {renderText("5 M 4 W", {x: 70, y: 184, className: "period"}, formatUTC("5 M 4 W", date, timeZoneOffset))}
          {renderText("%Y-%M-%D %h:%m:%s", {x: 58, y: 192, className: "datetime"}, formatUTC("%Y-%M-%D %h:%m:%s", date, timeZoneOffset))}
          {renderText("%Y-%M-%D %h:%m", {x: 66, y: 196, className: "datetime"}, formatUTC("%Y-%M-%D %h:%m", date, timeZoneOffset))}
          {renderText("%Y-%M-%D %h:%m:%.3s", {x: 60, y: 200, className: "datetime"}, formatUTC("%Y-%M-%D %h:%m:%.3s", date, timeZoneOffset))}
          {renderText("--%M-%D", {x: 84, y: 208, className: "date"}, formatUTC("--%M-%D", date))}
          {renderText("%M-%D", {x: 94, y: 212, className: "date"}, formatUTC("%M-%D", date))}
        </g>
      }
      { (iso || html) &&
        <g id="iso-html">
          {renderText("%h:%m", {x: 122.5, y: 152, className: "time"}, formatUTC("%h:%m", date, timeZoneOffset))}
          {renderText("%h:%m:%s", {x: 120, y: 156, className: "time"}, formatUTC("%h:%m:%s", date, timeZoneOffset))}
          {renderText("%h:%m:%.1s", {x: 118, y: 160, className: "time"}, formatUTC("%h:%m:%.1s", date, timeZoneOffset))}
          {renderText("%h:%m:%.3s", {x: 114, y: 164, className: "time"}, formatUTC("%h:%m:%.3s", date, timeZoneOffset))}
          {renderText("P1D", {x: 126, y: 168, className: "period"}, formatUTC("P1D", date, timeZoneOffset))}
          {renderText("PT1S", {x: 122, y: 172, className: "period"}, formatUTC("PT1S", date, timeZoneOffset))}
          {renderText("PT1M", {x: 106, y: 176, className: "period"}, formatUTC("PT1M", date, timeZoneOffset))}
          {renderText("PT1H", {x: 120, y: 176, className: "period"}, formatUTC("PT1H", date, timeZoneOffset))}
          {renderText("P1TD1.12S", {x: 80, y: 180, className: "period"}, formatUTC("P1TD1.12S", date, timeZoneOffset))}
          {renderText("P1DT1.1S", {x: 112, y: 180, className: "period"}, formatUTC("P1DT1.1S", date, timeZoneOffset))}
          {renderText("P1DT1H1M", {x: 88, y: 184, className: "period"}, formatUTC("P1DT1H1M", date, timeZoneOffset))}
          {renderText("P1DT1.123S", {x: 112, y: 184, className: "period"}, formatUTC("P1DT1.123S", date, timeZoneOffset))}

          {renderText("%Y-%M-%DT%h:%m:%s", {x: 80, y: 188, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%s", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%m", {x: 100, y: 192, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m", date, timeZoneOffset))}
          {renderText("%Y-%M-%DT%h:%m:%.3s", {x: 85, y: 196, className: "datetime"}, formatUTC("%Y-%M-%DT%h:%m:%.3s", date, timeZoneOffset))}
          {renderText("%Y-%M", {x: 104, y: 200, className: "date"}, formatUTC("%Y-%M", date, timeZoneOffset))}
          {renderText("%V-W%W", {x: 94, y: 204, className: "date"}, formatUTC("%V-W%W", date, timeZoneOffset))}
        </g>
      }
    </svg>
  )
}

export default Diagram;
