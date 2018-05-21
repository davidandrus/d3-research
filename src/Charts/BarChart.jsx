import React from 'react';
 
import ResponsiveChart from './ResponsiveChart';
import Bars from './Bars';

export default function BarChart(props) {
  return (
    <ResponsiveChart
      {...props}
      renderer={Bars}
    />
  );
}
