import React from 'react';
 
// not used just adds multi functionality kinda like a polyfill - will be better somewhere else
import polyD3Multi from 'd3-selection-multi';
import { select as d3Select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { axisLeft } from 'd3-axis';
import Tooltipped from './Tooltipped';

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

  // @TODO - not currently working
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
        <Tooltipped
          data={data}
          height={height} 
          width={width}
        >
          {data.map((point, index) => (
            <rect
              className="bar"
              {...getAttrs(point, index, scale, this.props)}
              key={index}
            />
          ))}
        </Tooltipped>
      </svg>
    );
  }
}