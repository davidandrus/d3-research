import React from 'react';
import { scaleLinear } from '@vx/scale';
import { Group } from '@vx/group';
import { AxisBottom, AxisLeft } from '@vx/axis';
import flatten from 'lodash/flatten';
import { extent } from 'd3-array';

import { getMultiChartDataLength } from './helpers'
import Tooltipped from './Tooltipped';
import Bars from './Bars';

const yAxisWidth = 50;
const xAxisHeight = 50;
const topPadding = 20;
const rightPadding = 20;

export default class Chart extends React.Component {
  state = { activeDataIndex: -1 }

  setSelectedBar = activeDataIndex => {
    // @TODO - this is currently not very performant - figure out
    this.setState({ activeDataIndex })
  }

  render() {
    const {
      props: {
        colorMap,
        data,
        fillArea,
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
    const dataLength = getMultiChartDataLength(data);
    const dataExtent = extent(flatten(data));

    const xScale = scaleLinear({
      domain: [0, dataLength - 1],
      rangeRound: [0, contentWidth],
    });
    const yScale = scaleLinear({
      domain: dataExtent,
      rangeRound: [contentHeight, 0],
    });

    return (
      <svg
        height={height}
        width={width}
      >
        <Group top={topPadding}>
          <AxisLeft
            scale={yScale}
            left={yAxisWidth}
            numTicks={5}
          />
        </Group>
        <Group 
          left={yAxisWidth}
          top={topPadding}
        >
          <Tooltipped
            onUpdate={this.setSelectedBar}
            data={data}
            height={contentHeight}
            width={contentWidth}
          >
            {/* this is a bit gross can probably just pass props through here */}
            {React.createElement(this.props.renderer, {
              colorMap,
              data,
              fillArea,
              height: contentHeight,
              xScale,
              yScale,
              selectedIndex: activeDataIndex,
              width: contentWidth,
            })}
          </Tooltipped>
        </Group>
        <Group
          left={yAxisWidth}
          top={xAxisTop}
        >
          <AxisBottom scale={xScale} />
        </Group>
      </svg>
    );
  }
}