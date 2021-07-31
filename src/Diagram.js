import * as React from "react"
import { format, formatUTC } from "./format";

function Diagram (props) {
  const { date, ...restProps } = props;

  return (
    <svg
      viewBox="14.726 53.645 220.993 190.91"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <circle
        cx={77.317}
        cy={118.673}
        r={43.788}
        fill="none"
        stroke="#f0f"
        strokeWidth={0.372}
      />
      <circle
        cx={134.327}
        cy={148.288}
        r={72.135}
        fill="none"
        stroke="#00f"
        strokeWidth={0.265}
      />
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
        x={23.692}
        y={71.5}
        fill="#f0f"
        className="key-label"
      >
        {"RFC 3339"}
      </text>
      <text
        x={161.192}
        y={78.692}
        fill="#00f"
        className="key-label"
      >
        {"ISO 8601"}
      </text>
      <text
        x={157.192}
        y={226.692}
        fill="#666"
        className="key-label"
        style={{fontSize:8}}
      >
        {"By Mutual Agreement"}
        <tspan x={157.192} y={234} style={{fontSize:5}}>
          (e.g. agreement on six-digit years)
        </tspan>
      </text>
      <g id="rfc">
        <text x={56} y={84}>
          {formatUTC("%Y-%m-%d %H:%M:%SZ", date)}
        </text>
        <text x={52} y={92}>
          {formatUTC("%Y-%m-%d %H:%M:%S.%UZ", date)}
        </text>
        <text x={44.832} y={100}>
          {formatUTC("%Y-%m-%d_%H:%M:%SZ", date)}
        </text>
        <text x={40} y={108}>
          {formatUTC("%Y-%m-%d_%H:%M:%S.%UZ", date)}
        </text>
        <text x={36} y={116}>
          {formatUTC("%Y-%m-%dT%H:%M:%S-00:00", date)}
        </text>
      </g>
      <g id="both">
        <text x={75.087} y={116}>
          {formatUTC("%Y-%m-%dT%H:%M:%SZ", date)}
        </text>
        <text x={84.466} y={124}>
          {formatUTC("%Y-%m-%dt%H:%M:%Sz", date)}
        </text>
        <text x={71.963} y={132}>
          {formatUTC("%Y-%m-%dT%H:%M:%S+00:00", date)}
        </text>
        <text x={76} y={138}>
          {format("%Y-%m-%dT%H:%M:%S%Z:%z", date)}
        </text>
        <text x={93.279} y={94}>
          {format("%Y-%m-%d", date)}
        </text>
        <text x={67.098} y={144}>
          {formatUTC("%Y-%m-%dt%H:%M:%S+00:00", date)}
        </text>
        <text x={68} y={152}>
          {format("%Y-%m-%dt%H:%M:%S%Z:%z", date)}
        </text>
        <text x={85.381} y={104}>
          {formatUTC("%H:%M:%SZ", date)}
        </text>
        <text x={93.631} y={108}>
          {formatUTC("%H:%M:%S.%UZ", date)}
        </text>
      </g>
      <g id="iso">
        <text x={123.106} y={80}>
          {format("%Y-%m-%dT%H:%M", date)}
        </text>
        <text x={118.106} y={84}>
          {format("%Y-%m", date)}
        </text>
        <text x={138.106} y={84}>
          {format("%H:%M:%S", date)}
        </text>
        <text x={113.587} y={88}>
          {format("%Y-%m-%dT%H,5", date)}
        </text>
        <text x={143.414} y={88}>
          {format("%Y-%m-%dT%H.5", date)}
        </text>
        <text x={126.139} y={92}>
          {format("%Y-%m-%dT%H:%M:%S", date)}
        </text>
        <text x={119.369} y={96}>
          {format("%Y-%m-%dT%H:%M,5", date)}
        </text>
        <text x={150.677} y={96}>
          {format("%Y-%m-%dT%H:%M.5", date)}
        </text>
        <text x={120} y={100}>
          {format("T%H:%M:%S", date)}
        </text>
        <text x={140} y={100}>
          {formatUTC("T%H:%M:%SZ", date)}
        </text>
        <text x={160} y={100}>
          {format("T%H:%M:%S%Z:%z", date)}
        </text>
        <text x={150} y={104}>
          {format("T%H:%M:%S%Z", date)}
        </text>
        <text x={121.202} y={104}>
          {format("%Y", date)}
        </text>
        <text x={136} y={104}>
          {format("%C", date)}
        </text>
        <text x={144.889} y={108}>
          {formatUTC("%Y-%m-%dT%H:%M:%S\u221201:00", date, -60)}
        </text>
        <text x={125.009} y={108}>
          {format("%Y-%o", date)}
        </text>
        <text x={123.413} y={112}>
          {format("%Y-%oT%H:%M", date)}
        </text>
        <text x={153.413} y={112}>
          {format("%Y-%oT%H:%M:%S", date)}
        </text>
        <text x={149.971} y={116}>
          {format("%Y-%oT%H.5", date)}
        </text>
        <text x={126.913} y={116}>
          {format("%G-W%W", date)}
        </text>
        <text x={133.259} y={120}>
          {format("%G-W%W-%w", date)}
        </text>
        <text x={160.336} y={120}>
          {format("%G-W%W-%wT%H:%M", date)}
        </text>
        <text x={169.336} y={124}>
          {format("%G-W%W-%wT%H:%M:%S", date)}
        </text>

        <text x={124.336} y={128}>
          {format("%Y/P2M", date)}
        </text>
        <text x={144.336} y={128}>
          {format("%Y-%m/P2M", date)}
        </text>
        <text x={164.336} y={128}>
          {format("%Y-%m-%d/P2M", date)}
        </text>

        <text x={129.336} y={132}>
          {format("%Y-%m-%dT%H/PT2M", date)}
        </text>
        <text x={164.336} y={132}>
          {format("%Y-%m-%dT%H:%M/PT2M", date)}
        </text>

        <text x={125.336} y={136}>
          {format("%Y-%m-%dT%H:%M:%S/PT3D", date)}
        </text>
        <text x={169.336} y={136}>
          {format("%Y-%m-%dT%H:%M:%S/PT2M", date)}
        </text>


        <text x={120.336} y={140}>
          {format("%Y-%o/P2M", date)}
        </text>
        <text x={144.336} y={140}>
          {format("%Y-W%W/P2M", date)}
        </text>
        <text x={169.336} y={140}>
          {format("%Y-W%W-%w/P2M", date)}
        </text>

        <text x={116.336} y={144}>
          {format("%Y-%oT%H/PT2M", date)}
        </text>
        <text x={149.336} y={144}>
          {format("%Y-W%W-%wT%H:%M/PT2M", date)}
        </text>
        <text x={184.336} y={144}>
          {format("%Y-%m/12", date)}
        </text>

        <text x={114.336} y={148}>
          {format("%Y-%oT%H:%M:%S/PT3D", date)}
        </text>
        <text x={154.336} y={148}>
          {format("%Y-W%W-%wT%H:%M:%S/PT2M", date)}
        </text>

        <text x={109.336} y={152}>
          {format("%Y-%m-%d/28", date)}
        </text>
        <text x={134.336} y={152}>
          {format("%Y-%m-%d/%Y-12-31", date)}
        </text>
        <text x={169.336} y={152}>
          {format("%Y-%m-%dT%H/23", date)}
        </text>

        <text x={104.336} y={156}>
          {format("%Y-%m-%dT%H:%M/59", date)}
        </text>
        <text x={164.336} y={156}>
          {format("%Y-%m-%dT%H:%M:%S/59", date)}
        </text>


        <text x={99.336} y={160}>
          {"P1Y"}
        </text>
        <text x={109.336} y={160}>
          {"P1,5Y"}
        </text>
        <text x={119.336} y={160}>
          {"P1.5Y"}
        </text>

        <text x={69.336} y={168}>
          {"P2M"}
        </text>
        <text x={84.336} y={168}>
          {"P2,5M"}
        </text>
        <text x={99.336} y={168}>
          {"P2.5M"}
        </text>
        <text x={114.336} y={168}>
          {"P1Y2M"}
        </text>

        <text x={75.336} y={176}>
          {"P1Y2,5M"}
        </text>
        <text x={89.336} y={176}>
          {"P1Y2.5M"}
        </text>
        <text x={104.336} y={176}>
          {"P1Y2.5MT4H"}
        </text>

        <text x={79.336} y={184}>
          {format("R2/%Y-%o/P1Y2.5MT4H", date)}
        </text>

        <text x={85.336} y={192}>
          {format("R/%Y-W%W-%wT%H/PT45M", date)}
        </text>

        <g id="iso-mutual">
          <text   x={140}   y={164}  >
            {format("+00%C", date)}
          </text>
          <text   x={144}   y={168}  >
            {format("+00%Y", date)}
          </text>
          <text   x={154}   y={172}  >
            {format("+00%Y-%m", date)}
          </text>
          <text   x={128}   y={172}  >
            {format("+00%Y-%m-%d", date)}
          </text>
          <text   x={148}   y={176}  >
            {format("+00%Y-%m-%dT%H", date)}
          </text>
          <text   x={124}   y={180}  >
            {format("+00%Y-%m-%dT%H:%M", date)}
          </text>
          <text   x={148}   y={184}  >
            {format("+00%Y-%m-%dT%H:%M:%S", date)}
          </text>
          <text   x={124}   y={188}  >
            {format("+00%G-W%W-%wT%H", date)}
          </text>
          <text   x={148}   y={192}  >
            {format("+00%G-W%W-%wT%H:%M", date)}
          </text>
          <text   x={124}   y={196}  >
            {format("+00%Y-%oT%H", date)}
          </text>
          <text   x={148}   y={200}  >
            {format("+00%Y-%oT%H:%M", date)}
          </text>
          <text   x={132}   y={204}  >
            {format("+00%Y-%oT%H:%M:%S", date)}
          </text>
        </g>
      </g>
    </svg>
  )
}

export default Diagram;
