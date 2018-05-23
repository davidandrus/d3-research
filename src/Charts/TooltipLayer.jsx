import React from 'react';
import { withTooltip } from '@vx/tooltip';
import { Group } from '@vx/group';

class TooltipLayer extends React.Component {
  componentDidMount() {
    this.updateBounds();
  }

  componentDidUpdate() {
    this.updateBounds()
  }

  bindMouseLayer = node => this.mouseLayer = node;

  updateBounds = () => 
    this.bounds = this.mouseLayer.getBoundingClientRect();

  handleMouseMove = (xPos) => {
    this.lastX = xPos;
    var x = xPos - this.bounds.left;

    this.props.showTooltip({
      tooltipLeft: x,
    });

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
      height: 200,
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
            <div style={tooltip} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withTooltip(TooltipLayer);

// function getScaleX(props) {
//   const {
//     data,
//     width,
//   } = props;

//   return scaleLinear()
//     .domain([0, data.length])
//     .range([0, width]);
// }

// export default class Tooltipped extends React.Component {
  
//   handleMouseMove = (xPos) => {
//     this.lastX = xPos;
    
//     // this could be cached, but the dom could change around it
//     var bounds = this.mouseLayer.getBoundingClientRect();
//     var x = xPos - bounds.left;

//     const activatedDataIndex = Math.round(getScaleX(this.props).invert(x));
//     this.props.onUpdate(activatedDataIndex);
   
//     d3Select(this.mouseLine)
//       .attrs({
//         stroke: 'gray',
//         'stroke-width': 1,
//         transform: 'translate(0)',
//         x1: x,
//         x2: x,
//         y1: 0,
//         y2: this.props.height
//       });

//     // should be handled elsewhere probably
//     const xTrans = x < this.props.width / 2 
//       ? x + 20
//       : x - 300 - 20;

//     d3Select(this.tooltip)
//       .attrs({
//         transform: `translate(${xTrans})`,
//       })
//   }

//   handleMouseLeave = () => {
//     d3Select(this.tooltip)
//       .attrs({
//         transform: `translate(-10000)`,
//       })

//     d3Select(this.mouseLine)
//       .attrs({
//         transform: `translate(-10000)`,
//       });
      
//       this.props.onUpdate(-1);
//   }

//   performantMouseMove = e => {
//     const { clientX } = e;
//     if (clientX !== this.lastX) {
//       window.requestAnimationFrame(() => this.handleMouseMove(clientX));
//     }
//   }

//   render() {
//     const { children, height, width } = this.props;
//     return (
//       <g>
//         <g>{this.props.children}</g>
//         <line ref={node => this.mouseLine = node} />
//         <g ref={node => { this.tooltip = node; }} transform="translate(-10000)">
//           <TooltipContent height={height} />
//         </g>
//         <g
//           ref={node => {this.mouseLayer = node; }}
//           onMouseMove={this.performantMouseMove}
//           onMouseLeave={this.handleMouseLeave}
//         >
//           {/*
//             need all area to be hoverable not just graph 
//             regions hence the transparent backaground
//           */}
//           <rect
//             fill='red'
//             fill-opacity='0'
//             x="0"
//             y="0" 
//             height={height}
//             width={width}
//           />
//         </g>
//       </g>
//     );
//   }
// }