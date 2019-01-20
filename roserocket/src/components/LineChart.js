import React, {Component} from 'react';
import {VictoryChart, VictoryLine, VictoryTheme, VictoryScatter} from 'victory';
import axios from 'axios';

class LineChart extends Component {

  state = {
    stops: [],
    finalData: []
  }

  async componentDidMount() {
    try{
      const response = await axios.get('api/v1/stops');
      console.log('response------>', response);
      // response.data
      const finalData = [];
      response.data.forEach((dataPoint) => {
        let obj = {};
        obj['x'] = dataPoint.x_coordinate;
        obj['y'] = dataPoint.y_coordinate;
        obj['name'] = dataPoint.name;
        finalData.push(obj);
      })

      const resp = await axios.get('api/v1/driver');
      console.log('resp from get driver', resp);

      // const driverCoordinates = 
      //
      // for(var i=0; i < 11; i++){
      //   let obj = {};
      //    obj['x'] = response.data[i].x_coordinate;
      //    obj['y'] = response.data[i].y_coordinate;
      //    obj['name'] =
      //    finalData.push(obj);
      // }
      console.log('finalData', finalData);
      this.setState({stops: response.data, finalData});
    }
    catch(e){
      console.log('error in fetching stops', e);
      console.log('full error', e.response);
    }
  }

  render(){
    return (
      <div>
        {
          this.state.finalData.length ?
            <VictoryChart
              theme={VictoryTheme.material}
              >
                <VictoryScatter
                  style={{
                    data: { stroke: "#c43a31" },
                    // parent: { border: "1px solid #ccc"}
                    labels: {fontSize: 7}
                  }}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 10000 }
                  }}
                  labels={datum => datum.name}
                  data={this.state.finalData}
                  domain={{x: [0, 50], y: [0,120]}}
                />
              </VictoryChart>
            :
            null
        }
      </div>
    )
  }
}

export default LineChart;
