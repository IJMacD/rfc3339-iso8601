import * as React from "react"
import { format, formatUTC } from "./format";

function Diagram (props) {
  const { date, html, showKey, ...restProps } = props;
  const [ showDate, setShowDate ] = React.useState(true);
  const [ showTime, setShowTime ] = React.useState(true);
  const [ showDateTime, setShowDateTime ] = React.useState(true);
  const [ showPeriod, setShowPeriod ] = React.useState(true);
  const [ showRange, setShowRange ] = React.useState(true);

  const className = `diagram ${showKey?"diagram--key":""} ${showDate?"":"diagram--hide-date"} ${showTime?"":"diagram--hide-time"} ${showDateTime?"":"diagram--hide-datetime"} ${showPeriod?"":"diagram--hide-period"} ${showRange?"":"diagram--hide-range"}`;

  return (
    <svg
      viewBox="10 50 270 190"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...restProps}
    >
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
      <g id="rfc" transform="translate(0 2)">
        <circle
          cx={75}
          cy={123}
          r={50}
          fill="none"
          stroke="#f0f"
          strokeWidth={0.372}
        />
        <text
          x={23.692}
          y={71.5}
          fill="#f0f"
          className="key-label"
        >
          {"RFC 3339"}
        </text>
        <text x={54} y={84} className="datetime">
          {formatUTC("%Y-%M-%D_%h:%m:%sZ", date)}
        </text>
        <text x={46} y={90} className="datetime">
          {formatUTC("%Y-%M-%D_%h:%m:%.3sZ", date)}
        </text>
        <text x={40} y={96} className="datetime">
          {formatUTC("%Y-%M-%DT%h:%m:%s-00:00", date)}
        </text>
      </g>
      <g id="rfc-html">
        <text x={38} y={128} className="datetime">
          {formatUTC("%Y-%M-%D %h:%m:%sZ", date)}
        </text>
        <text x={32} y={134} className="datetime">
          {formatUTC("%Y-%M-%D %h:%m:%.3sZ", date)}
        </text>
        <text x={29} y={140} className="datetime">
          {format("%Y-%M-%D %h:%m:%s%Z:%z", date)}
        </text>
        {/* <text x={30} y={148}>
          {format("%Y-%M-%D %h:%m:%.3s%Z:%z", date)}
        </text> */}
      </g>
      <g id="all">
        <text x={82} y={114} className="date">
          {format("%Y-%M-%D", date)}
        </text>
        <text x={76} y={120} className="datetime">
          {formatUTC("%Y-%M-%DT%h:%m:%sZ", date)}
        </text>
        <text x={84} y={124} className="datetime">
          {formatUTC("%Y-%M-%DT%h:%m:%.1sZ", date)}
        </text>
        <text x={70} y={128} className="datetime">
          {formatUTC("%Y-%M-%DT%h:%m:%.2sZ", date)}
        </text>
        <text x={82} y={132} className="datetime">
          {formatUTC("%Y-%M-%DT%h:%m:%.3sZ", date)}
        </text>
        <text x={72} y={140} className="datetime">
          {formatUTC("%Y-%M-%DT%h:%m:%s+00:00", date)}
        </text>
        <text x={82} y={144} className="datetime">
          {formatUTC("%Y-%M-%DT%h:%m:%.1s+00:00", date)}
        </text>
        <text x={82} y={152} className="datetime">
          {format("%Y-%M-%DT%h:%m:%s%Z:%z", date)}
        </text>
        <text x={64} y={156} className="datetime">
          {format("%Y-%M-%DT%h:%m:%.1s%Z:%z", date)}
        </text>
        <text x={74} y={160} className="datetime">
          {format("%Y-%M-%DT%h:%m:%.2s%Z:%z", date)}
        </text>
        <text x={66} y={164} className="datetime">
          {format("%Y-%M-%DT%h:%m:%.3s%Z:%z", date)}
        </text>
      </g>
      <g id="rfc-iso">
        <text x={86} y={99} className="datetime">
          {formatUTC("%Y-%M-%Dt%h:%m:%sz", date)}
        </text>
        <text x={82} y={102} className="datetime">
          {format("%Y-%M-%Dt%h:%m:%s%Z:%z", date)}
        </text>

        <text x={96} y={90} className="time">
          {formatUTC("%h:%m:%sZ", date)}
        </text>
        <text x={108} y={111} className="time">
          {formatUTC("%h:%m:%.1sZ", date)}
        </text>
        <text x={88} y={96} className="time">
          {formatUTC("%h:%m:%.2sZ", date)}
        </text>
        <text x={94} y={93} className="time">
          {formatUTC("%h:%m:%.3sZ", date)}
        </text>
        <text x={102} y={108} className="time">
          {format("%h:%m:%s%Z:%z", date)}
        </text>
        <text x={94} y={105} className="time">
          {format("%h:%m:%.3s%Z:%z", date)}
        </text>
      </g>
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
        <text x={110} y={84} className="datetime">
          {format("%Y-%M-%DT%,1h", date)}
        </text>
        <text x={136} y={84} className="datetime">
          {format("%Y-%M-%DT%.1h", date)}
        </text>
        <text x={119.369} y={92} className="datetime">
          {format("%Y-%M-%DT%h:%,1m", date)}
        </text>
        <text x={150.677} y={92} className="datetime">
          {format("%Y-%M-%DT%h:%.1m", date)}
        </text>
        <text x={120} y={96} className="time">
          {format("T%h:%m:%s", date)}
        </text>
        <text x={140} y={96} className="time">
          {formatUTC("T%h:%m:%sZ", date)}
        </text>
        <text x={160} y={96} className="time">
          {format("T%h:%m:%s%Z:%z", date)}
        </text>
        <text x={164} y={100} className="time">
          {format("T%h:%m:%s%Z", date)}
        </text>
        <text x={120} y={100} className="date">
          {format("%Y", date)}
        </text>
        <text x={132} y={100} className="date">
          {format("%X", date)}
        </text>
        <text x={142} y={100} className="date">
          {format("%C", date)}
        </text>
        <text x={148} y={100} className="time">
          {format("%h:%m:%s%Z", date)}
        </text>
        <text x={130} y={88} className="datetime">
          {formatUTC("%Y-%M-%DT%h:%m:%s\u221201:00", date, -60)}
        </text>
        <text x={124} y={104} className="date">
          {format("%Y-%O", date)}
        </text>
        <text x={140} y={104} className="datetime">
          {format("%Y-%OT%h:%m", date)}
        </text>
        <text x={126} y={108} className="datetime">
          {format("%Y-%OT%h:%m:%s", date)}
        </text>
        <text x={166} y={104} className="datetime">
          {format("%Y-%OT%.1h", date)}
        </text>
        <text x={133.259} y={120} className="date">
          {format("%V-W%W-%w", date)}
        </text>
        <text x={160.336} y={120} className="datetime">
          {format("%V-W%W-%wT%h:%m", date)}
        </text>
        <text x={169.336} y={124} className="datetime">
          {format("%V-W%W-%wT%h:%m:%s", date)}
        </text>
        <text x={129.087} y={124} className="datetime">
          {format("%Y-%M-%DT%h:%m:%s.%u", date)}
        </text>

        <text x={128} y={128} className="range">
          {format("%Y/P2M", date)}
        </text>
        <text x={144.336} y={128} className="range">
          {format("%Y-%M/P2M", date)}
        </text>
        <text x={164.336} y={128} className="range">
          {format("%Y-%M-%D/P2M", date)}
        </text>

        <text x={129.336} y={132} className="range">
          {format("%Y-%M-%DT%h/PT2M", date)}
        </text>
        <text x={166} y={132} className="range">
          {format("%Y-%M-%DT%h:%m/PT2M", date)}
        </text>

        <text x={134} y={136} className="range">
          {format("%Y-%M-%DT%h:%m:%s/P3D", date)}
        </text>
        <text x={169.336} y={136} className="range">
          {format("%Y-%M-%DT%h:%m:%s/PT2M", date)}
        </text>


        <text x={160} y={108} className="range">
          {format("%Y-%O/P2M", date)}
        </text>
        <text x={128} y={112} className="range">
          {format("%Y-W%W/P2M", date)}
        </text>
        <text x={184} y={140} className="range">
          {format("%Y-W%W-%w/P2M", date)}
        </text>

        <text x={166} y={116} className="range">
          {format("%Y-%OT%h/PT2M", date)}
        </text>
        <text x={160} y={112} className="range">
          {format("%Y-W%W-%wT%h:%m/PT2M", date)}
        </text>
        <text x={192} y={144} className="range">
          {format("%Y-%M/12", date)}
        </text>

        <text x={116} y={206} className="range">
          {format("%Y-%OT%h:%m:%s/PT3H", date)}
        </text>
        <text x={130} y={116} className="range">
          {format("%Y-W%W-%wT%h:%m:%s/PT2M", date)}
        </text>

        <text x={136} y={140} className="range">
          {format("%Y-%M-%D/28", date)}
        </text>
        <text x={126} y={198} className="range">
          {format("%Y-%M-%D/%Y-12-31", date)}
        </text>
        <text x={120} y={202} className="range">
          {format("%Y-%M-%DT%h/23", date)}
        </text>

        <text x={150} y={206} className="range">
          {format("%Y-%M-%DT%h:%m/59", date)}
        </text>
        <text x={124} y={210} className="range">
          {format("%Y-%M-%DT%h:%m:%s/59", date)}
        </text>

        <text x={142} y={148} className="period">
          {format("P1W", date)}
        </text>
        <text x={140} y={144} className="period">
          {format("P1.5W", date)}
        </text>

        <text x={134} y={148} className="period">
          {"P1Y"}
        </text>
        <text x={138} y={152} className="period">
          {"P1,5Y"}
        </text>
        <text x={134} y={156} className="period">
          {"P1.5Y"}
        </text>

        <text x={134} y={176} className="period">
          {"P2M"}
        </text>
        <text x={132} y={180} className="period">
          {"P2,5M"}
        </text>

        <text x={131} y={184} className="period">
          {"P2.5M"}
        </text>
        <text x={138} y={192} className="period">
          {"P1Y2M"}
        </text>

        <text x={126} y={192} className="period">
          {"P1Y2,5M"}
        </text>
        <text x={132} y={188} className="period">
          {"P1Y2.5M"}
        </text>

        <text x={130} y={195} className="period">
          {"P1Y2.5MT4H"}
        </text>

        <text x={108} y={214} className="range">
          {format("R2/%Y-%O/P1Y2.5MT4H", date)}
        </text>

        <text x={120} y={218} className="range">
          {format("R/%Y-W%W-%wT%h/PT45M", date)}
        </text>

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
          >
            {"By Mutual Agreement"}
            <tspan x={180} dy={8} style={{fontSize:5}}>
              (e.g. agreement on six-digit years)
            </tspan>
            <tspan x={180} dy={7} style={{fontSize:4}}>ISO 8601-2:2019</tspan>
          </text>
          <text   x={136}   y={164} className="date" >
            {format("+00%C", date)}
          </text>
          <text   x={148}   y={164} className="date" >
            {format("+00%Y", date)}
          </text>
          <text   x={154}   y={168} className="date" >
            {format("+00%Y-%M", date)}
          </text>
          <text   x={128}   y={168} className="date" >
            {format("+00%Y-%M-%D", date)}
          </text>
          <text   x={148}   y={172} className="datetime" >
            {format("+00%Y-%M-%DT%h", date)}
          </text>
          <text   x={124}   y={176} className="datetime" >
            {format("+00%Y-%M-%DT%h:%m", date)}
          </text>
          <text   x={148}   y={180} className="datetime" >
            {format("+00%Y-%M-%DT%h:%m:%s", date)}
          </text>
          <text   x={124}   y={184} className="datetime" >
            {format("+00%V-W%W-%wT%h", date)}
          </text>
          <text   x={148}   y={188} className="datetime" >
            {format("+00%V-W%W-%wT%h:%m", date)}
          </text>
          <text   x={124}   y={192} className="datetime" >
            {format("+00%Y-%OT%h", date)}
          </text>
          <text   x={150}   y={192} className="datetime" >
            {format("+00%Y-%OT%h:%m", date)}
          </text>
          <text   x={140}   y={196} className="datetime" >
            {format("+00%Y-%OT%h:%m%Z:%z", date)}
          </text>
          <text   x={128}   y={200} className="datetime" >
            {format("+00%Y-%OT%h:%m:%s", date)}
          </text>
          <text   x={144}   y={204} className="datetime" >
            {format("+00%Y%OT%h%m%s", date)}
          </text>
          <text   x={136}   y={208} className="datetime" >
            {formatUTC("+00%Y%M%DT%h%m%sZ", date)}
          </text>
        </g>
      </g>
      { html && <g id="html" transform="translate(-12 6)">
        <circle
          cx={90}
          cy={155}
          r={55}
          fill="none"
          stroke="#3c790a"
          strokeWidth={0.265}
        />
        <text
          x={45}
          y={216}
          fill="#3c790a"
          className="key-label"
        >
          {"HTML"}
          <tspan dx={-27} dy={6} style={{fontSize:"0.4em"}}>Living Standard</tspan>
        </text>
        <text x={66} y={194} className="date">
          {formatUTC("--%M-%D", date)}
        </text>
        <text x={70} y={198} className="date">
          {formatUTC("%M-%D", date)}
        </text>
        <text x={56} y={178} className="datetime">
          {format("%Y-%M-%D %h:%m", date)}
        </text>
        <text x={52} y={182} className="datetime">
          {format("%Y-%M-%D %h:%m:%s", date)}
        </text>
        <text x={48} y={186} className="datetime">
          {format("%Y-%M-%D %h:%m:%.3s", date)}
        </text>
        <text x={82} y={198} className="period">
          {format("1 D", date)}
        </text>
        <text x={84} y={202} className="period">
          {format("5 M 4 W", date)}
        </text>
      </g>}
      <g id="iso-html">
        <text x={122} y={150} className="period">
          {format("P1D", date)}
        </text>
        <text x={124} y={154} className="period">
          {format("PT1H", date)}
        </text>
        <text x={116} y={158} className="period">
          {format("PT1M", date)}
        </text>
        <text x={126} y={162} className="period">
          {format("PT1S", date)}
        </text>
        <text x={116} y={166} className="period">
          {format("P1DT1H1M", date)}
        </text>
        <text x={112} y={170} className="period">
          {format("P1DT1.1S", date)}
        </text>
        <text x={118} y={174} className="period">
          {format("P1TD1.12S", date)}
        </text>
        <text x={112} y={178} className="period">
          {format("P1DT1.123S", date)}
        </text>
        <text x={100} y={190} className="datetime">
          {format("%Y-%M-%DT%h:%m", date)}
        </text>
        <text x={88} y={178} className="time">
          {format("%h:%m", date)}
        </text>
        <text x={100} y={178} className="time">
          {format("%h:%m:%s", date)}
        </text>
        <text x={90} y={182} className="time">
          {format("%h:%m:%.1s", date)}
        </text>
        <text x={106} y={182} className="time">
          {format("%h:%m:%.3s", date)}
        </text>
        <text x={80} y={186} className="datetime">
          {format("%Y-%M-%DT%h:%m:%s", date)}
        </text>
        <text x={110} y={186} className="date">
          {format("%Y-%M", date)}
        </text>
        <text x={96} y={202} className="date">
          {format("%V-W%W", date)}
        </text>
        <text x={86} y={194} className="datetime">
          {format("%Y-%M-%DT%h:%m:%.3s", date)}
        </text>
      </g>
    </svg>
  )
}

export default Diagram;
