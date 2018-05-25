import React from 'react';

import { TooltipContent } from '../Tooltip';

export default function TooltipContentExtender({ current = [], index, ...rest }) {
  const [stat1, stat2] = current;
  return (
    <TooltipContent
      metricTitles={[
        'Installs',
      ]}
      items={[{
        color: 'blue',
        legend: 'IT works it really does, it should truncate eventually truncate me truncate me',
        metrics: [stat1],
      }, {
        color: 'red',
        legend: 'a short one',
        metrics: [stat2],
      }]}
      title={`It works yo ${index}`}s
    />
  );
}
