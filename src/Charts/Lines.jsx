import React from 'react';
import Color from 'color';

import { Group } from '@vx/group';
import { AreaClosed, LinePath } from '@vx/shape';

import { transformMultiChartData } from './helpers';
function getFillColor(color) {
  return Color(color).alpha(.5).rgb().string();
}
export default function Lines({ colorMap, data, fillArea, xScale, yScale }){

  const ChartComponent = fillArea === true ? AreaClosed : LinePath;
  
  return (
    <Group>
      {transformMultiChartData(data).map((d, i) => (
        <ChartComponent
          data={d}
          fill={getFillColor(colorMap[i])}
          stroke={colorMap[i]}
          strokeWidth={2}
          key={i}
          x={datum => datum.index}
          y={datum => datum.point}
          xScale={xScale}
          yScale={yScale}
        />
      ))}
    </Group>
  );
}

Lines.defaultProps = {
  colorMap: [],
}