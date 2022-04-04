import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import {headers, uri} from '../../../../config.js';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 64620
    }
  }

  componentDidMount() {
    let product_id = this.state.product_id;
    this.getProductInformation(product_id);
  }

  getProductInformation(product_id) {
    axios.get(`${uri}/products/${product_id}`, { headers })
      .then((data) => {
        console.log('getProductInformation', data.data);
      })
      .catch((err) => {
        console.error('getProductInformation', err);
      })
  }

  render() {
    return (
      <div>
        <ImageGallery />
        <ProductInformation />
        <StyleSelector />
        <AddToCart />
      </div>
    );
  }
}

export default Overview;