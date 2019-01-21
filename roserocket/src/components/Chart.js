import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs/canvasjs.react'
import axios from 'axios';
import {getDriverInfo, getLegs, fetchBonusDriverInfo} from '../commonFunctions/functions';
import Time from './Time';
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
		totalDuration: null,
		bonusDriver: {x: '', y: ''},
		selectedLeg: '',
		progress: ''
  }

	getAndProcessStops = async (index, progress) => {
		try{
			const response = await axios.get('api/v1/stops');
      console.log('response------>', response);
      const {data} = response;
			this.setState({stops: data});
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
			// console.log('deltaX', deltaX);
			// const hypotenuse = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
			// const finalX = deltaX > 0 ? startX + ((progress/100) * Math.abs(deltaX)) : startX - ((progress/100) * Math.abs(deltaX));
			const finalX = startX + ((progress/100) * deltaX);
			// const finalY = deltaY > 0 ? startY + ((progress/100) * Math.abs(deltaY)) : startY - ((progress/100) * Math.abs(deltaY));
			const finalY = startY + ((progress/100) * deltaY);
			// console.log('finalX', finalX, 'finalY', finalY);
			return {x: finalX, y: finalY}
		}
		else{
			// const distance = (progress/100) * Math.abs(deltaY);
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
			await getLegs(this);
			const finalData = await this.getAndProcessStops(index, progress);
			await fetchBonusDriverInfo('', this);
			this.getRemainingDuration();
      // console.log('finalData', finalData);
      this.setState({finalData, loading: false});
    }
    catch(e){
      console.log('error in componentDidMount', e);
      console.log('full error', e.response);
			this.setState({loading: false});
    }
	}

	async componentDidMount() {
    await this.loadData();
		this.getTotalDuration(0,11);
		this.getRemainingDuration();
  }

	async componentDidUpdate(prevProps, prevState) {
		if(this.props.refresh !== prevProps.refresh){
			this.loadData();
		}
	}

	getTime = (distance, speed) => distance/speed;

	getDuration = (start, end) => {
		let answer = 0;
		const {legs, stops, alphaArray} = this.state;
		for(var i = start; i < end; i++){
			const startIndex = alphaArray.indexOf(legs[i].start_stop);
			const stopIndex = alphaArray.indexOf(legs[i].end_stop);
			const startX = stops[startIndex].x_coordinate;
			const startY = stops[startIndex].y_coordinate;
			const stopX = stops[stopIndex].x_coordinate;
			const stopY = stops[stopIndex].y_coordinate;
			const deltaY = Math.abs(stopY - startY);
			const deltaX = Math.abs(stopX - startX);
			// console.log('all varsss', startIndex, stopIndex, startX, startY, stopX, stopY, deltaY);
			if(deltaX !== 0){
				let time;
				if(deltaY === 0){
					time = this.getTime(deltaX, legs[i].speed_limit);
					// console.log('deltaX', deltaX, 'deltaY', deltaY, 'speed limit', legs[i].speed_limit, 'time calculated', time);
				}
				else{
					const hypotenuse = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
					time = this.getTime(hypotenuse, legs[i].speed_limit);
					// console.log('deltaX', deltaX, 'deltaY', deltaY, 'hypotenuse', hypotenuse, 'speed limit', legs[i].speed_limit, 'time calculated', time);
				}
				answer += time;
			}
			else{
				const time = this.getTime(deltaY, legs[i].speed_limit);
				// console.log('deltaY', deltaY, 'speedLimit', leg.speed_limit, 'time calculated', time);
				answer += time;
			}
		}
		// console.log('final answer', answer);
		return answer;
	}

	getTotalDuration = (start, end) => {
		// this.state.legs.forEach((leg) => {
		const answer = this.getDuration(0, this.state.legs.length);
		return this.setState({totalDuration: answer.toFixed(2)});
	}

	formatTime = (time) => {
      const hours = time - (time % 1);
      const minutes = (time % 1) * 60;
      return `${hours} hours and ${Math.round(minutes)} minutes`;
  }

	pendingDistance = (input, progress) => input * (1 - (progress/100));

	getLegSpeedLimit = (currentLeg) => {
		let result;
		this.state.legs.forEach((leg, index) => {
			if(leg.leg_ID === currentLeg){
				return result = {speedLimit: leg.speed_limit, legIndex: index};
			}
		})
		return result;
	}

	getRemainingDuration = () => {
		let answer = 0;
		const {alphaArray, stops, selectedLeg, legs} = this.state;
		const startIndex = alphaArray.indexOf(selectedLeg[0]);
		const stopIndex = alphaArray.indexOf(selectedLeg[1]);
		const {speedLimit, legIndex} = this.getLegSpeedLimit(selectedLeg);
		const startX = stops[startIndex].x_coordinate;
		const startY = stops[startIndex].y_coordinate;
		const stopX = stops[stopIndex].x_coordinate;
		const stopY = stops[stopIndex].y_coordinate;
		const deltaY = Math.abs(stopY - startY);
		const deltaX = Math.abs(stopX - startX);
		const {progress} = this.state;
		if(deltaX !== 0){
			let time;
			if(deltaY === 0){
				time = this.getTime(this.pendingDistance(deltaX, progress), speedLimit);
				// console.log('deltaX', deltaX, 'deltaY', deltaY, 'speed limit', speedLimit, 'time calculated', time);
			}
			else{
				const hypotenuse = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
				time = this.getTime(this.pendingDistance(hypotenuse, progress), speedLimit);
				// console.log('deltaX', deltaX, 'deltaY', deltaY, 'hypotenuse', hypotenuse, 'speed limit', speedLimit, 'time calculated', time);
			}
			answer += time;
		}
		else{
			const time = this.getTime(this.pendingDistance(deltaY, progress), speedLimit);
			// console.log('deltaY', deltaY, 'speedLimit', leg.speed_limit, 'time calculated', time);
			answer += time;
		}
		console.log('remainingTimeanswer', answer);
		const remainingTime = this.getDuration(legIndex + 1, legs.length);
		console.log('remainingTime', remainingTime);
		this.setState({remainingDuration: (answer + remainingTime).toFixed(2)});
	}

	render() {
		const options = {
			animationEnabled: true,
			animationDuration: 2000,
			// backgroundColor: 'lightgrey',
			exportEnabled: true,
			theme: "light2",
			title:{
				text: "Driver route"
			},
			axisY: {
				title: "Y Coordinate",
				interval:20,
				minimum: 0,
				maximum: 200,
				gridThickness: 1
			},
			axisX: {
				title: "X Coordinate",
				interval: 20,
				minimum: 0,
				maximum: 200,
				gridThickness: 1

			},
			data: [
				{
					type: "line",
					toolTipContent: "{name} ({x},{y})",
					dataPoints: this.state.finalData,
					showInLegend: true,
					legendMarkerType: "circle",
					legendText: 'Route taken by driver'
				},
				{
					type: "scatter",
					dataPoints: this.props.showBonusDriver ? [{x: this.state.bonusDriver.x, y:this.state.bonusDriver.y, name: 'Bonus Driver', markerType: 'cross', markerColor: 'green', markerSize: 12,}] : null,
					toolTipContent: "{name} ({x},{y})",
					showInLegend: true,
					legendMarkerType: "cross",
					legendText: 'Bonus Driver'
				}
		],
			legend: {
				horizontalAlign: 'center',
				verticalAlign: 'bottom'
			},
			width: 650,
			height: 650,
		};

		return (
			<div className="main pad-left">
				{/* <span classname="test"> */}
					{
						this.state.finalData.length ?
						<CanvasJSChart
							options = {options}
							onRef={ref => this.chart = ref}
						/>
						:
						null
					}
				{/* </span> */}
				<div className="pad-right">

					<Time
						time={this.state.totalDuration}
						formattedTime={this.formatTime(this.state.totalDuration)}
						remainingTime={this.state.remainingDuration}
						formattedRemainingTime={this.formatTime(this.state.remainingDuration)}
					/>
				</div>

			</div>
		);
	}
}

export default Chart;
