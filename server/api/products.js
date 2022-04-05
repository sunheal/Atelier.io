const axios = require('axios');
const config = require('../../config.js');

let api = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
let options = {
  headers: {
    Authorization: config.TOKEN
  }
};

let getAllProducts = () => {
  let url = api + '/products';
  return axios.get(url, options);
};

let getSingleProduct = (id) => {
  let url = api + `/products/${id}`;
  return axios.get(url, options);
};

let getProductStyle = (id) => {
  let url = api + `/products/${id}/styles`;
  return axios.get(url, options);
};

let getRelatedProductsId = (id) => {
  let url = api + `/products/${id}/related`;
  return axios.get(url, options);
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getProductStyle,
  getRelatedProductsId
}