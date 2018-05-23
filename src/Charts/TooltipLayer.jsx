import React from 'react';
import { withTooltip } from '@vx/tooltip';
import { Group } from '@vx/group';

class TooltipLayer extends React.Component {
  
  state = { linePos: 0 }

  handleMouseMove = (xPos) => {
    this.lastX = xPos;
    
    // this could be cached, but the dom could change around it
    var bounds = this.mouseLayer.getBoundingClientRect();
    var x = xPos - bounds.left;

    this.setState({
      linePos: x,
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

  bindMouseLayer = node => this.mouseLayer = node;

  render() {
    const { 
      props: {
        height,
        left,
        top,
        width,
      },
      state: {
        linePos,
      },
    } = this;

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
      left: linePos,
      height,
      width: 1,
      backgroundColor: 'black',
      position: 'absolute',
      top: 0,
    };

    const tooltip = {
      background: 'rgba(255, 255, 255, .9)',
      height: 200,
      position: 'absolute',
      left: linePos + 10,
      width: 400,
    }

    return (
      <div
        onMouseMove={this.performantMouseMove}
        ref={this.bindMouseLayer}
        style={styles}
      >
        <div style={mouseLine} />
        <div style={tooltip} />
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