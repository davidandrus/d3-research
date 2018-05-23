import React from 'react';
import { scaleLinear } from '@vx/scale';
import { Group } from '@vx/group';
import { AxisBottom, AxisLeft } from '@vx/axis';
import flatten from 'lodash/flatten';
import { extent } from 'd3-array';
import { withParentSize } from '@vx/responsive';

import { getMultiChartDataLength } from './helpers'
import TooltipLayer from './TooltipLayer';
import TooltipContent from './TooltipContent';
import Bars from './Bars';

const yAxisWidth = 50;
const xAxisHeight = 50;
const topPadding = 20;
const rightPadding = 20;

export default function Chart(WrappedComponent) {
  class ChartWrapper extends React.Component {
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
          parentWidth,
          renderer,
          width,
        },
        state: {
          activeDataIndex,
        }
      } = this;
      const contentWidth = parentWidth - yAxisWidth - rightPadding;
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
        <div style={{position: 'relative'}}>
          <TooltipLayer
            data={data}
            height={contentHeight}
            left={yAxisWidth}
            top={topPadding}
            tooltipComponent={TooltipContent}
            xScale={xScale}
            yScale={yScale}
            width={contentWidth}
          />
          <svg
            height={height}
            width={parentWidth}
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
              <WrappedComponent
                colorMap={colorMap}
                data={data}
                fillArea={fillArea}
                height={contentHeight}
                xScale={xScale}
                yScale={yScale}
                selectedIndex={activeDataIndex}
                width={contentWidth}
              />
            </Group>
            <Group
              left={yAxisWidth}
              top={xAxisTop}
            >
              <AxisBottom scale={xScale} />
            </Group>
          </svg>
        </div>
      );
    }
  }

  return withParentSize(ChartWrapper);
}
