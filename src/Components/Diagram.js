import * as React from "react"
import { format, formatUTC } from "../util/format";

function Diagram (props) {
  const { date, rfc = true, iso = true, html = false, showKey = false, ...restProps } = props;
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
          <text x={58} y={82} className="datetime">
            {formatUTC("%Y-%M-%D_%h:%m:%sZ", date)}
          </text>
          <text x={50} y={88} className="datetime">
            {formatUTC("%Y-%M-%D_%h:%m:%.3sZ", date)}
          </text>
          <text x={46} y={94} className="datetime">
            {formatUTC("%Y-%M-%DT%h:%m:%s-00:00", date)}
          </text>
          <text x={42} y={100} className="datetime">
            {formatUTC("%Y-%M-%Dt%h:%m:%sz", date)}
          </text>
          <text x={32} y={106} className="datetime">
            {format("%Y-%M-%Dt%h:%m:%s%Z:%z", date)}
          </text>
        </g>
      }
      { (rfc || html) &&
        <g id="rfc-html">
          <text x={37} y={128} className="datetime">
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
      }
      { (iso || rfc || html) &&
        <g id="all">
          <text x={76} y={110} className="date">
            {format("%Y-%M-%D", date)}
          </text>
          <text x={72} y={116} className="datetime">
            {formatUTC("%Y-%M-%DT%h:%m:%sZ", date)}
          </text>
          <text x={84} y={122} className="datetime">
            {formatUTC("%Y-%M-%DT%h:%m:%.1sZ", date)}
          </text>
          <text x={70} y={128} className="datetime">
            {formatUTC("%Y-%M-%DT%h:%m:%.2sZ", date)}
          </text>
          <text x={86} y={135} className="datetime">
            {formatUTC("%Y-%M-%DT%h:%m:%.3sZ", date)}
          </text>
          <text x={68} y={140} className="datetime">
            {formatUTC("%Y-%M-%DT%h:%m:%s+00:00", date)}
          </text>
          <text x={84} y={145} className="datetime">
            {formatUTC("%Y-%M-%DT%h:%m:%.1s+00:00", date)}
          </text>
          <text x={64} y={150} className="datetime">
            {format("%Y-%M-%DT%h:%m:%s%Z:%z", date)}
          </text>
          <text x={74} y={155} className="datetime">
            {format("%Y-%M-%DT%h:%m:%.1s%Z:%z", date)}
          </text>
          <text x={70} y={160} className="datetime">
            {format("%Y-%M-%DT%h:%m:%.2s%Z:%z", date)}
          </text>
          <text x={65} y={165} className="datetime">
            {format("%Y-%M-%DT%h:%m:%.3s%Z:%z", date)}
          </text>
        </g>
      }
      { (iso || rfc) &&
        <g id="rfc-iso">

          <text x={96} y={90} className="time">
            {formatUTC("%h:%m:%sZ", date)}
          </text>
          <text x={90} y={95} className="time">
            {formatUTC("%h:%m:%.3sZ", date)}
          </text>
          <text x={98} y={100} className="time">
            {formatUTC("%h:%m:%.2sZ", date)}
          </text>
          <text x={82} y={105} className="time">
            {format("%h:%m:%.3s%Z:%z", date)}
          </text>
          <text x={102} y={110} className="time">
            {format("%h:%m:%s%Z:%z", date)}
          </text>
          <text x={109} y={115} className="time">
            {formatUTC("%h:%m:%.1sZ", date)}
          </text>
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
          <text x={110} y={84} className="datetime">
            {format("%Y-%M-%DT%,1h", date)}
          </text>
          <text x={136} y={84} className="datetime">
            {format("%Y-%M-%DT%.1h", date)}
          </text>
          <text x={126} y={88} className="datetime">
            {formatUTC("%Y-%M-%DT%h:%m:%s\u221201:00", date, -60)}
          </text>
          <text x={116} y={92} className="datetime">
            {format("%Y-%M-%DT%h:%,1m", date)}
          </text>
          <text x={148} y={92} className="datetime">
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
          <text x={124} y={104} className="date">
            {format("%Y-%O", date)}
          </text>
          <text x={140} y={104} className="datetime">
            {format("%Y-%OT%h:%m", date)}
          </text>
          <text x={166} y={104} className="datetime">
            {format("%Y-%OT%.1h", date)}
          </text>
          <text x={126} y={108} className="datetime">
            {format("%Y-%OT%h:%m:%s", date)}
          </text>
          <text x={164} y={108} className="range">
            {format("%Y-%O/P2M", date)}
          </text>
          <text x={128} y={112} className="range">
            {format("%Y-W%W/P2M", date)}
          </text>

          <text x={166} y={116} className="range">
            {format("%Y-%OT%h/PT2M", date)}
          </text>
          <text x={160} y={112} className="range">
            {format("%Y-W%W-%wT%h:%m/PT2M", date)}
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

          <text x={128} y={136} className="range">
            {format("%Y-%M-%DT%h:%m:%s/P3D", date)}
          </text>
          <text x={170} y={136} className="range">
            {format("%Y-%M-%DT%h:%m:%s/PT2M", date)}
          </text>

          <text x={134} y={140} className="range">
            {format("%Y-%M-%D/28", date)}
          </text>

          <text x={184} y={140} className="range">
            {format("%Y-W%W-%w/P2M", date)}
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

          <text x={132} y={144} className="period">
            {"P1Y"}
          </text>
          <text x={140} y={144} className="period">
            {"P1.5W"}
          </text>

          <text x={134} y={150} className="period">
            {"P1,5Y"}
          </text>

          <text x={134} y={156} className="period">
            {"P1.5Y"}
          </text>

          <text x={134} y={162} className="period">
            {"P2M"}
          </text>

          <text x={133.5} y={170} className="period">
            {"P1W"}
          </text>

          <text x={132} y={176} className="period">
            {"P2.5M"}
          </text>

          <text x={131} y={181} className="period">
            {"P2,5M"}
          </text>

          <text x={132} y={186} className="period">
            {"P1Y2.5M"}
          </text>

          <text x={138} y={191} className="period">
            {"P1Y2M"}
          </text>
          <text x={126} y={191} className="period">
            {"P1Y2,5M"}
          </text>

          <text x={126} y={196} className="range">
            {format("%Y-%M-%D/%Y-12-31", date)}
          </text>

          <text x={120} y={201} className="range">
            {format("%Y-%M-%DT%h/23", date)}
          </text>
          <text x={148} y={201} className="period">
            {"P1Y2.5MT4H"}
          </text>

          <text x={150} y={206} className="range">
            {format("%Y-%M-%DT%h:%m/59", date)}
          </text>

          <text x={104} y={212} className="range">
            {format("%Y-%M-%DT%h:%m:%s/59", date)}
          </text>
          <text x={135} y={212} className="range">
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
            </text>
            <text   x={136}   y={164} className="date" >
              {format("+00%C", date)}
            </text>
            <text   x={144}   y={160} className="date" >
              {format("+00%X", date)}
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
            <text   x={130}   y={172} className="date" >
              {format("+00%Y%M%D", date)}
            </text>
            <text   x={148}   y={172} className="datetime" >
              {format("+00%Y-%M-%DT%h", date)}
            </text>
            <text   x={156}   y={176} className="date" >
              {format("+00%Y%M", date)}
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
            <text   x={154}   y={184} className="datetime" >
              {format("+00%Y-%OT%h:%m", date)}
            </text>
            <text   x={138}   y={188} className="datetime" >
              {format("+00%V-W%W-%wT%h:%m", date)}
            </text>
            <text   x={124}   y={192} className="datetime" >
              {format("+00%Y-%OT%h", date)}
              </text>
            <text   x={148}   y={192} className="datetime" >
              {format("+00%Y%OT%.3h", date)}
              </text>
            <text   x={130}   y={197} className="datetime" >
              {format("+00%Y-%OT%h:%m%Z:%z", date)}
            </text>
            <text   x={128}   y={202} className="datetime" >
              {format("+00%Y-%OT%h:%m:%s", date)}
            </text>
            <text   x={144}   y={207} className="datetime" >
              {format("+00%Y%OT%h%m%s", date)}
            </text>
            <text   x={136}   y={212} className="datetime" >
              {formatUTC("+00%Y%M%DT%h%m%sZ", date)}
            </text>
          </g>
        </g>
      }
      { html &&
        <g id="html" transform="translate(-12 6)">
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
            <tspan dx={-28} dy={6} style={{fontSize:"0.4em"}}>Living Standard</tspan>
          </text>
          <text x={42} y={172} className="datetime">
            {format("%Y-%M-%D %h:%m", date)}
          </text>
          <text x={50} y={178} className="datetime">
            {format("%Y-%M-%D %h:%m:%s", date)}
          </text>
          <text x={54} y={184} className="datetime">
            {format("%Y-%M-%D %h:%m:%.3s", date)}
          </text>
          <text x={68} y={190} className="date">
            {formatUTC("--%M-%D", date)}
          </text>
          <text x={74} y={196} className="date">
            {formatUTC("%M-%D", date)}
          </text>
          <text x={88} y={196} className="period">
            {format("1 D", date)}
          </text>
          <text x={82} y={202} className="period">
            {format("5 M 4 W", date)}
          </text>
        </g>
      }
      { (iso || html) &&
        <g id="iso-html">
          <text x={123} y={144} className="period">
            {format("P1D", date)}
          </text>
          <text x={124} y={150} className="period">
            {format("PT1H", date)}
          </text>
          <text x={124} y={156} className="period">
            {format("PT1M", date)}
          </text>
          <text x={116} y={162} className="period">
            {format("P1DT1H1M", date)}
          </text>
          <text x={106} y={168} className="period">
            {format("P1DT1.1S", date)}
          </text>
          <text x={124} y={168} className="period">
            {format("PT1S", date)}
          </text>
          <text x={116} y={174} className="period">
            {format("P1TD1.12S", date)}
          </text>
          <text x={100} y={174} className="time">
            {format("%h:%m:%s", date)}
          </text>
          <text x={70} y={180} className="time">
            {format("%h:%m", date)}
          </text>
          <text x={80} y={180} className="time">
            {format("%h:%m:%.1s", date)}
          </text>
          <text x={94} y={180} className="time">
            {format("%h:%m:%.3s", date)}
          </text>
          <text x={112} y={180} className="period">
            {format("P1DT1.123S", date)}
          </text>
          <text x={80} y={186} className="datetime">
            {format("%Y-%M-%DT%h:%m:%s", date)}
          </text>
          <text x={114} y={186} className="date">
            {format("%Y-%M", date)}
          </text>
          <text x={100} y={192} className="datetime">
            {format("%Y-%M-%DT%h:%m", date)}
          </text>
          <text x={85} y={198} className="datetime">
            {format("%Y-%M-%DT%h:%m:%.3s", date)}
          </text>
          <text x={94} y={204} className="date">
            {format("%V-W%W", date)}
          </text>
        </g>
      }
    </svg>
  )
}

export default Diagram;
