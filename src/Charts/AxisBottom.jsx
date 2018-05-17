import React from 'react';
import { select as d3Select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

export default class AxisBottom extends React.Component {
  
  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.axis;
    var axis = axisBottom(this.props.scale).ticks(30);
    d3Select(node).call(axis);
  }

  render() {
    return <g ref={node => { this.axis = node }} />
  }
}