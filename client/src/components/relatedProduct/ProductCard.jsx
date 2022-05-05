import React from 'react';
import axios from 'axios';
import PreviewImages from './ProductCard/PreviewImages.jsx';
import PreviewImagesCarousel from './ProductCard/PreviewImagesCarousel.jsx';
import Stars from '../Shared/Stars.jsx';
import './css/ProductCard.css';
import { sendAction } from '../../utils/tracker.js';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productStyle: {},
      defaultStyle: {
        photos: [
          {
            "thumbnail_url": null,
            "url": null
          }
        ]
      },
      productRating: null,
      displayImage: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateDisplayImage = this.updateDisplayImage.bind(this);
  }

  componentDidMount() {
    this.getProductStyle();
    this.getProductRatings();
  }

  getProductStyle() {
    axios.get(`/products/${this.props.productInfo.id}/styles`)
      .then((result) => {
        var results = result.data.results;
        var defaultStyle = '';
        for (var i = 0; i < results.length; i++) {
          if (results[i]['default?']) {
            defaultStyle = results[i];
            break;
          }
        }
        if (defaultStyle === '') {
          defaultStyle = results[0];
        }
        this.setState({
          productStyle: result.data,
          defaultStyle: defaultStyle,
          displayImage: defaultStyle.photos[0].thumbnail_url
        })
      })
      .catch((error) => {
        console.log('Error fetching product style in Product Card', error);
      });
  }

  getProductRatings() {
    axios.get(`/reviews/meta/${this.props.productInfo.id}`)
      .then((response) => {
        // check if there is a rating
        var ratings = response.data.ratings;
        if (Object.keys(ratings).length > 0) {
          var total = 0;
          var amount = 0;
          for (var key in ratings) {
            total += (parseInt(key) * parseInt(ratings[key]));
            amount += parseInt(ratings[key]);
          }
          var average = total / amount;
          this.setState({
            productRating: average.toFixed(1)
          })
        }
      })
      .catch((error) => {
        console.log('Get product review failed...', error);
      })
  }

  handleClick(e) {
    // console.log('clicked', e.target.className);
    if (e.target.className === 'action-btn') {
      this.props.updateModal(this.props.productInfoOfCurrentPage, this.props.productInfo);
      sendAction({
        element: "Star button compare products",
        widget: "Related Products"
      })
    } else if (e.target.className === 'action-btn of') {
      this.props.resetPosition();
      sendAction({
        element: "X button remove outfit",
        widget: "Related Products"
      })
      return;
    } else if (e.target.className === 'image-prev' || e.target.className === 'image-next') {
      return;
    } else if (e.target.className === 'carousel-image') {
      return;
    } else {
      // var id = this.props.productInfo.id;
      // this.props.updateProductID(id);
      this.props.resetPosition();
      sendAction({
        element: "Product card div view product detail",
        widget: "Related Products"
      })
    }
  }

  updateDisplayImage(e) {
    let url = e.target.src;
    this.setState({
      displayImage: url
    })
  }

  render() {
    const { productRating, defaultStyle, productStyle, displayImage } = this.state;
    const { productInfo, productInfoOfCurrentPage, action, removeOutfit, updateModal, updateProductID, resetPosition } = this.props;
    return (
      <div className="productCard" onClick={this.handleClick}>
        <div className="productInfo-upper">
          {action === 'relatedProducts' ? <button className="action-btn">{"\u2606"}</button> : <button className="action-btn of" id={productInfo.id} onClick={removeOutfit}> X </button>}
          <PreviewImages displayImage={displayImage} productInfo={productInfo} />
          {displayImage === null ? null : <PreviewImagesCarousel productStyles={productStyle.results} defaultStyle={defaultStyle} updateImage={this.updateDisplayImage} />}
        </div>
      <Link to={`/goodies/${productInfo.id}`} className={'navigateToProductDetail'}>
        <div className="productInfo">
          <div className="productInfo-category">{productInfo.category}</div>
          <div className="productInfo-name">{productInfo.name}</div>
          {defaultStyle.original_price && defaultStyle.sale_price ?
            <div className="productInfo-price">
              <div className="sale">${defaultStyle.sale_price}</div>
              <div className="original">${defaultStyle.original_price}</div>
            </div>
            :
            <div className="productInfo-price">${defaultStyle.original_price}</div>
          }
          <Stars rating={productRating} />
        </div>
      </Link>
      </div>
    );
  }
};

export default ProductCard;