const express = require("express");
const app = express();
const PORT = 3111;
const config = require("../config.js");
const compression = require('compression');
const cors = require("cors");
const axios = require("axios");

///////////////////USE NON-WILDCARD GET FUNCTION/////////////////////
const path = require('path');
///////////////////USE NON-WILDCARD GET FUNCTION/////////////////////

app.use(cors());
app.use(compression());
app.use(express.json());

app.use(express.static((__dirname = "./client/dist")));
app.use(express.urlencoded({ extended: "true" }));

// Wildcard routing
const uri = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp";
const options = {
  headers: {
    Authorization: config.TOKEN,
  },
};

//////ORIGINAL WILDCARD GET FUNCTION/////////
// app.get("/*", (req, res) => {
//   // console.log(req.url);
//   // if (req.url.startsWith('/ls')) {
//   //   console.log('REQ.URL');
//   //   res.status(201).redirect('http://localhost:3111/#logo');
//   // }
//   let url = `${uri}${req.url}`;
//   axios
//     .get(url, options)
//     .then((result) => {
//       // console.log("api data", "result.data");
//       res.status(result.status).send(result.data)
//     })
//     .catch((err) => {
//       // console.error("err");
//       res.send(err);
//     });
// });
//////ORIGINAL WILDCARD GET FUNCTION/////////

///////////////////USE NON-WILDCARD GET FUNCTION/////////////////////
app.get('/products/:product_id', (req, res) => {
  let url = `${uri}${req.url}`;
  axios
    .get(url, options)
    .then((result) => {
      res.status(result.status).send(result.data)
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  let url = `${uri}${req.url}`;
  axios
    .get(url, options)
    .then((result) => {
      res.status(result.status).send(result.data)
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/products/:product_id/related', (req, res) => {
  let url = `${uri}${req.url}`;
  axios
    .get(url, options)
    .then((result) => {
      res.status(result.status).send(result.data)
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/reviews/meta/:product_id', (req, res) => {
  const { product_id } = req.params;
  let url = `${uri}/reviews/meta/?product_id=${product_id}`;
  axios
    .get(url, options)
    .then((result) => {
      res.status(result.status).send(result.data)
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/reviews/:product_id', (req, res) => {
  const { product_id } = req.params;
  let url = `${uri}/reviews/?product_id=${product_id}&count=5000`;
  axios
    .get(url, options)
    .then((result) => {
      res.status(result.status).send(result.data)
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/qa/questions/:product_id', (req, res) => {
  const { product_id } = req.params;
  let url = `${uri}/qa/questions/?product_id=${product_id}`;
  axios
    .get(url, options)
    .then((result) => {
      res.status(result.status).send(result.data)
    })
    .catch((err) => {
      res.send(err);
    });
});
///////////////////USE NON-WILDCARD GET FUNCTION/////////////////////

app.put("/*", (req, res) => {
  let url = `${uri}${req.url}`;
  axios
    .put(url, req.body, options)
    .then((result) => {
      res.status(result.status).send(result.data)
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/*", (req, res) => {
  console.log(req.url);
  let url =`${uri}${req.url}`;
  axios
  .post(url, req.body, options)
  .then((result) => {
    res.status(result.status).send(result.data)
  })
  .catch((err) => {
    res.send(err);
  });
})

///////USE NON-WILDCARD GET FUNCTION TO DYNAMICALLY RENDER PRODUCT ID IN URL////////
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname,'index.html'));
});
///////USE NON-WILDCARD GET FUNCTION TO DYNAMICALLY RENDER PRODUCT ID IN URL////////

app.listen(PORT, () => {
    console.log(`listening on localhost at ${PORT}`);
});