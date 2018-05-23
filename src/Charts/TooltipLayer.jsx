import React from 'react';
import { withTooltip } from '@vx/tooltip';
import { Group } from '@vx/group';

class TooltipLayer extends React.Component {
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
    } = this.props;

    this.lastX = xPos;
    const x = xPos - this.bounds.left;
    const nearestIndex = Math.round(xScale.invert(x));
    const newLeft = xScale(nearestIndex);

    if (!tooltipOpen || tooltipLeft !== newLeft) {
      showTooltip({
        tooltipLeft: newLeft,
        tooltipData: {
          current: data.map(chunk => chunk[nearestIndex]),
          data,
          index: nearestIndex,
        }
      });
    }

    // const activatedDataIndex = Math.round(getScaleX(this.props).invert(x));
    // this.props.onUpdate(activatedDataIndex);
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
    };

    const mouseLine = {
      left: 0,
      transform: `translateX(${tooltipLeft}px)`,
      height,
      width: 1,
      backgroundColor: 'black',
      position: 'absolute',
      top: 0,
    };

    const xTrans = tooltipLeft < this.props.width / 2 
      ? tooltipLeft + 20
      : tooltipLeft - 300 - 20;
    

    const tooltip = {
      background: 'rgba(255, 255, 255, .9)',
      position: 'absolute',
      left: 0,
      transition: 'transform .1s',
      transform: `translateX(${xTrans}px)`,
      width: 300,
    }

    return (
      <div
        onMouseMove={this.performantMouseMove}
        onMouseLeave={hideTooltip}
        ref={this.bindMouseLayer}
        style={styles}
      >
        {tooltipOpen && (
          <React.Fragment>
            <div style={mouseLine} />
            <div style={tooltip}>
              <this.props.tooltipComponent {...tooltipData} />
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withTooltip(TooltipLayer);