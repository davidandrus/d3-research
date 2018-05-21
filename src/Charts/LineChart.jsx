import React from 'react';
 
import ResponsiveChart from './ResponsiveChart';
import Lines from './Lines';

export default function LineChart(props) {
  return (
    <ResponsiveChart
      {...props}
      renderer={Lines}
    />
  );
}
