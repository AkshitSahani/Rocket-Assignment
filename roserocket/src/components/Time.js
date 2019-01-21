import React, {Component} from 'react';

const Time = (props) => {
    return (
      <div>
        <h3>
          Time it will take for the driver to complete the entire path: {props.time} hours ({props.formattedTime}).
        </h3>
        <br/>
        <h3>
          Time remaining based on location: {props.remainingTime} hours ({props.formattedRemainingTime}).
        </h3>
      </div>
    )
  }

export default Time;
