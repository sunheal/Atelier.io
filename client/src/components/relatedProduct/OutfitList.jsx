import React from 'react';
import axios from 'axios';
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
      outfitList: Object.keys(localStorage) || [], // save IDs
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
    if (!this.state.addOutfit && !list.includes(this.props.selectedProductInfo.id.toString())) {
      localStorage.setItem(this.props.selectedProductInfo.id, JSON.stringify(this.props.selectedProductInfo))
      list.unshift(this.props.selectedProductInfo.id);
      this.setState({
        addOutfit: true,
        outfitList: list
      })
    }
  }

  removeOutfit(e) {
    var id = e.target.id;
    var list = this.state.outfitList;
    var index = list.indexOf(id);
    list.splice(index, 1);
    localStorage.removeItem(id);
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
    const { addOutfit, outfitList, currentPosition, positionIndex } = this.state;
    console.log('outfitList', outfitList.length)
    let outfits = [];
    outfitList.map(productID => {
      var productObj = JSON.parse(localStorage.getItem(productID));
      // console.log('productObj', productObj);
      outfits.push(productObj);
    })
    // console.log('outfits', outfits);

    return (
      <div id="outfitList" className="list-container">
        <div className="list-header">
          <h3 className="list-title">YOUR OUTFIT</h3>
        </div>
        <div className="outfit-container">
          <div className="add-outfit-card" role="button" onClick={this.addOutfit}>
            <div className="plus-icon">&#43;</div>
            <div className="add-to-Oufit">Add to Outfit</div>
          </div>
          <div className="carousel-container">
            {positionIndex === 0 ? null : <button className="handles left-handle" onClick={this.moveLeft} >&#8249;</button>}
            <div className="carousel-slider" style={{ transform: `translateX(${currentPosition}px)` }}>
              {outfitList.length === 0 ?
                <div>Add Your First Outfit</div>
                : null
              }
              {outfits.map(productObj => (
                <ProductCard key={productObj.id} productID={productObj.id} productInfo={productObj} removeOutfit={this.removeOutfit} />
              ))}

              {/* {outfitList.map(productID => {
                var productObj = JSON.parse(localStorage.getItem(productID));
                console.log('productObj', productObj);
                <ProductCard key={productObj.id} productID={productObj.id} productInfo={productObj} removeOutfit={this.removeOutfit} />
              })} */}
            </div>
            {outfitList.length < 3 || positionIndex === outfitList.lenght - 3 ? null : <button className="handles right-handle" onClick={this.moveRight} >&#x203A;</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default OutfitList;