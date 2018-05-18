import React from 'react';

import { Bar } from '@vx/shape';
import { Group } from '@vx/group';

export default function Bars({ data, height, yScale, selectedIndex, width}) {
  const calculatedWidth = width / data.length ;

  return (
    <Group>
      {data.map((point, index) => (
        <Bar
          key={index}
          fill={selectedIndex === index ? 'red' : 'blue'}
          x={index * calculatedWidth}
          y={height  - yScale(point)}
          width={calculatedWidth}
          height={yScale(point)}
        />
      ))}
    </Group>
  );
}
