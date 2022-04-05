const express = require('express');
const app = express();
const PORT = 3111;
const axios = require('axios');
const config = require('../config.js');

app.use(express.json());
app.use(express.static(__dirname = './client/dist'));
app.use(express.urlencoded({ extended: 'true' }));

// Wildcard routing
const uri = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const options = {
  headers: {
    Authorization: config.TOKEN
  }
};

app.get('/*', (req, res) => {
  console.log(req.url);
  let url = `${uri}${req.url}`;
  axios.get(url, options)
    .then((result) => {
      console.log('api data', result.data);
      res.status(201).send(result.data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    })
});


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});


