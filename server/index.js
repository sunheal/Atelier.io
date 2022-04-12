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

app.get("/*", (req, res) => {
  // console.log(req.url);
  let url = `${uri}${req.url}`;
  axios
    .get(url, options)
    .then((result) => {
      // console.log("api data", "result.data");
      res.status(201).send(result.data);
    })
    .catch((err) => {
      // console.error("err");
      res.status(500).send(err);
    });
});

app.put("/*", (req, res) => {
  let url = `${uri}${req.url}`;
  // console.log(url);
  axios
    .put(url, req.body, options)
    .then((result) => {
      // console.log("api data", result.data);
      res.status(201).send(result.data);
    })
    .catch((err) => {
      console.error("err");
      res.status(500).send(err);
    });
});

app.listen(PORT, () => {
    console.log(`listening on localhost at ${PORT}`);
});