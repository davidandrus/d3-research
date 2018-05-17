import React from 'react';
 
// not used just adds multi functionality kinda like a polyfill - will be better somewhere else
import { select as d3Select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { axisLeft } from 'd3-axis';
import Tooltipped from './Tooltipped';
import Bars from './Bars';

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

export default class BarChart extends React.Component {

  state = {
    currentSelection: null,
  }

  componentDidMount() {
    this.renderAxis();
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
          <Bars
            data={data}
            scale={scale}
            height={height}
            width={width}
          />
        </Tooltipped>
      </svg>
    );
  }
}