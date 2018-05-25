import React from 'react';
import { AxisLeft as VXAxisLeft} from '@vx/axis';

import {
  axisStroke,
  yAxisWidth,
} from './constants';

// this is a bit funky since it is not exported from @vx/axis
const tickLabelPropsLeft = {
  dx: '-0.25em',
  dy: '0.25em',
  textAnchor: 'end',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: 'red'
};

export default function AxisLeft({ label, scale }) {
  return (
    <VXAxisLeft
      scale={scale}
      label={label}
      left={yAxisWidth}
      numTicks={5}
      stroke={axisStroke}
      tickLabelProps={() => tickLabelPropsLeft}
      tickStroke={axisStroke}
    />
  );
}