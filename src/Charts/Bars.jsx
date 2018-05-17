import React from 'react';

import { select as d3Select } from 'd3-selection';

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
  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(props) {
    const that = this;
    d3Select(this.group)
      .selectAll('rect')
      .data(props.data)
      .attrs((d, i) => getAttrs(d, i, props));
  }
  
  render() {
    const { data } = this.props;

    return (
      <g ref={node => { this.group = node; }}>
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