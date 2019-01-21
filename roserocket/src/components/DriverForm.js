import React, {Component} from 'react';
import axios from 'axios';
import {getDriverInfo, getLegs} from '../commonFunctions/functions';

class DriverForm extends Component {

  state = {
    legs: [],
    selectedLeg: '',
    progress: '',
  }

  onInputChange = (event, inputType) => this.setState({[inputType]: event.target.value});

  handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      const {selectedLeg, progress} = this.state;
      const data = {selectedLeg, progress};
      const response = await axios({method: 'PUT', url: 'api/v1/driver', data});
      console.log('resp from PUT driver', response);
      this.props.refreshComp();
    }
    catch(e){
      console.log('error in put driver', e);
      console.log('full error', e.response);
    }
  }

  async componentDidMount() {
    getDriverInfo('form', this);
    getLegs(this);
  }

  render(){
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
        <h2>
          Update Driver Coordinates
        </h2>
        <label>
          Leg:
          <select
            value={this.state.selectedLeg}
            onChange={(event) => this.onInputChange(event, 'selectedLeg')}
          >
            {
              this.state.legs.map((leg) => {
                return (
                  <option
                    value={leg.leg_ID}
                    key={leg.id}
                  >
                    {leg.leg_ID}
                  </option>
                )
              })
            }
          </select>
        </label>
        <label>
          Progress (%):
          <input
            type="text"
            value={this.state.progress}
            onChange={(event) => this.onInputChange(event, 'progress')}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default DriverForm;
