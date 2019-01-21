import React, {Component} from 'react';
import axios from 'axios';
import {fetchBonusDriverInfo, regex} from '../commonFunctions/functions';

class BonusDriverForm extends Component {

  state = {
    x: '',
    y: '',
    error: ''
  }

  onInputChange = (event, inputType) => {
    if(!regex.test(event.target.value)){
      return this.setState({error: 'Sorry, only numbers are accepted!'})
    }
    else if(event.target.value < 0 || event.target.value > 100){
      return this.setState({error: 'Sorry, only numbers between 0 and 100 are accepted!'})
    }
    else{
      this.setState({[inputType]: event.target.value, error: ''});
    }
  }

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

  async componentDidMount() {
    fetchBonusDriverInfo('bonus', this);
  }

  render(){
    return (
      <div className="main">
        <button
          onClick={this.props.toggleBonusDriver}
          className="submit long-wide"
        >
          {this.props.showBonusDriver ? "Hide" : "Show"} Bonus Driver
        </button>

        <form className="main form" onSubmit={this.handleFormSubmit}>
          <h2>
            Update Bonus Driver Coordinates
          </h2>
          <label>
            X-Coordinate:
            <input
              type="text"
              value={this.state.x}
              onChange={(event) => this.onInputChange(event, 'x')}
            />
          </label>
          <label>
            Y-Coordinate:
            <input
              type="text"
              value={this.state.y}
              onChange={(event) => this.onInputChange(event, 'y')}
            />
          </label>
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
      </div>
    )
  }
}

export default BonusDriverForm;
