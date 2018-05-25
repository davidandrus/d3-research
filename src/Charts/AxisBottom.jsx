import React from 'react';
import { AxisBottom as VXAxisBottom } from '@vx/axis';

import {
  axisStroke,
  fontFamily,
  labelFontSize,
  labelTickFontSize,
  tickLabelColor,
  yAxisWidth,
} from './constants';

const tickLabelProps = {
  fill: tickLabelColor,
  fontSize: labelTickFontSize,
  fontFamily,
  textAnchor: 'middle',
};

const labelProps = {
  fontFamily,
  fontSize: labelFontSize,
};

export default function AxisBottom({ label, scale, tickFormat }) {
  return (
    <VXAxisBottom
      label={label}
      labelProps={labelProps}
      scale={scale}
      stroke={axisStroke}
      tickFormat={tickFormat}
      tickLabelProps={() => tickLabelProps}
      tickStroke={axisStroke}
    />
  )
}
