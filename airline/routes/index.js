const Joi = require('joi');
const express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
const app = express();

app.use(express.json());

const flights = [
  {id: 1, name: 'flight1'},
  {id: 2, name: 'flight2'},
  {id: 3, name: 'flight3'},
  {id: 4, name: 'flight4'},

]

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get('/api/flights', (req, res) => {
  res.send(flights);
}); 

app.get('/api/flights/:id', (req, res) => {
  const flight = flights.find( flight => flight.id === parseInt(req.params.id));
  if(!flight){
    res.status(404).send('resourse not found :( ');  
    return;
  } 
  res.send(flight);
}); 

app.get('/api/flights/:years/:month', (req, res) => {
  res.send(req.params);
});

app.post('/api/flights', (req, res) => {
  
    const {error} = validateFlight(req.body); 
    
    if(error){
      res.status(400).send(error.details[0].message);
      return; 
    }

    const flight = {
      id: flights.length + 1,
      name: req.body.name
    };

    flights.push(flight);
    res.send(flight);
});

app.put('/api/flights/:id', (req, res) => {
    const flight = flights.find( flight => flight.id === parseInt(req.params.id));
    if(!flight){
      res.status(404).send('resourse not found :( ');  
      return;
    } 
    const { error } = validateFlight(req.body); 
   
    if(error){
      res.status(400).send(error.details[0].message);
      return; 
    }

    flight.name = req.body.name;
    res.send(flight);
});

app.delete('/api/flights/:id', (req, res) => {
  const flight = flights.find( flight => flight.id === parseInt(req.params.id));
  if(!flight){
    res.status(404).send('resourse not found :( ');  
    return;
  } 
  
  const index = flights.indexOf(flight);

  flights.splice(index, 1);

  res.send(flight);
});


function validateFlight(flight){
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(flight, schema);
}

const port = process.env.port || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

