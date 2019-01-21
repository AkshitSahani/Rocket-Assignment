# README

clone application into your local machine.

cd into application folder.

cd into roserocket (the React folder) and run npm install.

cd back into the application folder and run rails s -p 3001.

Once that is done, cd back into the React folder (roserocket) and run npm start.

Navigate to http://localhost:3000/ and enjoy the app!

If any error shows up on page, simply refresh once.



#Features

- All tasks assigned in project have been completed.

- All Bonus Driver APIs have been created, including the form to update the coordinates of the bonus driver. The bonus driver can be visualized on the chart by clicking the 'show bonus driver' button. The visualization also updates in real time when the bonus driver's location is updated.

- The total time taken by the driver to complete the entire path has been calculated and shown on the page. Furthermore, the time remaining based on the driver's location has also been calculated and shown on the page. This also changes in real time when the drivers location is updated.

- Error handling is done for all inputs, with effective error messages being displayed.

- A PostgreSQL database is used for persistent data storage. 

- The app runs on the Rails framework with Ruby as the programming language and ReactJS in the front end.

