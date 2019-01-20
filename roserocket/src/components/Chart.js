import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs/canvasjs.react'
import axios from 'axios';
import {getDriverInfo} from '../commonFunctions/functions';
import {ClimbingBoxLoader} from 'react-spinners';
// var CanvasJSReact = require('./assets/js/canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {

	state = {
    stops: [],
		legs: [],
    finalData: [],
		alphaArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
		loading: false,
  }

	getAndProcessStops = async (index, progress) => {
		try{
			const response = await axios.get('api/v1/stops');
      console.log('response------>', response);
      const {data} = response;
      const finalData = [];
			for(var i=0; i <= index; i++){
				let obj = {};
				obj['x'] = data[i].x_coordinate;
				obj['y'] = data[i].y_coordinate;
				obj['name'] = data[i].name;
				finalData.push(obj);
			}
			const {x, y} = this.getDriverCoordinates(index, progress, data);
			// const {x, y} = this.getDriverCoordinates(index, progress, data);
			finalData.push({
				x,
				y,
				name: 'Driver',
				markerType: 'cross',
				showInLegend: true,
				markerColor: 'red',
				markerSize: 12,
				// indexLabel: 'Driver',
				// indexLabelFontSize: 10,
				// indexLabelPlacement: 'outside'
			});
			// for(var i=index+1; i < response.data.length; i++){
			// 	let obj = {};
			// 	obj['x'] = response.data[i].x_coordinate;
			// 	obj['y'] = response.data[i].y_coordinate;
			// 	obj['name'] = response.data[i].name;
			// 	finalData.push(obj);
			// }
			return finalData;
		}
		catch(e){
			console.log('error in getting stops', e);
			console.log('full error', e.response);
		}
	}

	getDriverCoordinates = (index, progress, stops) => {
		const startX = stops[index].x_coordinate;
		const startY = stops[index].y_coordinate;
		const stopX = stops[index + 1].x_coordinate;
		const stopY = stops[index + 1].y_coordinate;
		const deltaY = stopY - startY
		if(stopX - startX !== 0){
			const deltaX = stopX - startX;
			console.log('deltaX', deltaX);
			// const hypotenuse = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
			// const finalX = deltaX > 0 ? startX + ((progress/100) * Math.abs(deltaX)) : startX - ((progress/100) * Math.abs(deltaX));
			const finalX = startX + ((progress/100) * deltaX);
			// const finalY = deltaY > 0 ? startY + ((progress/100) * Math.abs(deltaY)) : startY - ((progress/100) * Math.abs(deltaY));
			const finalY = startY + ((progress/100) * deltaY);
			console.log('finalX', finalX, 'finalY', finalY);
			return {x: finalX, y: finalY}
		}
		else{
			const distance = (progress/100) * Math.abs(deltaY);
			const finalY = startY + ((progress/100) * deltaY);
			// const finalY = deltaY > 0 ? startY + distance : startY - distance;
			// console.log('finalY', finalY);
			return {x: startX, y: finalY};
		}
	}

	loadData = async () => {
		this.setState({loading: true});
		try{
			const {index, progress} = await getDriverInfo('', this);
			const finalData = await this.getAndProcessStops(index, progress);
      // console.log('finalData', finalData);
      this.setState({finalData, loading: false});
    }
    catch(e){
      console.log('error in componentDidMount', e);
      console.log('full error', e.response);
    }
	}

	async componentDidMount() {
    this.loadData();
  }

	async componentDidUpdate(prevProps, prevState) {
		if(this.props.refresh !== prevProps.refresh){
			this.loadData();
		}
	}

	render() {
		const options = {
			animationEnabled: true,
			animationDuration: 2000,
			exportEnabled: true,
			theme: "light2",
			title:{
				text: "Driver route"
			},
			axisY: {
				title: "Y Coordinate",
				interval:10,
				minimum: 0,
				maximum: 110,
				gridThickness: 1
			},
			axisX: {
				title: "X Coordinate",
				interval: 10,
				minimum: 0,
				maximum: 50,
				gridThickness: 1

			},
			data: [{
				type: "line",
				toolTipContent: "{name} ({x},{y})",
				dataPoints: this.state.finalData,
				showInLegend: true,
				legendMarkerType: "circle",
				legendText: 'Route taken by driver'
			}],
			legend: {
				horizontalAlign: 'center',
				verticalAlign: 'bottom'
			},
			width: 750,
			height: 750,
		}
		return (
		<div>
			{
				// this.state.loading ?
				// 	null
				// 	:
					this.state.finalData.length ?
						<CanvasJSChart
							options = {options}
							onRef={ref => this.chart = ref}
						/>
						:
						null
			}
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default Chart;
