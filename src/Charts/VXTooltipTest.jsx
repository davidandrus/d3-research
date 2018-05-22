import React from 'react';
import flatten from 'lodash/flatten';
import { Group } from '@vx/group';
import { scaleLinear } from '@vx/scale';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { extent } from 'd3-array';
import { localPoint } from '@vx/event';
import Lines from './Lines';

import { getMultiChartDataLength } from './helpers'

class VXTootltipTest extends React.Component {
  handleMouseOver = (event, datum) => {
    console.log('mouseovering')
    const coords = localPoint(event.target.ownerSVGElement, event);
    console.log({ coords });
    this.props.showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum
    });
  };

  render() {
    const { data, height, width } = this.props;
    const dataLength = getMultiChartDataLength(data);
    const dataExtent = extent(flatten(data));

    const xScale = scaleLinear({
      domain: [0, dataLength - 1],
      rangeRound: [0, width],
    });
    const yScale = scaleLinear({
      domain: dataExtent,
      rangeRound: [height, 0],
    });

    const {
      tooltipData,
      tooltipLeft,
      tooltipTop,
      tooltipOpen,
      hideTooltip
    } = this.props;

    return (
      <React.Fragment>
        <svg height={height} width={width}>
          <Group onMouseOver={this.handleMouseOver}>
            <Lines {...this.props} xScale={xScale} yScale={yScale} />
          </Group>
        </svg>
        {tooltipOpen && (
          <TooltipWithBounds
            // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            Data value <strong>{tooltipData}</strong>
          </TooltipWithBounds>
        )}
      </React.Fragment>
    );
  }
}

export default withTooltip(VXTootltipTest);