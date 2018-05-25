import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';

import range from 'lodash/range';
import random from 'lodash/random';

function getUpdatedData(len, upperBound = 100) {
  return range(0, len + 1).map(() => random(0, upperBound));
}

const getBarData = () => getUpdatedData(300);
const getLineData = () => range(0, 2).map(() => getUpdatedData(600));

class App extends Component {
  state = {
    barData: getBarData(),
    lineData: getLineData()
  }

  updateData = () => {
    this.setState({
      barData: getBarData(),
      lineData: getLineData()
    });
  }

  render() { 
    return (
      <div>
        <LineChart
          axisBottomLabel="Label Bottom"
          axisLeftLabel="Label Left"
          colorMap={[
            'blue',
            'red',
            'orange',
            'green',
            'yellow',
            'pink'
          ]}
          data={this.state.lineData}
          fillArea={true}
          height={500}
          // tickFormatLeft={(val, i) => `${val}:)`}
          // tickFormatBottom={(val, i) => `${val}:)`}
          width={1200}
        />
        {/*
          BarChart needs TooltipSelection, as well as TooltipContent
          <BarChart
          data={this.state.barData}
          height={500}
          width={1200}
        /> */}
        <button onClick={this.updateData}>updateData</button>
      </div>
    );
  }
}

export default App;
