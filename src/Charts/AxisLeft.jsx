import React from 'react';
import { select as d3Select } from 'd3-selection';
import { axisLeft } from 'd3-axis';

export default class AxisLeft extends React.Component {
  
  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.axis;
    var axis = axisLeft(this.props.scale).ticks(5);
    d3Select(node).call(axis);
  }

  render() {
    return <g
      ref={node => { this.axis = node }} 
      transform={`translate(${this.props.width})`}
    />
  }
}