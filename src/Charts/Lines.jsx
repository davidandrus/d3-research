import React from 'react';

import { select as d3Select } from 'd3-selection';
import { line } from 'd3-shape';

function getAttrs(datum, index, props) {
  const {
    data,
    height,
    scale,
    selectedIndex,
    width,
  } = props;
  const calculatedWidth = width / data.length ;

  return {
    fill: selectedIndex === index ? 'red' : 'blue',
    x: index * calculatedWidth,
    y: height  - scale(datum),
    width: calculatedWidth,
    height: scale(datum),
  };
}

export default class Bars extends React.Component {
  render() {
    const { data } = this.props;

    const linePath = line()
      .x((d, i) => this.props.scaleX(i))
      .y(d => this.props.scale(d));

    return (
      <g ref={node => { this.group = node; }}>
        <path fill="none" stroke="black" d ={linePath(data)} />
      </g>
    );
  }
}