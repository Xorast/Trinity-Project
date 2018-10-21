# PROJECT TRINITY

Online scientific tool developed for Trinity College Dublin. Ongoing development.

[https://www.tcd-baseflow.com/](https://www.tcd-baseflow.com/)

## AUTHOR(S)

* Xorast

## OVERVIEW - WHAT IS THIS APPLICATION FOR ?

Trinity College has a desktop application that is shared locally. They want to make this tool available to all researchers and engineers worldwide and they decided to create this web app to do so.

This tool enables mainly to determine one important characteristic of a karst (underground water) system : its base flow (output data) from data uploaded (input data) to the website, such as date/flow/rain/...

Several methods are used to determine the base flow and can be compared. Other outputs are made available.

   
## WHO IS THIS APPLICATION FOR ?

This application is made available publicly for hydrologists and students from universities as well as private companies.


## HOW TO USE IT ?

Once on the [website](https://www.tcd-baseflow.com/) landing page, the user is walked through the steps:

* Presentation of the application
* Demonstration of what the application can provide to them: demo page. 
* Explanation of the input file requirements (making sure the input data format is correct (csv format, order of the data: 1. rain, 2. flow, ...)). A example of input file is downloadable to help the user.
* Upload of the data file.
* Getting the final page with :
  * Output data in a downloadable csv file
  * Data visualisation with dynamic charts
  * Possibility to archive the data online (MongoDB)
  * Possibility to delete immediately all files to give control to the user (but regular deletions are scheduled).


## ARCHITECTURE 

The application is mainly server-sided. The application is started with the 'application.py' file (Flask app).

From this main file, functions are imported from other files:
* data_input.py is used when the user upload the file
* data_output.py is used to process the input data. This file import functions from :
    * calls calculations.py (equations)
* archive.py is used to store the output data on the online database
* data_tools provides generic functions to be imported by any file


The user input file is saved in static/data/data_input.
The output file is created and saved in static/data/data_output.

Two examples files are given :
* input file example in static/data/data_input_example. This file is downloadable on the "instructions" page.
* output file example in static/data/data_output_example used to generate the demo page.


## DATA PROTECTION 

It is important for the users to know they can trust the website with their data, otherwise they won't use the application. Data are valuable and require a lot of investments from laboratories. 
In order to protect them and make sure they won't land in other hands, both input & output data that are stored on the server are deleted regularly.
As the data are cached in the user's browser, he/she should be able to still use the generated charts even if the data are not on the server anymore.

Also, the data are transfered with a secure connection (SSL).


## TESTING

The application has been tested manually.

One major failure has been detected and addressed: 
The application crashes if the file extension of the user input file is not the required one (.csv). This is addressed by making the input file field accepting only ".csv" extension.


## TEST DRIVEN DEVELOPMENT

To be implemented:
TDD will be applied to the output file to make sure the whole process is working as expected.
The input / output pair will come from another code, already existing for a desktop app.

## WIREFRAME


## DEPLOYMENT

To deploy this application, you'll need to :

* Fork and deployed directly on Heroku, as it is.
* Set a secret key to your Flask application in your environment to enable session (required).
* Set your own MongoDB (mLab) account and register the keys/URI into the environment.


## BUILT WITH
### LANGUAGES
The application is written in:
* [Python 3](https://www.python.org/) (3.4.3) - Backend
* JavaScript - Frontend (charts & jquery)
* HTML5 
* CSS3

### FRAMEWORK & LIBRAIRIES
The following frameworks and librairies have been used:
* [Flask](http://flask.pocoo.org/)
* Data processing and visualisation:
    * [Crossfilter](http://square.github.io/crossfilter/) - JavaScript library for exploring large multivariate datasets in the browser
    * [DC](https://dc-js.github.io/dc.js/) -  Javascript charting library
    * [D3](https://d3js.org/) - JavaScript library for data visualisation
* [Bootstrap](http://getbootstrap.com/) version 4.1.2
* [jQuery](https://jquery.com/)

### SERVICES
* Online NoSQL Database : [MongoDB - mLab](https://mlab.com/)
* Host : [Heroku](https://heroku.com)
* Scheduler : [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler)

## CREDITS
* Theme: [Bootswatch](https://bootswatch.com/) - Used theme [here](https://bootswatch.com/cyborg/)

## UPCOMMING DEVELOPMENT
The next steps in the development are :

* Downloadable .pdf file with charts and data
* Two more models for the baseflow determination