import React from 'react';
import { withTooltip } from '@vx/tooltip';
import { Group } from '@vx/group';

import { MOUSE_LINE_COLOR } from '../constants';

class Layer extends React.Component {
  componentDidMount() {
    this.updateBounds();
  }

  componentDidUpdate() {
    this.updateBounds();
  }

  bindMouseLayer = node => this.mouseLayer = node;

  updateBounds = () => 
    this.bounds = this.mouseLayer.getBoundingClientRect();

  handleMouseMove = (xPos) => {
    const {
      data,
      showTooltip,
      tooltipLeft,
      tooltipOpen,
      xScale,
      yScale,
    } = this.props;

    this.lastX = xPos;
    const x = xPos - this.bounds.left;
    const nearestIndex = Math.round(xScale.invert(x));
    const newLeft = xScale(nearestIndex);
    const tooltipData = {
      current: data.map(chunk => chunk[nearestIndex]),
      data,
      index: nearestIndex,
      xScale,
      yScale,
    };

    if (!tooltipOpen || tooltipLeft !== newLeft) {
      showTooltip({
        tooltipLeft: newLeft,
        tooltipData,
      });
      this.props.onUpdate(tooltipData);
    }
  }

  hideTooltip = () => {
    this.props.hideTooltip();
    this.props.onUpdate({ index: -1})
  }

  performantMouseMove = e => {
    const { clientX } = e;
    if (clientX !== this.lastX) {
      window.requestAnimationFrame(() => this.handleMouseMove(clientX));
    }
  }

  render() {
    const { 
      height,
      hideTooltip,
      left,
      tooltipData,
      tooltipLeft,
      tooltipOpen,
      top,
      width,
    } = this.props;

    const styles = {
      alignItems: 'center',
      display: 'flex',
      height,
      justifyContent: 'center',
      left,
      position: 'absolute',
      top,
      width,
      zIndex: 2,
    };

    const mouseLine = {
      backgroundColor: MOUSE_LINE_COLOR,
      left: 0,
      transform: `translateX(${tooltipLeft}px)`,
      height,
      width: 1,
      position: 'absolute',
      top: 0,
    };

    const xTrans = tooltipLeft < this.props.width / 2 
      ? 0
      : '-100%';
    
    const trans2 = tooltipLeft < this.props.width / 2
      ? '10px'
      : '-10px';

    const tooltip = {
      background: 'rgba(255, 255, 255, .9)',
      transition: 'transform .2s',
      transform: `translateX(${xTrans}) translateX(${trans2})`,
    }

    const tooltipWrapper = {
      left: 0,
      position: 'absolute',
      transform: `translateX(${tooltipLeft}px)`,
    }

    return (
      <div
        onMouseMove={this.performantMouseMove}
        onMouseLeave={this.hideTooltip}
        ref={this.bindMouseLayer}
        style={styles}
      >
        {tooltipOpen && (
          <React.Fragment>
            <div style={mouseLine} />
            <div style={tooltipWrapper}>
              <div style={tooltip}>
                <this.props.tooltipComponent {...tooltipData} />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withTooltip(Layer);