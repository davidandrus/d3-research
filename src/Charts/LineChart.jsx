import React from 'react';
 
import Chart from './Chart';
import Lines from './Lines';

export default function LineChart(props) {
  return (
    <Chart
      {...props}
      renderer={Lines}
    />
  );
}
