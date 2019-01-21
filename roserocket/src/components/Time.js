import React from 'react';

const Time = (props) => {
    return (
      <div>
        <h3>
          Time it will take for the driver to complete the entire path: <span className="bold">{props.time} hours ({props.formattedTime})</span>.
        </h3>
        <br/>
        <h3>
          Time remaining based on location: <span className="bold">{props.remainingTime} hours ({props.formattedRemainingTime})</span>.
        </h3>
      </div>
    )
  }

export default Time;
