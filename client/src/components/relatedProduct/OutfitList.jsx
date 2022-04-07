import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Modal from './Modal.jsx';
import Carousel from './Carousel.jsx';
import ProductCard from './ProductCard.jsx';

// ONE outfit list per customer (should remain the same list regardless of which product detail page they are viewing)
// the PRODUCTS in this list is unique to each user (should have local store)
// BUTTON - the first card(on the left) is not a product card, should be a "+" icon AND "Add to Outfit" (always on the left as first)
// defalut: contain no products
// a product can only be added to an outfit ONCE
// action Buttton 'X': remove the product from the Outfit list

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const containerStyle = {
      'border-color': 'black',
      'border-style': 'solid',
      'margin': '10px 3% 10px'
    }
    return (
    <div style={containerStyle} id="outfitList">
      <button> Add to Outfit </button>
      {/* <ProductCard /> */}
    </div>
    );
  }
}

export default OutfitList;