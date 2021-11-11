import * as React from "react"
import { format, formatUTC } from "./format";

function Diagram (props) {
  const { date, html, ...restProps } = props;

  return (
    <svg
      viewBox="14.726 53.645 220.993 190.91"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
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
      <g id="rfc" transform="translate(0 6)">
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
        <text x={54} y={84}>
          {formatUTC("%Y-%M-%D_%h:%m:%sZ", date)}
        </text>
        <text x={46} y={90}>
          {formatUTC("%Y-%M-%D_%h:%m:%.3sZ", date)}
        </text>
        <text x={40} y={96}>
          {formatUTC("%Y-%M-%DT%h:%m:%s-00:00", date)}
        </text>
      </g>
      <g id="rfc-html">
        <text x={36} y={132}>
          {formatUTC("%Y-%M-%D %h:%m:%sZ", date)}
        </text>
        <text x={32} y={136}>
          {formatUTC("%Y-%M-%D %h:%m:%.3sZ", date)}
        </text>
        <text x={29} y={144}>
          {format("%Y-%M-%D %h:%m:%s%Z:%z", date)}
        </text>
        {/* <text x={30} y={148}>
          {format("%Y-%M-%D %h:%m:%.3s%Z:%z", date)}
        </text> */}
      </g>
      <g id="all">
        <text x={76} y={112}>
          {format("%Y-%M-%D", date)}
        </text>
        <text x={72} y={120}>
          {formatUTC("%h:%m:%sZ", date)}
        </text>
        <text x={92} y={120}>
          {formatUTC("%h:%m:%.1sZ", date)}
        </text>
        <text x={76} y={124}>
          {formatUTC("%h:%m:%.2sZ", date)}
        </text>
        <text x={96} y={124}>
          {formatUTC("%h:%m:%.3sZ", date)}
        </text>
        <text x={78} y={132}>
          {format("%h:%m:%s%Z:%z", date)}
        </text>
        <text x={94} y={136}>
          {format("%h:%m:%.3s%Z:%z", date)}
        </text>
        <text x={72} y={140}>
          {formatUTC("%Y-%M-%DT%h:%m:%sZ", date)}
        </text>
        <text x={82} y={144}>
          {formatUTC("%Y-%M-%DT%h:%m:%.3sZ", date)}
        </text>
        <text x={71.963} y={152}>
          {formatUTC("%Y-%M-%DT%h:%m:%s+00:00", date)}
        </text>
        <text x={67.098} y={156}>
          {formatUTC("%Y-%M-%Dt%h:%m:%s+00:00", date)}
        </text>
        <text x={72} y={164}>
          {format("%Y-%M-%DT%h:%m:%s%Z:%z", date)}
        </text>
        <text x={68} y={168}>
          {format("%Y-%M-%DT%h:%m:%.3s%Z:%z", date)}
        </text>
      </g>
      <g id="rfc-iso">
        <text x={86} y={99}>
          {formatUTC("%Y-%M-%Dt%h:%m:%sz", date)}
        </text>
        <text x={82} y={103}>
          {format("%Y-%M-%Dt%h:%m:%s%Z:%z", date)}
        </text>
      </g>
      <g id="iso">
        <text x={110} y={84}>
          {format("%Y-%M-%DT%,1h", date)}
        </text>
        <text x={136} y={84}>
          {format("%Y-%M-%DT%.1h", date)}
        </text>
        <text x={119.369} y={92}>
          {format("%Y-%M-%DT%h:%,1m", date)}
        </text>
        <text x={150.677} y={92}>
          {format("%Y-%M-%DT%h:%.1m", date)}
        </text>
        <text x={120} y={96}>
          {format("T%h:%m:%s", date)}
        </text>
        <text x={140} y={96}>
          {formatUTC("T%h:%m:%sZ", date)}
        </text>
        <text x={160} y={96}>
          {format("T%h:%m:%s%Z:%z", date)}
        </text>
        <text x={164} y={100}>
          {format("T%h:%m:%s%Z", date)}
        </text>
        <text x={120} y={100}>
          {format("%Y", date)}
        </text>
        <text x={132} y={100}>
          {format("%X", date)}
        </text>
        <text x={144} y={100}>
          {format("%C", date)}
        </text>
        <text x={156} y={100}>
          {format("%L", date)}
        </text>
        <text x={130} y={88}>
          {formatUTC("%Y-%M-%DT%h:%m:%s\u221201:00", date, -60)}
        </text>
        <text x={124} y={104}>
          {format("%Y-%O", date)}
        </text>
        <text x={140} y={104}>
          {format("%Y-%OT%h:%m", date)}
        </text>
        <text x={126} y={108}>
          {format("%Y-%OT%h:%m:%s", date)}
        </text>
        <text x={166} y={104}>
          {format("%Y-%OT%.1h", date)}
        </text>
        <text x={133.259} y={120}>
          {format("%V-W%W-%w", date)}
        </text>
        <text x={160.336} y={120}>
          {format("%V-W%W-%wT%h:%m", date)}
        </text>
        <text x={169.336} y={124}>
          {format("%V-W%W-%wT%h:%m:%s", date)}
        </text>
        <text x={129.087} y={124}>
          {format("%Y-%M-%DT%h:%m:%s.%u", date)}
        </text>

        <text x={128} y={128}>
          {format("%Y/P2M", date)}
        </text>
        <text x={144.336} y={128}>
          {format("%Y-%M/P2M", date)}
        </text>
        <text x={164.336} y={128}>
          {format("%Y-%M-%D/P2M", date)}
        </text>

        <text x={129.336} y={132}>
          {format("%Y-%M-%DT%h/PT2M", date)}
        </text>
        <text x={166} y={132}>
          {format("%Y-%M-%DT%h:%m/PT2M", date)}
        </text>

        <text x={134} y={136}>
          {format("%Y-%M-%DT%h:%m:%s/P3D", date)}
        </text>
        <text x={169.336} y={136}>
          {format("%Y-%M-%DT%h:%m:%s/PT2M", date)}
        </text>


        <text x={160} y={108}>
          {format("%Y-%O/P2M", date)}
        </text>
        <text x={128} y={112}>
          {format("%Y-W%W/P2M", date)}
        </text>
        <text x={184} y={140}>
          {format("%Y-W%W-%w/P2M", date)}
        </text>

        <text x={166} y={116}>
          {format("%Y-%OT%h/PT2M", date)}
        </text>
        <text x={160} y={112}>
          {format("%Y-W%W-%wT%h:%m/PT2M", date)}
        </text>
        <text x={192} y={144}>
          {format("%Y-%M/12", date)}
        </text>

        <text x={116} y={206}>
          {format("%Y-%OT%h:%m:%s/PT3H", date)}
        </text>
        <text x={130} y={116}>
          {format("%Y-W%W-%wT%h:%m:%s/PT2M", date)}
        </text>

        <text x={136} y={140}>
          {format("%Y-%M-%D/28", date)}
        </text>
        <text x={148} y={202}>
          {format("%Y-%M-%D/%Y-12-31", date)}
        </text>
        <text x={120} y={202}>
          {format("%Y-%M-%DT%h/23", date)}
        </text>

        <text x={150} y={206}>
          {format("%Y-%M-%DT%h:%m/59", date)}
        </text>
        <text x={124} y={210}>
          {format("%Y-%M-%DT%h:%m:%s/59", date)}
        </text>


        <text x={134} y={182}>
          {"P1Y"}
        </text>
        <text x={130} y={186}>
          {"P1,5Y"}
        </text>
        <text x={138} y={186}>
          {"P1.5Y"}
        </text>

        <text x={128} y={190}>
          {"P2M"}
        </text>
        <text x={136} y={190}>
          {"P2,5M"}
        </text>

        <text x={128} y={194}>
          {"P2.5M"}
        </text>
        <text x={140} y={194}>
          {"P1Y2M"}
        </text>

        <text x={126} y={198}>
          {"P1Y2,5M"}
        </text>
        <text x={146} y={198}>
          {"P1Y2.5M"}
        </text>

        <text x={144} y={214}>
          {"P1Y2.5MT4H"}
        </text>

        <text x={108} y={214}>
          {format("R2/%Y-%O/P1Y2.5MT4H", date)}
        </text>

        <text x={120} y={218}>
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
          <text   x={136}   y={164}  >
            {format("+00%C", date)}
          </text>
          <text   x={148}   y={164}  >
            {format("+00%Y", date)}
          </text>
          <text   x={154}   y={168}  >
            {format("+00%Y-%M", date)}
          </text>
          <text   x={128}   y={168}  >
            {format("+00%Y-%M-%D", date)}
          </text>
          <text   x={148}   y={172}  >
            {format("+00%Y-%M-%DT%h", date)}
          </text>
          <text   x={124}   y={176}  >
            {format("+00%Y-%M-%DT%h:%m", date)}
          </text>
          <text   x={148}   y={180}  >
            {format("+00%Y-%M-%DT%h:%m:%s", date)}
          </text>
          <text   x={124}   y={184}  >
            {format("+00%V-W%W-%wT%h", date)}
          </text>
          <text   x={148}   y={188}  >
            {format("+00%V-W%W-%wT%h:%m", date)}
          </text>
          <text   x={124}   y={192}  >
            {format("+00%Y-%OT%h", date)}
          </text>
          <text   x={150}   y={192}  >
            {format("+00%Y-%OT%h:%m", date)}
          </text>
          <text   x={140}   y={196}  >
            {format("+00%Y-%OT%h:%m%Z:%z", date)}
          </text>
          <text   x={128}   y={200}  >
            {format("+00%Y-%OT%h:%m:%s", date)}
          </text>
          <text   x={144}   y={204}  >
            {format("+00%Y%OT%h%m%s", date)}
          </text>
          <text   x={136}   y={208}  >
            {formatUTC("+00%Y%M%DT%h%m%sZ", date)}
          </text>
        </g>
      </g>
      { html && <g id="html" transform="translate(-10 4)">
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
        <text x={66} y={194}>
          {formatUTC("--%M-%D", date)}
        </text>
        <text x={52} y={182}>
          {format("%Y-%M-%D %h:%m:%s", date)}
        </text>
        <text x={48} y={186}>
          {format("%Y-%M-%D %h:%m:%.3s", date)}
        </text>
      </g>}
      <g id="iso-html">
        <text x={126} y={142}>
          {format("P1D", date)}
        </text>
        <text x={125} y={146}>
          {format("P1W", date)}
        </text>
        <text x={122} y={150}>
          {format("P1.5W", date)}
        </text>
        <text x={124} y={154}>
          {format("PT1H", date)}
        </text>
        <text x={120} y={158}>
          {format("PT1M", date)}
        </text>
        <text x={128} y={158}>
          {format("PT1S", date)}
        </text>
        <text x={116} y={162}>
          {format("P1DT1H1M", date)}
        </text>
        <text x={112} y={166}>
          {format("P1DT1.1S", date)}
        </text>
        <text x={118} y={170}>
          {format("P1TD1.12S", date)}
        </text>
        <text x={112} y={174}>
          {format("P1DT1.123S", date)}
        </text>
        <text x={100} y={190}>
          {format("%Y-%M-%DT%h:%m", date)}
        </text>
        <text x={100} y={178}>
          {format("%h:%m:%s", date)}
        </text>
        <text x={90} y={182}>
          {format("%h:%m:%.1s", date)}
        </text>
        <text x={106} y={182}>
          {format("%h:%m:%.3s", date)}
        </text>
        <text x={80} y={186}>
          {format("%Y-%M-%DT%h:%m:%s", date)}
        </text>
        <text x={110} y={186}>
          {format("%Y-%M", date)}
        </text>
        <text x={96} y={202}>
          {format("%V-W%W", date)}
        </text>
        <text x={86} y={194}>
          {format("%Y-%M-%DT%h:%m:%.3s", date)}
        </text>
      </g>
    </svg>
  )
}

export default Diagram;
