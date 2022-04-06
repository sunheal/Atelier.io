import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import Modal from './Modal.jsx';
import Carousel from './Carousel.jsx';

// related products are same for every customer(display associated with the current product)
// realted products list are the same each time load
// action button - star icon => open modal window comparing the DETAILS of products (current page product vs selected product from the list)

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdOfCurrentPage: props.productID,
      selectedProductID: null,
      relatedProductsInfo: []
    };
  }

  // navigate to product detail page when click
  // navigateToNewProductPage(e) {
  //   this.setState({
  //     productIdOfCurrentPage: e.target.id
  //   })
  // }

  getSingleProductInfo(id) {
    axios.get(`/products/${id}`)
      .then((result) => {
        return result.data;
      })
      .then(data => {
        console.log('data', data)
        return data;
      })
      .catch((error) => {
        console.log('Error fetching single product details in relatedProductsList', error);
      });
  }

  // getRelatedProductsID(id) {
  //   axios.get(`/products/${id}/related`)
  //     .then((result) => {
  //       this.setState({
  //         relatedProductsID: result.data
  //       })
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching related products in relatedProductsList', error);
  //     });
  // }

  getProductStyle(id) {
    axios.get(`/products/${id}/related`)
      .then((result) => {
        console.log('Product Style ==== ', result.data);
      })
      .catch((error) => {
        console.log('Error fetching product style in relatedProductsList', error);
      });
  }

  componentDidMount() {

  }

  render() {
    this.props.relatedProductsID.map(id => {
      console.log('id = ', id)
      this.getSingleProductInfo(id);
    })

    return (
      <div id="relatedProductsList">
        <h3>RELATED PRODUCTS</h3>
        {this.state.productIdOfCurrentPage}

      </div>
    );
  }
}

export default RelatedProductsList;