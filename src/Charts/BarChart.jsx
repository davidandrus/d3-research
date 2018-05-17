import React from 'react';
 
// not used just adds multi functionality kinda like a polyfill - will be better somewhere else
import polyD3Multi from 'd3-selection-multi';
import { select as d3Select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { axisLeft } from 'd3-axis';

function getScaleY(props) {
  const {
    data,
    height,
  } = props;

  return scaleLinear()
    .domain(extent(data))
    .range([0, height]);
}

function getScaleX(props) {
  const {
    data,
    width,
  } = props;

  return scaleLinear()
    .domain([0, data.length])
    .range([0, width]);
}

function getAttrs(datum, index, scale, props) {
  const {
    data,
    height,
  } = props;
  const width = Math.floor(props.width / data.length) ;

  return {
    fill: 'blue',
    x: index * width,
    y: height  - scale(datum),
    width: width,
    height: scale(datum),
  };
}

export default class BarChart extends React.Component {

  state = {
    currentSelection: null,
  }

  componentDidMount() {
    this.renderAxis();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(props) {
    const scale = getScaleY(props);
    const that = this;
    d3Select(this.svg)
      .selectAll('rect')
      .data(props.data)
      .attrs((d, i) => getAttrs(d, i, scale, props));
  }

  setSelectedBar = activatedDataIndex => {
    d3Select(this.svg)
      .selectAll('rect.bar')
      .attrs((d, i) => {
        if (i === activatedDataIndex) {
          return { fill: 'red' }
        } else {
          return {fill: 'blue' }
        }
      })
  }

  handleMouseMove = (xPos) => {
    this.lastX = xPos;
    
    // this could be cached, but the dom could change around it
    var bounds = this.svg.getBoundingClientRect();
    var x = xPos - bounds.left;

    const activatedDataIndex = Math.round(getScaleX(this.props).invert(x));
    this.tooltipContent.textContent = this.props.data[activatedDataIndex];
    this.setSelectedBar(activatedDataIndex);
   
    d3Select(this.mouseLine)
      .attrs({
        stroke: 'gray',
        'stroke-width': 1,
        x1: x,
        x2: x,
        y1: 0,
        y2: this.props.height
      });

    const xTrans = x < this.props.width / 2 
      ? x + 20
      : x - 200 - 20;

    d3Select(this.tooltip)
      .attrs({
        transform: `translate(${xTrans})`,
      })
  }

  handleMouseLeave = () => {
    d3Select(this.tooltip)
      .attrs({
        transform: `translate(-10000)`,
      })

    d3Select(this.mouseLine)
      .attrs({
        transform: `translate(-10000)`,
      });
      
      this.setSelectedBar(-1);
  }

  performantMouseMove = e => {
    const { clientX } = e;
    if (clientX !== this.lastX) {
      window.requestAnimationFrame(() => this.handleMouseMove(clientX));
    }
  }


  renderAxis() {
    var node  = this.axis;
    console.log({ node });
    var axis = axisLeft(getScaleY(this.props)).ticks(5)
    d3Select(node).call(axis);
  }

  render() {
    const {
      data,
      height,
      width,
    } = this.props;

    const scale = getScaleY(this.props);
    
    return (
      <svg
        ref={node => { this.svg = node; }}
        height={height}
        width={width}
      >
        <line ref={node => this.mouseLine = node} />
        <g transform="translate(50)"
          onMouseMove={this.performantMouseMove}
          onMouseLeave={this.handleMouseLeave}
        >
          {data.map((point, index) => (
            <rect
              className="bar"
              {...getAttrs(point, index, scale, this.props)}
              key={index}
            />
          ))}
        </g>
        <g ref={node => { this.axis = node }} transform="translate(50)" />
        <g ref={node => { this.tooltip = node; }} transform="translate(-10000)">
          <rect 
            fill='red'
            height={200}
            width={200}
          />
          <foreignObject width="100" height="50">
            <p ref={node => this.tooltipContent = node}></p>
          </foreignObject>
        </g>
      </svg>
    );
  }
}