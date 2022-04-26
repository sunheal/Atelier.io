import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import Modal from './Modal.jsx';
import './css/RelatedProductStyle.css';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comparisionArray: [],
      currentPosition: 0,
      positionIndex: 0
    };
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.updateModal = this.updateModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.resetPosition = this.resetPosition.bind(this);
  }

  moveRight() {
    var newPosition = this.state.currentPosition - 300;
    var newIndex = this.state.positionIndex + 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  moveLeft() {
    var newPosition = this.state.currentPosition + 300;
    var newIndex = this.state.positionIndex - 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  resetPosition () {
    this.setState({
      currentPosition: 0,
      positionIndex: 0
    })
  }

  updateModal(currentProductInfo, relatedProductInfo) {
    this.setState({
      showModal: true,
      comparisionArray: [currentProductInfo, relatedProductInfo],
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { showModal, comparisionArray, currentPosition, positionIndex } = this.state;
    const { relatedProductsIDs, relatedProductsInfo, productID, productInfo, updateProductID } = this.props;

    if (!relatedProductsIDs) {
      return (
        <div id="relatedProductsList" className="list-container">
          <div className="list-header">
            <h2 className="list-title">YOU MAY ALSO LIKE</h2>
          </div>
          <div className="message-container">
            <div className="message">
              Loading...
            </div>
          </div>
        </div>
      );
    }

    if (relatedProductsIDs.length === 0) {
      return (
        <div id="relatedProductsList" className="list-container">
          <div className="list-header">
            <h2 className="list-title">YOU MAY ALSO LIKE</h2>
          </div>
          <div className="message-container">
            <div className="message">
              Sorry. No related products found.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div id="relatedProductsList" className="list-container">
        <div className="list-header">
          <h2 className="list-title">YOU MAY ALSO LIKE</h2>
        </div>
        <div className="carousel-container">
          {positionIndex === 0 ? null : <button className="handles left-handle" onClick={this.moveLeft} >&#8249;</button>}
          <div className="carousel-slider" style={{ transform: `translateX(${currentPosition}px)` }}>
            {relatedProductsInfo.map(productObj => (
              <ProductCard key={productObj.id} productInfo={productObj} productInfoOfCurrentPage={productInfo} action={'relatedProducts'} updateModal={this.updateModal} updateProductID={updateProductID} resetPosition={this.resetPosition} />
            ))}
          </div>
          {relatedProductsIDs.length > 4 && positionIndex < (relatedProductsIDs.length - 4) ? <button className="handles right-handle" onClick={this.moveRight} >&#x203A;</button> : null}
        </div>
        {showModal ? <Modal onClose={this.closeModal} comparisionArray={comparisionArray} /> : null}
      </div>
    );
  }
}

export default RelatedProductsList;