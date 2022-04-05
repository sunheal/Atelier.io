const express = require("express");
const app = express();
const PORT = 3111;
const productsAPI = require("./api/products.js");
const qaApi = require("./api/QA")
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static((__dirname = "./client/dist")));
app.use(express.urlencoded({ extended: "true" }));


// GET a single product.
app.get("/products/:product_id", (req, res) => {
  var id = parseInt(req.params.product_id);
  // console.log("receive params", id);
  productsAPI
    .getSingleProduct(id)
    .then((result) => {
      // console.log("api data", result.data);
      res.status(201).send(result.data);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send(err);
    });
});

app.get("/qa/questions/:product_id", (req, res) => {
  var id = parseInt(req.params.product_id);
  console.log("qa32", id);
  qaApi
    .getQAList(id)
    .then((result) => {
      console.log("api data", result.data);
      res.status(201).send(result.data);
    })
    .catch((err) => {
      console.log('err');
      res.status(500).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
