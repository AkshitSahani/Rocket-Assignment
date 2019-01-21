import axios from 'axios';

export const getDriverInfo = async (type, self) => {
  try{
    const response = await axios.get('api/v1/driver');
    // console.log('response from get driver', response);
    const {data} = response;
    const leg = data.active_leg_id[0];
    const progress = data.leg_progress;
    self.setState({selectedLeg: data.active_leg_id, progress});
    if(type === 'form'){
      return;
    }

    // console.log('leg', leg);
    const index = self.state.alphaArray.indexOf(leg);
    // console.log('index', index);
    return {index, progress};
  }
  catch(e){
    console.log('error in getting driver info', e);
    console.log('full error', e.response);
  }
}

export const getLegs = async (self) => {
  try{
    const response = await axios.get('api/v1/legs');
    console.log('resp from get legs', response);
    self.setState({legs: response.data});
  }
  catch(e){
    console.log('error in getting legs', e);
    console.log('full error', e.response);
  }
}

export const fetchBonusDriverInfo = async (type, self) => {
  try{
    const response = await axios.get('/api/v1/bonusdriver');
    // console.log('resp from get bonus driver info', response);
    type === 'bonus' ? self.setState({x: response.data.x_coordinate, y: response.data.y_coordinate}) : self.setState({bonusDriver: {x: response.data.x_coordinate, y: response.data.y_coordinate}});
  }
  catch(e){
    console.log('e in getting bonus driver info', e);
    console.log('full error', e.response);
  }
}

export const regex = /^[0-9]*$/;
