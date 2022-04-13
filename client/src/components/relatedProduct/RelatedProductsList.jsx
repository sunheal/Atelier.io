import React from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import ProductCard from './ProductCard.jsx';
import Modal from './Modal.jsx';

// related products are same for every customer(display associated with the current product)
// realted products list are the same each time load
// action button - star icon => open modal window comparing the DETAILS of products (current page product vs selected product from the list)

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comparedProductID: 64621,
      showModal: false,
      modalArray: [],
      currentPosition: 0,
      positionIndex: 0
    };
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.updateModal = this.updateModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  moveRight() {
    var newPosition = this.state.currentPosition - 45;
    var newIndex = this.state.positionIndex + 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  moveLeft() {
    var newPosition = this.state.currentPosition + 45;
    var newIndex = this.state.positionIndex - 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  updateModal(currentProduct, relatedProduct) {
    // console.log('clicked')
    this.setState({
      showModal: true,
      modalArray: [currentProduct, relatedProduct],
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { comparedProductID, showModal, modalArray, currentPosition, positionIndex } = this.state;
    const { relatedProductsIDs, selectedProductInfo, productID } = this.props;

    return (
      <div id="relatedProductsList" className="list-container">
        <div className="list-header">
          <h3 className="list-title">RELATED PRODUCTS</h3>
        </div>

        <div className="carousel-container">
          {positionIndex === 0 ? null : <button className="handles left-handle" onClick={this.moveLeft} >&#8249;</button>}
          <div className="carousel-slider" style={{ transform: `translateX(${currentPosition}%)` }}>
            {relatedProductsIDs.map(productID => (
              <ProductCard key={productID} productID={productID} productInfoOfCurrentPage={selectedProductInfo} action={'relatedProducts'} modalArray={modalArray}  showModal={showModal} updateModal={this.updateModal} closeModal={this.closeModal}/>
            ))}
          </div>
          {positionIndex === relatedProductsIDs.length - 3 ? null : <button className="handles right-handle" onClick={this.moveRight} >&#x203A;</button>}
        </div>

      </div>
    );
  }
}

export default RelatedProductsList;