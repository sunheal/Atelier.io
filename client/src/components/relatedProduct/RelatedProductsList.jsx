import React from 'react';
import ReactDOM from 'react-dom';
import ProductCard from './ProductCard.jsx';
import Modal from './Modal.jsx';
import Carousel from './Carousel.jsx';

// related products are same for every customer(display associated with the current product)
// realted products list are the same each time load
// action button - star icon => open modal window comparing the DETAILS of products (current page product vs selected product from the list)


class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div id="relatedProductsList">
      <h3>RELATED PRODUCTS</h3>
      <ProductCard />
    </div>
    );
  }
}

export default RelatedProductsList;