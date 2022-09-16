# Weather-app-DV

### General Guide to run the project:
- You can run the project by writing the command ```npm start``` ( you may need to run ```npm i```  first to ensure that node modules are included in the project )
- you should include the the `api key`for the open weather account to successfully make the api requests, in an .env file under the name ```REACT_APP_API_ID``` ( you may use this in your .env file if you don't have an account on open weather ```89903ca51ebd4eedb94e00415b652c0e``` )

### About weather app :
- When the app loads the user shall get a message to allow the browser to get the current location in order to get the weather data for that location ( if   the user denies, it’s current location weather data won’t appear and only stuttgart and london weather data will be shown)
-  When the user allows the browser to access the current location, it will be saved in the local storage
-  Each location appears to the user ( current, stuttgart and london ) will have city name, current temperature and an icon explaining the description for the weather( sunny, rainy, cloudy,etc...)
-  The user will have the option to display the temperature in celsius unit or in fahrenhiet unit through a switcher button
- When the temperature unit is chosen by the user it gets saved in the local storage and whenever the user refresh the page the temperature unit will be  always the same as the one saveed in local storage
- the user location will be saved in the local storage
- The user will get a feedback error in the main page with route ‘/‘ if the api key for open weather api expired or doesn't exist.
- When the user clicks on one of the 3 boxes dispalyed ( current weather, stuttgart, london) a navigation happens to another route ```/{city-name}``` with weather data for that chosen location displayed
#### The user will be able to see the following info for the the location chosen in ```/{city-name}``` route :
- The name of the location the user choose from the previous page/route
- Description for the current weather
- Current temperature
- Humidity
- Highes temperature today
- Lowest temperature today
- Sunrise time
- Sunset time
- visibility


- A back button is provided to get back to the previous page
