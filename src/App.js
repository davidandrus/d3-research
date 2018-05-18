import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';

import range from 'lodash/range';
import random from 'lodash/random';

function getUpdatedData() {
  return range(0, 600).map(() => random(0, 100));
}
class App extends Component {
  state = {
    data: getUpdatedData(),
  }

  updateData = () => {
    this.setState({ data: getUpdatedData() });
  }

  render() { 
    return (
      <div>
        <BarChart
          data={this.state.data}
          height={500}
          width={1200}
        />
        <LineChart
          data={this.state.data.slice(0, 31)}
          height={500}
          width={1200}
        />
        <button onClick={this.updateData}>updateData</button>
      </div>
    );
  }
}

export default App;
