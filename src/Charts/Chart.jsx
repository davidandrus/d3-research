import React from 'react';
import { scaleLinear } from '@vx/scale';
import { Group } from '@vx/group';

import flatten from 'lodash/flatten';
import { extent } from 'd3-array';
import { withParentSize } from '@vx/responsive';

import { getMultiChartDataLength } from './helpers'
import {
  Bottom as AxisBottom,
  Left as AxisLeft,
} from './Axis';
import { TooltipLayer } from './Tooltip';
import {
  AXIS_STROKE,
  RIGHT_PADDING,
  TOP_PADDING,
  X_AXIS_HEIGHT,
  Y_AXIS_WIDTH,
} from './constants';

const hoverOverlay = {
  position: 'absolute',
  left: 0,
  pointerEvents: 'none',
  top: 0,
  zIndex: 3,
};

export default function Chart(WrappedComponent, TooltipGraphSelection, TooltipContent) {
  class ChartWrapper extends React.Component {
    state = { activeDataIndex: -1, tooltipInfo: null }

    handleTooltipUpdate = (obj) => {
      this.setState({ tooltipInfo: obj });
    }

    render() {
      const {
        props: {
          axisBottomLabel,
          axisLeftLabel,
          colorMap,
          data,
          fillArea,
          height,
          parentWidth,
          renderer,
          tickFormatBottom,
          tickFormatLeft,
          width,
        },
        state: {
          activeDataIndex,
          tooltipInfo,
        }
      } = this;
      const contentWidth = parentWidth - Y_AXIS_WIDTH - RIGHT_PADDING;
      const contentHeight = height - TOP_PADDING - X_AXIS_HEIGHT;
      const xAxisTop = contentHeight + TOP_PADDING;
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
          <svg
            height={height}
            style={hoverOverlay}
            width={parentWidth}
          >
            <Group
              left={Y_AXIS_WIDTH}
              top={TOP_PADDING}
            >
              <TooltipGraphSelection
                {...tooltipInfo}
                colorMap={colorMap}
              />
            </Group>
          </svg>
          <TooltipLayer
            data={data}
            height={contentHeight}
            left={Y_AXIS_WIDTH}
            top={TOP_PADDING}
            tooltipComponent={TooltipContent}
            onUpdate={this.handleTooltipUpdate}
            xScale={xScale}
            yScale={yScale}
            width={contentWidth}
          />
          <svg
            height={height}
            width={parentWidth}
          >
            <Group 
              left={Y_AXIS_WIDTH}
              top={TOP_PADDING}
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
            <Group top={TOP_PADDING}>
              <AxisLeft
                scale={yScale}
                label={axisLeftLabel}
                left={Y_AXIS_WIDTH}
                tickFormat={tickFormatLeft}
              />
            </Group>
            <Group
              left={Y_AXIS_WIDTH}
              top={xAxisTop}
            >
              <AxisBottom
                scale={xScale}
                label={axisBottomLabel}
                tickFormat={tickFormatBottom}
              />
            </Group>
          </svg>
        </div>
      );
    }
  }

  return withParentSize(ChartWrapper);
}
