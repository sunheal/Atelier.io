import React from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';
import PreviewImages from './ProductCard/PreviewImages.jsx';
import Stars from '../Shared/Stars.jsx';

// expect props.list is an array of objects
// each card displays info for a single product
// card itself are clickable, navigate to the detail page for that product

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
      productStyle: {},
      defaultStyle: {
        photos: [
          {
            "thumbnail_url": null,
            "url": null
          }
        ]
      },
      productRating: null
    };

    // this.showModal = this.showModal.bind(this);
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
          for (var key in ratings) {
            total += (parseInt(key) * parseInt(ratings[key]));
            amount += parseInt(ratings[key]);
          }
          var average = total / amount;
          this.setState({
            productRating: average.toFixed(2)
          })
        }
      })
      .catch((error) => {
        console.log('Get product review failed...', error);
      })
  }

  showModal1() {
    console.log('clicked')
    this.props.updateModal(this.props.productInfoOfCurrentPage, this.state.productInfo);
  }

  // showModal() {
  //   this.mergeFeatures();
  //   this.setState({
  //     showComparison: !this.state.showComparison
  //   })
  // }

  // mergeFeatures() {
  //   var commonFeatures = {};
  //   this.props.productInfoOfCurrentPage.features.forEach(item => {
  //     commonFeatures[item.feature] = {
  //       currentPage: item.value,
  //       selected: null
  //     }
  //   })
  //   this.state.productInfo.features.forEach(item => {
  //     if (commonFeatures[item.feature]) {
  //       commonFeatures[item.feature].selected = item.value;
  //     } else {
  //       commonFeatures[item.feature] = {
  //         currentPage: null,
  //         selected: item.value
  //       }
  //     }
  //   })
  //   var productName = {
  //     currentPage: this.props.productInfoOfCurrentPage.name,
  //     selected: this.state.productInfo.name
  //   }
  //   this.setState({
  //     productName : productName,
  //     commonFeatures: commonFeatures
  //   })
  // }

  render() {
    const { productInfo, productRating, defaultStyle,  productStyle} = this.state;
    const { productID, productInfoOfCurrentPage, action, removeOutfit, closeModal, showModal, updateModal, modalArray } = this.props;
    return (
      <div className="productCard">

        <div className="productInfo-upper">
          {action === 'relatedProducts' ? <button className="action-btn" onClick={this.showModal1.bind(this)}>{"\u2606"}</button> : <button className="action-btn" id="of" onClick={removeOutfit}> X </button>}
          {<Modal show={showModal} onClose={closeModal} modalArray={modalArray}/>}
          <PreviewImages currentStyle={defaultStyle} productID={productID}/>
        </div>

        <div className="productInfo">
          <div className="productInfo-category">{productInfo.category}</div>
          <div className="productInfo-name">{productInfo.name}</div>
          {defaultStyle.original_price && defaultStyle.sale_price ?
            <div>
              <div className="productInfo-pricev sale">${defaultStyle.sale_price}</div>
              <div className="productInfo-pricev sale">${defaultStyle.original_price}</div>
            </div>
            :
            <div className="productInfo-price">${defaultStyle.original_price}</div>
          }
          <Stars rating={productRating} />
        </div>
      </div>
    );
  }
};

export default ProductCard;