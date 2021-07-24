import * as React from "react"
import { format, formatUTC } from "./format";

function Diagram (props) {
  const { date, ...restProps } = props;

  return (
    <svg
      width="100%"
      maxHidth="100vh"
      viewBox="14.726 53.645 220.993 229.91"
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
        strokeLinecap="round"
      />
      <circle
        cx={134.327}
        cy={148.288}
        r={72.135}
        fill="none"
        stroke="#00f"
        strokeWidth={0.265}
        strokeLinecap="round"
      />
      <text
        x={23.692}
        y={71.5}
        fontWeight={400}
        fontSize={10.583}
        fontFamily="sans-serif"
        fill="#f0f"
        strokeWidth={0.265}
        className="key-label"
      >
        {"RFC 3339"}
      </text>
      <text
        x={161.192}
        y={78.692}
        fontWeight={400}
        fontSize={10.583}
        fontFamily="sans-serif"
        fill="#00f"
        strokeWidth={0.265}
        className="key-label"
      >
        {"ISO 8601"}
      </text>
      <g id="rfc">
        <text
          x={37.292}
          y={112}
        >
          {formatUTC("%Y-%m-%d %H:%M:%SZ", date)}
        </text>
        <text
          x={44.832}
          y={100}
        >
          {formatUTC("%Y-%m-%d_%H:%M:%SZ", date)}
        </text>
        <text
          x={51.601}
          y={88}
        >
          {formatUTC("%Y-%m-%dT%H:%M:%S-00:00", date)}
        </text>
      </g>
      <g id="both">
        <text
          x={75.087}
          y={116}
        >
          {formatUTC("%Y-%m-%dT%H:%M:%SZ", date)}
        </text>
        <text
          x={84.466}
          y={124}
        >
          {formatUTC("%Y-%m-%dt%H:%M:%Sz", date)}
        </text>
        <text
          x={71.963}
          y={132}
        >
          {formatUTC("%Y-%m-%dT%H:%M:%S+00:00", date)}
        </text>
        <text
          x={76}
          y={138}
        >
          {format("%Y-%m-%dT%H:%M:%S%Z:%z", date)}
        </text>
        <text
          x={93.279}
          y={94}
        >
          {format("%Y-%m-%d", date)}
        </text>
        <text
          x={67.098}
          y={144}
        >
          {formatUTC("%Y-%m-%dt%H:%M:%S+00:00", date)}
        </text>
        <text
          x={68}
          y={152}
        >
          {format("%Y-%m-%dt%H:%M:%S%Z:%z", date)}
        </text>
        <text
          x={85.381}
          y={104}
        >
          {formatUTC("%H:%M:%SZ", date)}
        </text>
        <text
          x={93.631}
          y={108}
        >
          {formatUTC("%H:%M:%S.%UZ", date)}
        </text>
      </g>
      <g id="iso">
        <text
          x={123.106}
          y={80}
        >
          {format("%Y-%m-%dT%H:%M", date)}
        </text>
        <text
          x={113.587}
          y={88}
        >
          {format("%Y-%m-%dT%H,5", date)}
        </text>
        <text
          x={143.414}
          y={88}
        >
          {format("%Y-%m-%dT%H.5", date)}
        </text>
        <text
          x={126.139}
          y={92}
        >
          {format("%Y-%m-%dT%H:%M:%S", date)}
        </text>
        <text
          x={119.369}
          y={96}
        >
          {format("%Y-%m-%dT%H:%M,5", date)}
        </text>
        <text
          x={150.677}
          y={96}
        >
          {format("%Y-%m-%dT%H:%M.5", date)}
        </text>
        <text
          x={120}
          y={100}
        >
          {format("T%H:%M:%S", date)}
        </text>
        <text
          x={140}
          y={100}
        >
          {formatUTC("T%H:%M:%SZ", date)}
        </text>
        <text
          x={160}
          y={100}
        >
          {format("T%H:%M:%S%Z:%z", date)}
        </text>
        <text
          x={150}
          y={104}
        >
          {format("T%H:%M:%S%Z", date)}
        </text>
        <text
          x={121.202}
          y={104}
        >
          {format("%Y", date)}
        </text>
        <text
          x={136}
          y={104}
        >
          {format("%C", date)}
        </text>
        <text
          x={144.889}
          y={108}
        >
          {formatUTC("%Y-%m-%dT%H:%M:%S\u221201:00", date, -60)}
        </text>
        <text
          x={125.009}
          y={108}
        >
          {format("%Y-%o", date)}
        </text>
        <text
          x={143.413}
          y={112}
        >
          {format("%Y-%oT%H:%M", date)}
        </text>
        <text
          x={149.971}
          y={116}
        >
          {format("%Y-%oT%H.5", date)}
        </text>
        <text
          x={126.913}
          y={116}
        >
          {format("%G-W%W", date)}
        </text>
        <text
          x={160.336}
          y={120}
        >
          {format("%G-W%W-%wT%H:%M", date)}
        </text>
        <text
          x={133.259}
          y={120}
        >
          {format("%G-W%W-%w", date)}
        </text>
        <text
          x={149.759}
          y={124}
        >
          {format("%G-W%W-%wT%H", date)}
        </text>
      </g>
    </svg>
  )
}

export default Diagram;
