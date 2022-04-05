const express = require('express');
const app = express();
const PORT = 3111;
// const productsAPI = require('./api/products.js');
const axios = require('axios');
const config = require('../config.js');

app.use(express.json());
app.use(express.static(__dirname = './client/dist'));
app.use(express.urlencoded({ extended: 'true' }));

// GET a single product.
// app.get('/products/:product_id', (req, res) => {
//   var id = parseInt(req.params.product_id);
//   // console.log('receive params', id)
//   productsAPI.getSingleProduct(id)
//     .then(result => {
//         // console.log('api data', result)
//       res.status(201).send(result.data);
//     })
//     .catch(err => {
//         console.log(err)
//       res.status(500).send(err);
//     })
// })

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
})


