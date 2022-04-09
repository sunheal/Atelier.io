import React from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import ProductCard from './ProductCard.jsx';
import Modal from './Modal.jsx';

// related products are same for every customer(display associated with the current product)
// realted products list are the same each time load
// action button - star icon => open modal window comparing the DETAILS of products (current page product vs selected product from the list)

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdOfCurrentPage: this.props.productID,
      comparedProductID: 64621,
      previousButton: 'hidden',
      nextButton: 'visible'
    };
  }

  render() {
    const {previousButton, nextButton} = this.state;
    const {relatedProductsIDs, selectedProductInfo} = this.props;
    return (
      <div id="relatedProductsList" className="container">
      <Carousel breakPoints={breakPoints}>
        {relatedProductsIDs.map(productID => (
          <ProductCard key={productID} productID={productID} productInfoOfCurrentPage={selectedProductInfo} />
        ))}
      </Carousel>
      </div>
    );
  }
}

export default RelatedProductsList;


// onClick={this.handlePreviousButton()}
// onClick={this.handleNextButton()}