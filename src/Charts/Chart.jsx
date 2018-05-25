import React from 'react';
import { scaleLinear } from '@vx/scale';
import { Group } from '@vx/group';

import flatten from 'lodash/flatten';
import { extent } from 'd3-array';
import { withParentSize } from '@vx/responsive';

import { getMultiChartDataLength } from './helpers'
import AxisBottom from './AxisBottom';
import AxisLeft from './AxisLeft';
import TooltipLayer from './TooltipLayer';
import TooltipContent from './TooltipContent';
import Bars from './Bars';
import {
  axisStroke,
  rightPadding,
  topPadding,
  xAxisHeight,
  yAxisWidth,
} from './constants';

const hoverOverlay = {
  position: 'absolute',
  left: 0,
  pointerEvents: 'none',
  top: 0,
  zIndex: 3,
};

export default function Chart(WrappedComponent, TooltipGraphSelection) {
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
          <svg
            height={height}
            style={hoverOverlay}
            width={parentWidth}
          >
            <Group
              left={yAxisWidth}
              top={topPadding}
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
            left={yAxisWidth}
            top={topPadding}
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
            <Group top={topPadding}>
              <AxisLeft
                scale={yScale}
                label={axisLeftLabel}
                left={yAxisWidth}
                tickFormat={tickFormatLeft}
              />
            </Group>
            <Group
              left={yAxisWidth}
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
