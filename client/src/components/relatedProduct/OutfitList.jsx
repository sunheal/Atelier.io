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
      addOutfit: false,
      outfitList: [],
      currentPosition: 0,
      positionIndex: 0
    };
    this.addOutfit = this.addOutfit.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  addOutfit() {
    var list = this.state.outfitList;
    list.push(this.props.selectedProductInfo);
    this.setState({
      addOutfit: true,
      outfitList: list
    })
  }

  removeOutfit() {
    var list = this.state.outfitList;
    list.pop();
    this.setState({
      addOutfit: false,
      outfitList: list
    })
  }

  moveRight() {
    var newPosition = this.state.currentPosition - 238;
    var newIndex = this.state.positionIndex + 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  moveLeft() {
    var newPosition = this.state.currentPosition + 238;
    var newIndex = this.state.positionIndex - 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  render() {
    const { productID, selectedProductInfo } = this.props;
    const { addOutfit, currentPosition, positionIndex } = this.state;
    return (
      <div id="outfitList" className="list-container">

        <div className="list-header">
          <h3 className="list-title">YOUR OUTFIT</h3>
        </div>

        <div className="carousel-container">

          <div >
            <button id="add-outfit" onClick={this.addOutfit}> Add to Outfit </button>
          </div>

          {positionIndex === 0 ? null : <button className="handles left-handle" onClick={this.moveLeft} >&#8249;</button>}
          <div className="carousel-slider" style={{ transform: `translateX(${currentPosition}px)` }}>
            {!addOutfit ? null : <ProductCard productID={productID} productInfoOfCurrentPage={selectedProductInfo} removeOutfit={this.removeOutfit} />}
          </div>

          <button className="handles right-handle" onClick={this.moveRight} >&#x203A;</button>

        </div>

      </div>
    );
  }
}

export default OutfitList;