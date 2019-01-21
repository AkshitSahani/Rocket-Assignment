import React, { Component } from 'react';
import './App.css';
// import StopsList from './components/StopsList';
// import LineChart from './components/LineChart';
import Chart from './components/Chart';
import DriverForm from './components/DriverForm';
import BonusDriverForm from './components/BonusDriverForm';

class App extends React.Component {

  state = {
    refresh: 0,
    showBonusDriver: false,
  }

  refreshComp = () => this.setState({refresh: this.state.refresh + 1});

  toggleBonusDriver = () => this.setState({showBonusDriver: !this.state.showBonusDriver})

  render() {
    // console.log('in app.js', this.state.refresh);
    return (
      <div>
        <Chart
          refresh={this.state.refresh}
          showBonusDriver={this.state.showBonusDriver}
        />
        <DriverForm
          refreshComp={this.refreshComp}
        />
        <BonusDriverForm
          toggleBonusDriver={this.toggleBonusDriver}
          showBonusDriver={this.state.showBonusDriver}
          refreshComp={this.refreshComp}
        />
      </div>
    );
  }
}

export default App;
