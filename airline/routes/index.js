const express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/flights', (req, res) => {
  res.send(
    {
      "firstName": "John",
      "lastName": "Smith",
      "isAlive": true,
      "age": 270
      }
    );
})

app.get('/api/flights/:id', (req, res) => {
  res.send(req.params);
});

app.get('/api/flights/:years/:month', (req, res) => {
  res.send(req.params);
});

const port = process.env.port || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

