const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet')
const {logger, addName, notFound} = require('./middleware/middleware')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//global middleware =====order of middleware is important!!!
//server.use(morgan('dev')); //third party middleware: needs to be npm install
server.use(helmet()); //third party middleware: must be npm installed
server.use(logger);
server.use(express.json()); //built-in middleware: no need to npm install

server.use('/api/hubs', hubsRouter);

// server.use(addName);

server.get('/', addName('Tiffany'), (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome: ${nameInsert}, to the Lambda Hubs API</p>
    `);
});


//SAME AS BELOW!!!!: 
//server.use(function (req, res, next){
//res.status(404).json({errorMessage: "Opps, did not find what you're looking for!"})
//})
server.use(notFound);

// function notFound(req, res, next){
//   res.status(404).json({errorMessage: "Opps, did not find what you're looking for!"})
// }

// function addName(name){
//   return function(req, res, next) {
//   req.name = name
//   next();
// }}

module.exports = server;
