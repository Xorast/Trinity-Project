# PROJECT TRINITY

Online scientific tool developed for Trinity College Dublin [Ongoing development].

[https://trinity-college-dublin-flow.herokuapp.com/](https://trinity-college-dublin-flow.herokuapp.com/)

## OVERVIEW - WHAT IS THIS APPLICATION FOR ?

Trinity College has a desktop application that is shared locally. They want to make this tool available to all researchers and engineers worldwide and they decided to create this web app to do so.

This tool enables mainly to determine one important characteristic of a karst (underground water) system : its base flow (output data) from data uploaded (input data) to the website, such as date/flow/rain/...

Several methods are used to determine the base flow and can be compared. 

Other outputs are made available.

The application consists of three parts :
* User input upload
* Calculations
* Presentation of the outputs : data visualisation with dynamics charts
   
## WHO IS THIS APPLICATION FOR ?

This application is made available publicly for hydrologists from universities as well as private companies.

## HOW TO USE IT ?

Once on the website [website url & link] landing page, the user is walked through the following steps:

* Making sure the input data format is correct (csv format, order of the data: 1. rain, 2. flow, ...))
* Uploading the data file
* Then, the application processes the data and generates :
  * Output data in a downloadable csv file
  * Dynamic charts
    
## AUTHOR(S)

   * Xorast
   
With the help of the Code Institute Staff.

## BUILT WITH
### LANGUAGES
The application is written in:
* [Python 3]() (3.4.3)
* JavaScript
* HTML5 
* CSS3

### FRAMEWORK & LIBRAIRIES
The following frameworks and librairies have been used:
* [Flask](http://flask.pocoo.org/)
* Data processing and visualisation:
    * [Crossfilter](http://square.github.io/crossfilter/)
    * [DC](https://dc-js.github.io/dc.js/)
    * [D3](https://d3js.org/)
* [Bootstrap](http://getbootstrap.com/) version 4.1.2

## CREDITS
* [Bootswatch](https://bootswatch.com/) - Used theme [here](https://bootswatch.com/cyborg/)

## UPCOMMING DEVELOPMENT
The next steps in the development are :

* Downloadable pdf file with charts and data
* Two more models for the baseflow determination (Test-Driven-Development to be used)