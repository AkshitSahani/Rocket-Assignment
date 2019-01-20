import React, { Component } from 'react';
import axios from 'axios';

class StopsList extends Component {

  state = {
    stops: []
  }

    async componentDidMount() {
      try{
        const response = await axios.get('api/v1/legs');
        console.log('response------>', response);
        this.setState({stops: response.data});
      }
      catch(e){
        console.log('error in fetching stops', e);
        console.log('full error', e.response);
      }
    }
    render() {
      console.log('stops from state!!!!', this.state.stops);
        return (
            <div>
                {
                  this.state.stops.map( stop => {
                    return (
                        <div key={stop.id}>
                            <h2>{stop.leg_ID}</h2>
                        </div>
                    )
                  })
                }
            </div>
        )
    }
}
export default StopsList;
