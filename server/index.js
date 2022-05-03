const express = require("express");
const app = express();
const PORT = 3111;
const config = require("../config.js");
const cors = require("cors");
const axios = require("axios");

app.use(cors());
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
app.get("/*", (req, res) => {
  // console.log(req.url);
  // if (req.url.startsWith('/ls')) {
  //   console.log('REQ.URL');
  //   res.status(201).redirect('http://localhost:3111/#logo');
  // }
  let url = `${uri}${req.url}`;
  axios
    .get(url, options)
    .then((result) => {
      // console.log("api data", "result.data");
      res.status(result.status).send(result.data)
    })
    .catch((err) => {
      // console.error("err");
      res.send(err);
    });
});
//////ORIGINAL WILDCARD GET FUNCTION/////////

////////////////////////////////////////
// app.get('/products/:product_id', (req, res) => {
//   // console.log(req.url)
//   let url = `${uri}${req.url}`;
//   axios
//     .get(url, options)
//     .then((result) => {
//       // console.log("api data", result.data);
//       res.status(result.status).send(result.data)
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.get('/products/:product_id/styles', (req, res) => {
//   // console.log(req.url)
//   let url = `${uri}${req.url}`;
//   axios
//     .get(url, options)
//     .then((result) => {
//       // console.log("api data", result.data);
//       res.status(result.status).send(result.data)
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.get('/products/:product_id/related', (req, res) => {
//   // console.log(req.url)
//   let url = `${uri}${req.url}`;
//   axios
//     .get(url, options)
//     .then((result) => {
//       // console.log("api data", result.data);
//       res.status(result.status).send(result.data)
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.get('/reviews/meta/:product_id', (req, res) => {
//   console.log(req.url)
//   let url = `${uri}${req.url}`;
//   axios
//     .get(url, options)
//     .then((result) => {
//       console.log("api data", result.data);
//       res.status(result.status).send(result.data)
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.get('/reviews/:product_id', (req, res) => {
//   console.log(req.url)
//   let url = `${uri}${req.url}`;
//   axios
//     .get(url, options)
//     .then((result) => {
//       console.log("api data", result.data);
//       res.status(result.status).send(result.data)
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.get('/qa/questions/:product_id', (req, res) => {
//   console.log(req.url)
//   let url = `${uri}${req.url}`;
//   axios
//     .get(url, options)
//     .then((result) => {
//       console.log("api data", result.data);
//       res.status(result.status).send(result.data)
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });
////////////////////////////////////////

app.put("/*", (req, res) => {
  let url = `${uri}${req.url}`;
  // console.log(url);
  axios
    .put(url, req.body, options)
    .then((result) => {
      // console.log("api data", result.status);
      res.status(result.status).send(result.data)
    })
    .catch((err) => {
      // console.log(req.body);
      // console.log(err.response.status);
      res.send(err);
    });
});

app.post("/*", (req, res) => {
  let url =`${uri}${req.url}`;
  axios
  .post(url, req.body, options)
  .then((result) => {
    // console.log(result.data)
    // console.log("api data", result.status);
    res.status(result.status).send(result.data)
  })
  .catch((err) => {
    // console.log(req.body);
    // console.log(err.response.status);
    res.send(err);
  });
})

app.listen(PORT, () => {
    console.log(`listening on localhost at ${PORT}`);
});