import React from 'react';

import { LinePath } from '@vx/shape';

export default function Bars({ data, xScale, yScale }){
  
  // this is gross, but vx doesn't call x or y functions with index
  // https://github.com/hshoff/vx/issues/295
  const dataTransformed = data.map((point,index) => ({
    point,
    index,
  }))

  return (
    <LinePath
      data={dataTransformed}
      x={datum => datum.index}
      y={datum => datum.point}
      xScale={xScale}
      yScale={yScale}
    />
  );
}
