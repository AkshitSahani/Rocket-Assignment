import React, {Component} from 'react';
import axios from 'axios';
import {getDriverInfo} from '../commonFunctions/functions';

class Form extends Component {

  state = {
    legs: [],
    selectedLeg: '',
    progress: '',
  }

  onInputChange = (event, inputType) => this.setState({[inputType]: event.target.value});

  getLegs = async () => {
		try{
			const response = await axios.get('api/v1/legs');
			console.log('resp from get legs', response);
			this.setState({legs: response.data});
		}
		catch(e){
			console.log('error in getting legs', e);
			console.log('full error', e.response);
		}
	}

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
    this.getLegs();
  }

  render(){
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
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

export default Form;
