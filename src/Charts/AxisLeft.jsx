// @TODO - this could probably be improved alot, right now it is a bit gross
import React from 'react';
import { findDOMNode } from 'react-dom';
import { AxisLeft as VXAxisLeft} from '@vx/axis';
import { Line } from '@vx/shape';
import { Group} from '@vx/group';
import { Text } from '@vx/text';

import {
  axisStroke,
  labelLineHeight,
  labelLineSpacing,
  yAxisWidth,
} from './constants';

// this is a bit funky since it is not exported from @vx/axis
const tickLabelPropsLeft = {
  dx: '-0.25em',
  dy: '0.25em',
  textAnchor: 'end',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: 'red'
};

const getTransform = labelY => `translate(-45, ${labelY}) rotate(-90)`;

export default class AxisLeft extends React.Component {

  state = { labelWidth: 0 }

  componentDidMount() {
    this.label = findDOMNode(this._label);
    this.line = findDOMNode(this._line);
    this.group = findDOMNode(this._group);

    this.updatePositions();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text;
  }

  componentWillUpdate() {
    this.updatePositions();
  }

  getLine = (line) => {
    this._line = line;
  }

  getLabel = (label) => {
    this._label = label;
  }

  getGroup = (group) => {
    this._group = group;
  }

  updatePositions = () => {
    const { scale } = this.props;
    const labelWidth = this.label.getBBox().width;
    const height = Math.max(...scale.range());
    const labelY = (height / 2) + ((70 + labelLineHeight + labelLineSpacing) / 2);
    this.line.setAttribute('x1', labelWidth + labelLineSpacing);
    this.line.setAttribute('x2', labelWidth + labelLineSpacing + labelLineHeight);
    this.group.setAttribute('transform', getTransform(labelY));
  }

  render() {
    const { label, scale } = this.props;

    return (
      <Group left={yAxisWidth}>
        <g ref={this.getGroup} transform={getTransform(0)}>
          <text
            fontSize='12'
            dy={3}
            x={0}
            y={0}
            ref={this.getLabel}
            verticalAnchor="end"
          >
            {label}
          </text>
          <line
            ref={this.getLine}
            x1={0}
            y1={0}
            x2={0}
            y2={0}
            stroke="black"
          />

        </g>
        <VXAxisLeft
          scale={scale}
          numTicks={5}
          stroke={axisStroke}
          tickLabelProps={() => tickLabelPropsLeft}
          tickStroke={axisStroke}
        />
      </Group>
    );
  }
}
