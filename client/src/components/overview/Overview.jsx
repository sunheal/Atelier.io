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
      id: 64620,
      information: {},
      styles: {},
      ratings: '',
      reviewsCount: ''
    }
  }

  componentDidMount() {
    let id = this.state.id;
    this.getProductInformation(id);
    this.getProductStyles(id);
    this.getProductRatings(id);
  }

  getProductInformation = (id) => {
    axios.get(`/products/${id}`)
      .then((res) => {
        const information = res.data;
        console.log(information);
        this.setState({ information });
      })
      .catch((err) => {
        console.error('getProductInformation', err);
      })
  }

  getProductStyles = (id) => {
    axios.get(`/products/${id}/styles`)
      .then((res) => {
        const styles = res.data;
        this.setState({ styles });
      })
      .catch((err) => {
        console.error('getProductStyles', err);
      })
  }

  getProductReviews = (id) => {
    aixos.get(`/reviews/?sort='newest'&product_id=${id}`)
  }

  getProductRatings = (id) => {
    axios.get(`/reviews/meta/?product_id=${id}`)
      .then((res) => {
        // console.log('getProductRatings', res.data.ratings['1']);
        const reviewsCount = Number(res.data.ratings['1']) + Number(res.data.ratings['2']) + Number(res.data.ratings['3']) + Number(res.data.ratings['4']) + Number(res.data.ratings['5']);
        const ratings = ((Number(res.data.ratings['1']) * 1 + Number(res.data.ratings['2']) * 2 + Number(res.data.ratings['3']) * 3 + Number(res.data.ratings['4']) * 4 + Number(res.data.ratings['5']) * 5) / reviewsCount).toFixed(2);
        this.setState({ ratings, reviewsCount });
      })
      .catch((err) => {
        console.error('getProductRatings', err);
      })
  }

  render() {
    return (
      <div id="overview">
        <h1>Overview</h1>
        <ImageGallery />
        <ProductInformation information={this.state.information} ratings={this.state.ratings} reviewsCount={this.state.reviewsCount} />
        <StyleSelector />
        <AddToCart />
      </div>
    );
  }
}

export default Overview;