import React from 'react';
 
import Chart from './Chart';
import Bars from './Bars';

export default function BarChart(props) {
  return (
    <Chart
      {...props}
      renderer={Bars}
    />
  );
}
