import React, {Component} from 'react';
import './App.css';
import DriverForm from './components/DriverForm';
import BonusDriverForm from './components/BonusDriverForm';

class App extends Component {

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
        <h1>
          RoseRocket Assignment
        </h1>

        <div className="container background">
          <Chart
            refresh={this.state.refresh}
            showBonusDriver={this.state.showBonusDriver}
          />
          <div className="inner-container">

            <DriverForm
              refreshComp={this.refreshComp}
            />
            <BonusDriverForm
              toggleBonusDriver={this.toggleBonusDriver}
              showBonusDriver={this.state.showBonusDriver}
              refreshComp={this.refreshComp}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
