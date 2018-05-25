import React from 'react';
import { findDOMNode } from 'react-dom';
import { AxisLeft as VXAxisLeft} from '@vx/axis';
import { Line } from '@vx/shape';
import { Group} from '@vx/group';
import { Text } from '@vx/text';

import {
  AXIS_STROKE,
  FONT_FAMILY,
  LABEL_FONT_SIZE,
  LABEL_LINE_HEIGHT,
  LABEL_LINE_SPACING,
  LABEL_TEXT_COLOR,
  TICK_LABEL_COLOR,
  Y_AXIS_WIDTH,
} from '../constants';

// this is a bit funky since it is not exported from @vx/axis
const tickLabelPropsLeft = {
  dx: '-0.25em',
  dy: '0.25em',
  textAnchor: 'end',
  FONT_FAMILY,
  fontSize: 10,
  fill: TICK_LABEL_COLOR,
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
  
  // labels need to be centered based on their rendered size, which is why this is necessary
  updatePositions = () => {
    const { scale } = this.props;
    const labelWidth = this.label.getBBox().width;
    const height = Math.max(...scale.range());
    const labelY = (height / 2) + ((70 + LABEL_LINE_HEIGHT + LABEL_LINE_SPACING) / 2);
    this.line.setAttribute('x1', labelWidth + LABEL_LINE_SPACING);
    this.line.setAttribute('x2', labelWidth + LABEL_LINE_SPACING+ LABEL_LINE_HEIGHT);
    this.group.setAttribute('transform', getTransform(labelY));
  }

  render() {
    const {
      label,
      scale,
      tickFormat,
    } = this.props;

    return (
      <Group left={Y_AXIS_WIDTH}>
        <g ref={this.getGroup} transform={getTransform(0)}>
          <text
            FONT_FAMILY={FONT_FAMILY}
            fontSize={LABEL_FONT_SIZE}
            dy={3}
            x={0}
            y={0}
            ref={this.getLabel}
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
          stroke={AXIS_STROKE}
          tickFormat={tickFormat}
          tickLabelProps={() => tickLabelPropsLeft}
          tickStroke={AXIS_STROKE}
        />
      </Group>
    );
  }
}
