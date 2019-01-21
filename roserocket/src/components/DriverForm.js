import React, {Component} from 'react';
import axios from 'axios';
import {getDriverInfo, getLegs, regex} from '../commonFunctions/functions';

class DriverForm extends Component {

  state = {
    legs: [],
    selectedLeg: '',
    progress: '',
    error: '',
  }

  onProgressChange = (event) => {
    console.log('value', event.target.value);
    if(!regex.test(event.target.value)){
      return this.setState({error: 'Sorry, only numbers are accepted!'})
    }
    else if(event.target.value < 0 || event.target.value > 100){
      return this.setState({error: 'Sorry, only numbers between 0 and 100 are accepted!'})
    }
    else{
      this.setState({progress: event.target.value, error: ''});
    }
  }

  onSelect = (event) => this.setState({selectedLeg: event.target.value});

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
      <form className="main form" onSubmit={this.handleFormSubmit}>
        <h2>
          Update Driver Coordinates
        </h2>
        <div className="form-row">
          <label>
            Leg:
            <select
              value={this.state.selectedLeg}
              onChange={this.onSelect}
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
              onChange={this.onProgressChange}
            />
          </label>
      </div>
      <input className="submit" type="submit" value="Submit" />

        {
          this.state.error ?
            <h5 style={{color:'red'}}>
              {this.state.error}
            </h5>
            :
            null
        }
      </form>
    )
  }
}

export default DriverForm;
