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

const getBarData = () => getUpdatedData(600);
const getLineData = () => range(0, 7).map(() => getUpdatedData(30));

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
        <BarChart
          data={this.state.barData}
          height={500}
          width={1200}
        />
        <LineChart
          colorMap={[
            'blue',
            'red',
            'orange',
            'green',
            'yellow',
            'pink'
          ]}
          data={this.state.lineData}
          height={500}
          width={1200}
        />
        <button onClick={this.updateData}>updateData</button>
      </div>
    );
  }
}

export default App;
