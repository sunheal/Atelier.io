const axios = require('axios');
const config = require('../../config.js');

let api = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
let headers = {
  'User-Agent': 'request',
  'Authorization': `token ${config.TOKEN}`
};

let getAllProducts = () => {
  let url = api + '/products';
  return axios.get(url, headers);
};

let getSingleProduct = (id) => {
  let url = api + `/products/${id}`;
  return axios.get(url, headers);
};

let getProductStyle = (id) => {
  let url = api + `/products/${id}/style`;
  return axios.get(url, headers);
};

let getRelatedProductsId = (id) => {
  let url = api + `/products/${id}/related`;
  return axios.get(url, headers);
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getProductStyle,
  getRelatedProductsId
}