import React from 'react';
 
// not used just adds multi functionality kinda like a polyfill - will be better somewhere else
import { select as d3Select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

import Tooltipped from './Tooltipped';
import Bars from './Bars';
import AxisLeft from './AxisLeft';
import AxisBottom from './AxisBottom';

const yAxisWidth = 50;
const xAxisHeight = 50;
const topPadding = 20;
const rightPadding = 20;

export default class BarChart extends React.Component {
  state = {
    currentSelection: null,
  }

  // @TODO - not currently working
  setSelectedBar = activatedDataIndex => {
    d3Select(this.svg)
      .selectAll('rect.bar')
      .attrs((d, i) => {
        if (i === activatedDataIndex) {
          return { fill: 'red' }
        } else {
          return { fill: 'blue' }
        }
      })
  }

  render() {
    const {
      data,
      height,
      width,
    } = this.props;

    const contentWidth = width - yAxisWidth - rightPadding;
    const contentHeight = height - topPadding - xAxisHeight;
    const xAxisTop = contentHeight + topPadding;

    const scaleY = scaleLinear()
      .domain(extent(data))
      .range([0, contentHeight]);

    const scaleX = scaleLinear()
      .domain([0, data.length])
      .range([0, contentWidth]);

    return (
      <svg
        ref={node => { this.svg = node; }}
        height={height}
        width={width}
      >
        <g transform={`translate(0, ${topPadding})`} >
          <AxisLeft
            data={data}
            scale={scaleY}
            width={yAxisWidth}
          />
        </g>
        <g transform={`translate(${yAxisWidth}, ${topPadding})`}>
          <Tooltipped
            onUpdate={this.setSelectedBar}
            data={data}
            height={contentHeight} 
            width={contentWidth}
          >
            <Bars
              data={data}
              scale={scaleY}
              height={contentHeight}
              width={contentWidth}
            />
          </Tooltipped>
        </g>
        <g transform={`translate(${yAxisWidth}, ${xAxisTop})`}>
          <AxisBottom
            data={data}
            scale={scaleX}
            width={contentWidth}
          />
        </g>
      </svg>
    );
  }
}