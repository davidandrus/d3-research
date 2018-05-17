import React from 'react';

import { select as d3Select } from 'd3-selection';

function getAttrs(datum, index, props) {
  const {
    data,
    height,
    scale,
    width,
  } = props;
  const calculatedWidth = Math.floor(width / data.length) ;

  return {
    fill: 'blue',
    x: index * calculatedWidth,
    y: height  - scale(datum),
    width: calculatedWidth,
    height: scale(datum),
  };
}

export default class Bars extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(props) {
    const that = this;
    d3Select(this.svg)
      .selectAll('rect')
      .data(props.data)
      .attrs((d, i) => getAttrs(d, i, props));
  }
  
  render() {
    const { data } = this.props;

    return (
      <g>
        {data.map((point, index) => (
          <rect
            className="bar"
            {...getAttrs(point, index, this.props)}
            key={index}
          />
        ))}
      </g>
    );
  }
}