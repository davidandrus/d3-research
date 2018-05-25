import React from 'react';
import { AxisBottom as VXAxisBottom } from '@vx/axis';

import {
  AXIS_STROKE,
  FONT_FAMILY,
  LABEL_FONT_SIZE,
  LABEL_TICK_FONT_SIZE,
  TICK_LABEL_COLOR,
  Y_AXIS_WIDTH,
} from '../constants';

const tickLabelProps = {
  fill: TICK_LABEL_COLOR,
  fontSize: LABEL_TICK_FONT_SIZE,
  fontFamily: FONT_FAMILY,
  textAnchor: 'middle',
};

const labelProps = {
  fontFamily: FONT_FAMILY,
  fontSize: LABEL_FONT_SIZE,
};

export default function AxisBottom({ label, scale, tickFormat }) {
  return (
    <VXAxisBottom
      label={label}
      labelProps={labelProps}
      scale={scale}
      stroke={AXIS_STROKE}
      tickFormat={tickFormat}
      tickLabelProps={() => tickLabelProps}
      tickStroke={AXIS_STROKE}
      numTicks={30}
    />
  )
}
