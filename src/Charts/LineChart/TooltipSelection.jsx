import React from 'react';
import { Group } from '@vx/group';

export default function LineChartTooltipSelection({ colorMap, current, index, xScale, yScale }) {
  if (index >= 0) {
    const scaled = current.map(d => yScale(d));
    const indexLoc = xScale(index);
    return (
      <Group>
        {scaled.map((y, i) => (
          <circle 
            key={i}
            cx={indexLoc} 
            cy={y}
            r={5}
            fill={colorMap[i]}
          />
        ))}
      </Group>
    );
  }
  return null;
}