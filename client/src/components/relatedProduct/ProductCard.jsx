import React from 'react';
import axios from 'axios';

// expect props.list is an array of objects
// each card displays info for a single product
// card itself are clickable, navigate to the detail page for that product

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
      productRating: null,
    };
  }

  getProductInfo() {
    axios.get(`/products/${this.props.productID}`)
      .then((result) => {
        this.setState({
          productInfo: result.data
        })
      })
      .catch((error) => {
        console.log('Error fetching single product details in relatedProductsList', error);
      });
  }

  componentDidMount() {
    this.getProductInfo();
  }

  render() {
    const {productInfo} = this.state;
    return (
      <div >
        image<br></br>
        <span>{productInfo.category}</span>
        <br></br>
        <span>{productInfo.name}</span>
        <br></br>
        <span>${productInfo.default_price}</span>
        <br></br>
        Star Rating<br></br>
        <button> action button </button>
      </div>
    );
  }
};


export default ProductCard;