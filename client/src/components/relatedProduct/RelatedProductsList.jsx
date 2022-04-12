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
      currentPosition: 0,
      positionIndex: 0
    };
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
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
    const { comparedProductID, currentPosition, positionIndex } = this.state;
    const { relatedProductsIDs, selectedProductInfo, productID } = this.props;

    return (
      <div id="relatedProductsList" className="list-container">
        <div className="list-header">
          <h3 className="list-title">RELATED PRODUCTS</h3>
        </div>

        <div className="carousel-container">
          {positionIndex === 0 ? null : <button className="handles left-handle" onClick={this.moveLeft} >&#8249;</button>}
          <div className="carousel-slider" style={{ transform: `translateX(${currentPosition}px)` }}>
            {relatedProductsIDs.map(productID => (
              <ProductCard key={productID} productID={productID} productInfoOfCurrentPage={selectedProductInfo} action={'relatedProducts'} />
            ))}
          </div>
          <button className="handles right-handle" onClick={this.moveRight} >&#x203A;</button>
        </div>

      </div>
    );
  }
}

export default RelatedProductsList;