import React from 'react';
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
      comparedProductID: 64621,
      scrollStep: 300,
      previousButton: 'hidden',
      nextButton: 'visible'
    };
  }

  handlePreviousButton() {
    var list = document.getElementById('relatedProductsList');
    var sl = list.scrollLeft;
    if ((sl - this.state.scrollStep) <= 0) {
      list.scrollTo(0,0);
    } else {
      list.scrollTo((sl - this.state.scrollStep),0);
    }
  }

  handleNextButton() {
    var list = document.getElementById('relatedProductsList');
    var sl = list.scrollLeft;
    var sw = list.scrollWidth;
    if ((sl + this.state.scrollStep) >= sw) {
      list.scrollTo(sw,0);
    } else {
      list.scrollTo((sl + this.state.scrollStep),0);
    }
  }

  render() {
    return (
      <div id="relatedProductsList" className="container">
        <button className="lefty paddle" id="left-button"> 1 </button>
        {this.props.relatedProductsIDs.map(productID => (
          <ProductCard key={productID} productID={productID} productInfoOfCurrentPage={this.props.selectedProductInfo} />
        ))}
        <button className="righty paddle" id="right-button"> 2 </button>
      </div>
    );
  }
}

export default RelatedProductsList;


// onClick={this.handlePreviousButton()}
// onClick={this.handleNextButton()}