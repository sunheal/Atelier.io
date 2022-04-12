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

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addOutfit: false,
      outfitList: [],
    };
    this.addOutfit = this.addOutfit.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
  }

  addOutfit() {
    var list = this.state.outfitList;
    list.push(this.props.selectedProductInfo);
    this.setState({
      addOutfit: true,
      outfitList: list
    })
  }

  removeOutfit () {
    var list = this.state.outfitList;
    list.pop();
    this.setState({
      addOutfit: false,
      outfitList: list
    })
  }

  render() {
    const {productID, selectedProductInfo} = this.props;
    const {addOutfit} = this.state;
    return (
    <div id="outfitList" className="container">
      <p className="list-title">YOUR OUTFIT</p>
      <Carousel breakPoints={breakPoints}>
      <div>
      <button id="add-outfit" onClick={this.addOutfit}> Add to Outfit </button>
      </div>
      {!addOutfit ? null : <ProductCard productID={productID} productInfoOfCurrentPage={selectedProductInfo} removeOutfit={this.removeOutfit} />}
      </Carousel>
    </div>
    );
  }
}

export default OutfitList;