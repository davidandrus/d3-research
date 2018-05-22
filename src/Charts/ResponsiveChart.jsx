import React from 'react';
import { withParentSize } from '@vx/responsive';

import Chart from './Chart';

function responsiveWrapper({ parentHeight, parentWidth, ...props }) {
  return (
    <Chart
      {...props}
      width={parentWidth}
    />
  );
}

export default withParentSize(responsiveWrapper);
