import React, {Component} from 'react';
import axios from 'axios';
import {getDriverInfo} from '../commonFunctions/functions';

class BonusDriverForm extends Component {

  state = {
    x: '',
    y: ''
  }

  onInputChange = (event, inputType) => this.setState({[inputType]: event.target.value});

  // getLegs = async () => {
	// 	try{
	// 		const response = await axios.get('api/v1/legs');
	// 		console.log('resp from get legs', response);
	// 		this.setState({legs: response.data});
	// 	}
	// 	catch(e){
	// 		console.log('error in getting legs', e);
	// 		console.log('full error', e.response);
	// 	}
	// }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      const {x, y} = this.state;
      const data = {x,y};
      const response = await axios({method: 'PUT', url: 'api/v1/bonusdriver', data});
      console.log('resp from PUT driver', response);
      this.props.refreshComp();
    }
    catch(e){
      console.log('error in put driver', e);
      console.log('full error', e.response);
    }
  }

  // async componentDidMount() {
  //   getDriverInfo('form', this);
  //   this.getLegs();
  // }

  render(){
    return (
      <div>
        <button onClick={this.props.toggleBonusDriver}>
          {this.props.showBonusDriver ? "Hide" : "Show"} Bonus Driver
        </button>

        <form className="container" onSubmit={this.handleFormSubmit}>
          <h2>
            Update Bonus Driver Coordinates
          </h2>
          <label>
            X Coordinate:
            <input
              type="text"
              value={this.state.x}
              onChange={(event) => this.onInputChange(event, 'x')}
            />
          </label>
          <label>
            Y Coordinate:
            <input
              type="text"
              value={this.state.y}
              onChange={(event) => this.onInputChange(event, 'y')}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default BonusDriverForm;
