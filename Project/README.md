/**Grazioso Salvare Application Setup Instructions**/

Prerequistes:
1. Node.js is installed in your machine
2. A local instance of MongoDB is running

Data must be imported to the database:
- Open a terminal in the project folder.
- Run the following to import the data:
mongoimport --db AAC --collection animals --file AAC.animals.json --jsonArray

Installation:
- To populate library functions and external components run:
npm install

Run the code:
- Run this command in the terminal of the project folder:
node server.js 