import React from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
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
    this.state = {
      addOutfit: false
    };
  }

  render() {
    const {productID, selectedProductInfo} = this.props;
    const {addOutfit} = this.state;
    return (
    <div id="outfitList" className="container">
      <p className="list-title">YOUR OUTFIT</p>
      <Carousel>
      <div role="button" id="add-outfit"> Add to Outfit </div>
      {!addOutfit ? null : <ProductCard />}
      </Carousel>
    </div>
    );
  }
}

export default OutfitList;