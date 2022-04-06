import React from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';

// expect props.list is an array of objects
// each card displays info for a single product
// card itself are clickable, navigate to the detail page for that product

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
      productStyle: {},
      defaultStyle: '',
      productRating: null,
    };
  }

  componentDidMount() {
    this.getProductInfo();
    this.getProductStyle();
    this.getProductRatings();
  }

  getProductInfo() {
    axios.get(`/products/${this.props.productID}`)
      .then((result) => {
        this.setState({
          productInfo: result.data
        })
      })
      .catch((error) => {
        console.log('Error fetching single product details in Product Card', error);
      });
  }

  getProductStyle() {
    axios.get(`/products/${this.props.productID}/styles`)
      .then((result) => {
        var results = result.data.results;
        var defaultStyle = '';
        for (var i = 0; i < results.length; i++) {
          if (results[i]['default?']) {
            defaultStyle = results[i];
          }
        }
        if (defaultStyle === '') {
          defaultStyle = results[0];
        }
        this.setState({
          productStyle: result.data,
          defaultStyle: defaultStyle
        })
      })
      .catch((error) => {
        console.log('Error fetching product style in Product Card', error);
      });
  }

  getProductRatings() {
    axios.get(`/reviews/meta`, { params: { product_id: this.props.productID } })
    .then((response) => {
      // check if there is a rating
      var ratings = response.data.ratings;
      if (Object.keys(ratings).length > 0) {
        var total = 0;
        var amount = 0;
        for( var key in ratings) {
          total += (parseInt(key) * parseInt(ratings[key]));
          amount += parseInt(ratings[key]);
        }
        var average = total/amount;
        this.setState({
          productRating: average.toFixed(2)
        })
      }
    })
    .catch((error) => {
      console.log('Get product review failed...', error);
    })
  }


  render() {
    const { productInfo, productRating, defaultStyle, productStyle} = this.state;
    const { productID, productInfoOfCurrentPage } = this.props;
    return (
      <div >
        <div className="preview-image"><img alt="Product"></img></div>
        <br></br>
        <span>{productInfo.category}</span>
        <br></br>
        <span>{productInfo.name}</span>
        <br></br>
        <span>${productInfo.default_price}</span>
        <br></br>
        <span>{productRating}</span>
        <br></br>
        <button> action button </button>
      </div>
    );
  }
};

//  scr={this.state.defaultStyle.photos[0].thumbnail_url}

export default ProductCard;