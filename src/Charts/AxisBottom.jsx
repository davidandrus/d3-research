import React from 'react';
import { AxisBottom as VXAxisBottom } from '@vx/axis';

import {
  axisStroke,
  yAxisWidth,
} from './constants';

const tickLabelProps = {
  fill: 'red',
  fontSize: 10,
  textAnchor: 'middle',
};

const labelProps = {
  fontSize: 10,
};


export default function AxisBottom({ label, scale }) {
  return (
    <VXAxisBottom
      label={label}
      labelProps={labelProps}
      scale={scale}
      stroke={axisStroke}
      tickLabelProps={() => tickLabelProps}
      tickStroke={axisStroke}
    />
  )
}
