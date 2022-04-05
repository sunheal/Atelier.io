const axios = require("axios");
const config = require("../../config.js");

const api = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp";
const options = {
  headers: {
    Authorization: config.TOKEN,
  },
};

const getQAkkList = (id) => {
  let url = `${api}/qa/questions/${id}`;
  console.log(url, options);
  return axios.get(url, options);
};

const getQAList = (id) => {
  let url = api + `qa/questions/${id}`;
  console.log(url, options)
  return axios.get(url, options);
};

module.exports = {
  getQAList,
};
