import React from "react";
import axios from 'axios';
import Overview from "./overview/Overview.jsx";
import RelatedProducts from './relatedProduct/RelatedProducts.jsx';
import QandA from "./Q&A/QandA_app.jsx";
import RR_app from "./Ratings&Reviews/RR_app.jsx";
import Navbar from "./navbar.jsx";
import { useParams } from 'react-router-dom';

// Add higher order components to pass down params hook useParams() to class component App
const withRouter = (Component) => {
    return props => <Component {...props} params={useParams()} />;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productID: 64623,
      productStyle: {},
      relatedProductsIDs: null,
      relatedProductsInfo: [],
      meta: {},
      reviews: {},
      // questions: {},
      outfitList: Object.keys(localStorage) || [], // save IDs
      productInfo: {},

        };
        this.updateProductID = this.updateProductID.bind(this);
        this.updateOutfitList = this.updateOutfitList.bind(this);
        this.addOutfit = this.addOutfit.bind(this);
    }

    componentDidMount() {
        const productID = this.props.params.productID || this.state.productID;
        this.setState({ productID }, () => { this.getProductInfo(this.state.productID) });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.productID !== this.props.params.productID) {
            this.setState({ productID: this.props.params.productID }, () => { this.getProductInfo(this.state.productID) });
        }
    }

    getProductInfo(id) {
        var allPromises = [];
        allPromises.push(axios.get(`/products/${id}`));
        allPromises.push(axios.get(`/products/${id}/styles`));
        allPromises.push(axios.get(`/products/${id}/related`));

        ///////////////////WILDCARD GET FUNCTION/////////////////////
        // allPromises.push(axios.get(`/reviews/meta/?product_id=${id}`));
        // allPromises.push(axios.get(`/reviews/?product_id=${id}&count=5000`));
        // allPromises.push(axios.get(`/qa/questions/?product_id=${id}`));
        ///////////////////USE NON-WILDCARD GET FUNCTION/////////////////////
        allPromises.push(axios.get(`/reviews/meta/${id}`));
        allPromises.push(axios.get(`/reviews/${id}`));
        // allPromises.push(axios.get(`/qa/questions/${id}`));
        ///////////////////USE NON-WILDCARD GET FUNCTION/////////////////////
        Promise.all(allPromises)
            .then((allPromisesData) => {
                var uniqueIDs = [...new Set(allPromisesData[2].data)];
                var filteredRelatedProductsIDs = uniqueIDs.filter(id => id !== parseInt(this.state.productID));
                this.setState({
                    productInfo: allPromisesData[0].data,
                    productStyle: allPromisesData[1].data,
                    relatedProductsIDs: filteredRelatedProductsIDs,
                    meta: allPromisesData[3].data,
                    reviews: allPromisesData[4].data,
                    // questions: allPromisesData[5].data
                })
                return filteredRelatedProductsIDs;
            })
            .then((relatedIDs) => {
                var arrayOfPromises = [];
                relatedIDs.forEach((relatedId) => {
                    arrayOfPromises.push(axios.get(`/products/${relatedId}`));
                })
                return Promise.all(arrayOfPromises);
            })
            .then((arrayOfPromisesData) => {
                var relatedProductsInfo = arrayOfPromisesData.map((product) => (product.data));
                this.setState({
                    relatedProductsInfo: relatedProductsInfo
                })
            })
            .catch((error) => {
                console.log('Error fetching product info in App', error);
            });
    }

    updateProductID(id) {
        console.log('update product id = ', id)
        // this.setState({ productID: id });
        this.setState({
            productID: id
        }, () => {
            this.getProductInfo(this.state.productID);
        })
    }

  updateOutfitList(list) {
      this.setState({
          outfitList: list
      })
  }

    addOutfit() {
        var list = this.state.outfitList;
        if (!list.includes(this.state.productInfo.id.toString())) {
            localStorage.setItem(this.state.productInfo.id, JSON.stringify(this.state.productInfo))
            list.unshift(this.state.productInfo.id.toString());
            this.setState({
                outfitList: list
            })
        }
    }

  render() {
      const { productID, productInfo, productStyle, relatedProductsIDs, relatedProductsInfo, meta, reviews, questions, outfitList } = this.state;
      return (
          <div className="app" >
              <h1 id="logo"> What's Goooood? </h1>
              <Navbar />
              <Overview
                  productID={productID}
                  productInfo={productInfo}
                  productStyle={productStyle}
                  // ratings={ratings}
                  // reviewsCount={reviewsCount}
                  meta={meta}
                  reviews={reviews}
                  addOutfit={this.addOutfit}
              />
              <RelatedProducts
                  productID={productID}
                  productInfo={productInfo}
                  productStyle={productStyle}
                  relatedProductsIDs={relatedProductsIDs}
                  relatedProductsInfo={relatedProductsInfo}
                  updateProductID={this.updateProductID}
                  outfitList={outfitList}
                  updateOutfitList={this.updateOutfitList}
                  addOutfit={this.addOutfit}
              />
              <QandA productID={this.state.productID} />
              {Object.keys(meta).length === 0 || Object.keys(reviews).length === 0? null : <RR_app id={productID} meta={meta} reviews={reviews.results} />}
              {/* <RR_app id={productID} meta={meta} reviews={reviews.results} /> */}
          </div>
      )
  }
}

export default withRouter(App);