import React from 'react';

import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';

import { dataIsDeep } from './helpers';

export default function Lines({ colorMap, data, xScale, yScale }){
  
  let dataArr = dataIsDeep(data)
    ? data
    : [data];
  
  /**
   * this is gross, but vx doesn't call x or y functions with index
   * https://github.com/hshoff/vx/issues/295
   */
  const dataTransformed = dataArr.map(arr => arr.map((point,index) => ({
    point,
    index,
  })));

  return (
    <Group>
      {dataTransformed.map((d, i) => (
        <LinePath
          data={d}
          stroke={colorMap[i]}
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