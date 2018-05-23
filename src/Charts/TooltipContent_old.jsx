import React from 'react';

const tooltipWidth = 300;
const headerHeight = 30;
const outerPadding = 10;
const metricColumnWidth = 110;
const fontSize = 12;
const radius = 5;

const GROUPING_LABEL_STYLE = {
  // fontFamily: sansSerif,
  fontSize,
  hyphens: 'auto',
  lineHeight: 1.3,
  marginTop: '4px',
  wordWrap: 'break-word',
};

const values = [
  'Check it',
  'Another One',
].reverse();

const data = [{
  color: 'blue',
  label: 'dude man',
}, {
  color: 'red',
  label: 'man dude',
}]

export default function TooltipContent({ height }) {
  const ttHeight = 42 + (42 * data.length) + 5;
  const transformY = ((height - ttHeight) / 2) + 20;

  return (
    <g transform={`translate(0, ${transformY})`}>
      <rect
        height={ttHeight}
        fill='white'
        fillOpacity='0.9'
        stroke='rgba(0, 0, 0, .1)'
        strokeWidth={1}
        width={tooltipWidth}
      />
      <rect
        height={headerHeight}
        style={{
          // fill: PACIFIC_STORM[50],
          fill: 'gray',
        }}
        width={tooltipWidth}
      />
      <line
        x1={0}
        x2={tooltipWidth}
        y1={headerHeight}
        y2={headerHeight}
        style={{
          // stroke: PACIFIC_STORM[100],
          stroke: 'black',
          strokeWidth: 1,
        }}
      />
      <text
        style={{ fontSize }}
        x={outerPadding}
        y={20}
      >
        sucka
      </text>
      {values.map((metric, m) => (
        <text
          key={metric}
          x={tooltipWidth - outerPadding - (metricColumnWidth * m)}
          y={20}
          style={{ fontSize }}
          textAnchor="end"
        >
          {metric}
        </text>
      ))}
      {data.map(({ color, label }, i) => (
        <g transform={`translate(0, ${42 + (i * 42)})`}>
          <g>
            <circle
              cx={outerPadding + radius}
              cy={outerPadding - radius}
              r={radius}
              fill={color}
            />
            <foreignObject
              x={25}
              y={-7}
              width={180}
            >
              <div
                style={GROUPING_LABEL_STYLE}
              >
                {label.length > 55
                  ? `${label.substring(0, 52)}...`
                  : label
                }
              </div>
            </foreignObject>
            {values.map((metric, m) => (
              <text
                key={metric}
                x={tooltipWidth - outerPadding - (metricColumnWidth * m)}
                y={4}
                style={{
                  fontSize,
                }}
                textAnchor="end"
              >
                text
              </text>
            ))}
          </g>
        </g>
      ))}
    </g>
  );
}