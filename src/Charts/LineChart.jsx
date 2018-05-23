import React from 'react';
 
import Lines from './Lines';
import Chart from './Chart';

export default function LineChart(props) {
  return (
    <Chart
      {...props}
      renderer={Lines}
    />
  );
}
