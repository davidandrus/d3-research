import React from 'react';
 
// not used just adds multi functionality kinda like a polyfill - will be better somewhere else
import { scaleLinear } from '@vx/scale';
import { extent } from 'd3-array';
import { Group } from '@vx/group';
import { AxisLeft } from '@vx/axis';

import Tooltipped from './Tooltipped';
import Bars from './Bars';
// import AxisLeft from './AxisLeft';
import AxisBottom from './AxisBottom';

const yAxisWidth = 50;
const xAxisHeight = 50;
const topPadding = 20;
const rightPadding = 20;

export default class BarChart extends React.Component {
  state = { activeDataIndex: -1 }

  setSelectedBar = activeDataIndex => {
    this.setState({ activeDataIndex })
  }

  render() {
    const {
      props: {
        data,
        height,
        renderer,
        width,
      },
      state: {
        activeDataIndex,
      }
    } = this;
    const contentWidth = width - yAxisWidth - rightPadding;
    const contentHeight = height - topPadding - xAxisHeight;
    const xAxisTop = contentHeight + topPadding;

    const xScale = scaleLinear({
      domain: [0, data.length - 1],
      rangeRound: [0, contentWidth],
    });
    const yScale = scaleLinear({
      domain: extent(data),
      rangeRound: [contentHeight, 0],
    });

    return (
      <svg
        height={height}
        width={width}
      >
        {/* <g transform={`translate(0, ${topPadding})`} >
          <AxisLeft
            data={data}
            scale={scaleY}
            width={yAxisWidth}
          />
        </g> */}
        <Group top={topPadding}>
          <AxisLeft
            scale={yScale}
            left={yAxisWidth}
          />
        </Group>
        <Group top={topPadding} left={yAxisWidth}>
          <Tooltipped
            onUpdate={this.setSelectedBar}
            data={data}
            height={contentHeight}
            width={contentWidth}
          >
            {React.createElement(this.props.renderer, {
              data,
              height: contentHeight,
              xScale,
              yScale,
              selectedIndex: activeDataIndex,
              width: contentWidth,
            })}
          </Tooltipped>
        </Group>
        {/* <g transform={`translate(${yAxisWidth}, ${xAxisTop})`}>
          <AxisBottom
            data={data}
            scale={scaleX}
            width={contentWidth}
          />
        </g> */}
      </svg>
    );
  }
}