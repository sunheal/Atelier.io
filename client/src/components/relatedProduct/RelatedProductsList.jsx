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
      productIdOfCurrentPage: this.props.productID,
      comparedProductID: 64621
    };
  }

  render() {
    const containerStyle = {
      'border-color': 'black',
      'border-style': 'solid',
      'margin': '10px 3% 10px'
    }
    return (
      <div style={containerStyle} id="relatedProductsList">
        {this.props.relatedProductsIDs.map(productID => (
          <ProductCard key={productID} productID={productID} productInfoOfCurrentPage={this.props.selectedProductInfo} />
        ))}
      </div>
    );
  }
}

export default RelatedProductsList;
