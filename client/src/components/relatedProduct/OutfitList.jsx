import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import './css/OutfitList.css';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      positionIndex: 0
    };
    this.addOutfit = this.addOutfit.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.resetPosition = this.resetPosition.bind(this);
  }

  addOutfit() {
    this.props.addOutfit();
    this.setState({
      currentPosition: 0,
      positionIndex: 0
    })
  }

  removeOutfit(e) {
    var id = e.target.id;
    var list = this.props.outfitList;
    var index = list.indexOf(id);
    list.splice(index, 1);
    localStorage.removeItem(id);
    this.props.updateOutfitList(list);
  }

  moveRight() {
    var newPosition = this.state.currentPosition - 299;
    var newIndex = this.state.positionIndex + 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  moveLeft() {
    var newPosition = this.state.currentPosition + 299;
    var newIndex = this.state.positionIndex - 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  resetPosition() {
    this.setState({
      currentPosition: 0,
      positionIndex: 0
    })
  }


  render() {
    const { productID, productInfo, updateProductID, outfitList} = this.props;
    const { addOutfit, currentPosition, positionIndex } = this.state;

    let outfits = [];
    outfitList.map(productID => {
      var productObj = JSON.parse(localStorage.getItem(productID));
      outfits.push(productObj);
    })

    return (
      <div id="outfitList" className="list-container">
        <div className="list-header">
          <h2 className="list-title">YOUR OUTFIT</h2>
        </div>
        <div className="outfit-container">
          <div className="add-outfit-card" role="button" onClick={this.addOutfit}>
            <div className="plus-icon">&#43;</div>
            <div className="add-to-Oufit">Add to Outfit</div>
          </div>
          <div className="carousel-container">
            {positionIndex === 0 ? null : <button className="handles left-handle" onClick={this.moveLeft} >&#8249;</button>}
            <div className="carousel-slider" style={{ transform: `translateX(${currentPosition}px)` }}>
              {outfitList.length === 0 ? <div className="add-outfit-message">Add Your First Outfit</div> : null}
              {outfits.map(productObj => (
                <ProductCard key={productObj.id} productID={productObj.id} productInfo={productObj} removeOutfit={this.removeOutfit} updateProductID={updateProductID} resetPosition={this.resetPosition} />
              ))}
            </div>
            {outfitList.length > 3 && positionIndex < (outfitList.length - 3) ? <button className="handles right-handle" onClick={this.moveRight} >&#x203A;</button> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default OutfitList;