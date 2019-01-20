import React, { Component } from 'react';
import './App.css';
// import StopsList from './components/StopsList';
// import LineChart from './components/LineChart';
import Chart from './components/Chart';
import Form from './components/Form';

class App extends React.Component {

  state = {
    refresh: 0
  }

  refreshComp = () => this.setState({refresh: this.state.refresh + 1});

  render() {
    // console.log('in app.js', this.state.refresh);
    return (
      <div>
          {/* <h1 className="App-title">Hello Hiplysssfdt!</h1> */}
        <Chart refresh={this.state.refresh}/>
        <Form refreshComp={this.refreshComp}/>
      </div>
    );
  }
}

export default App;
