const express = require('express');
const app = express();
const PORT = 3111;
const productsAPI = require('./api/products.js');

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: 'true' }));

console.log(__dirname + '/../client/dist', 'dirname');
// GET a single product.
app.get('/products/:product_id', (req, res) => {
  var id = parseInt(req.params.product_id);
  // console.log('receive params', id)
  productsAPI.getSingleProduct(id)
    .then(result => {
        // console.log('api data', result.data)
      res.status(201).send(result.data);
    })
    .catch(err => {
        console.log(err)
      res.status(500).send(err);
    })
})
//GET reviews base on product_id 
app.get('/reviews/:product_id', (req, res) => {
  const id = req.params.product_id;
  productsAPI.getReview(id)
  .then(output => {
    console.log(output.data.results, 'output.dataaaa')
    res.send(output.data.results)
  })
  .catch(err=> console.log(err));
})


app.listen(PORT, () => {
    console.log(`listening on localhost at ${PORT}`);
})


