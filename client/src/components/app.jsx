import React from "react";
import axios from 'axios';
import Overview from "./overview/Overview.jsx";
import RelatedProducts from './relatedProduct/RelatedProducts.jsx';
import QandA from "./Q&A/QandA_app.jsx";
import RR_app from "./Ratings&Reviews/RR_app.jsx";
import Navbar from "./navbar.jsx";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: 64622,
      productStyle: {},
      relatedProductsIDs: null,
      relatedProductsInfo: [],
      meta: {},
      reviews: {},
      questions: {},
      outfitList: Object.keys(localStorage) || [], // save IDs
      productInfo: {},

    };
    this.updateProductID = this.updateProductID.bind(this);
    this.updateOutfitList = this.updateOutfitList.bind(this);
    this.addOutfit = this.addOutfit.bind(this);
  }

  componentDidMount() {
    this.getProductInfo(this.state.productID);

  }

    getProductInfo(id) {
        var allPromises = [];
        allPromises.push(axios.get(`/products/${id}`));
        allPromises.push(axios.get(`/products/${id}/styles`));
        allPromises.push(axios.get(`/products/${id}/related`));
        allPromises.push(axios.get(`/reviews/meta`, { params: { product_id: id } }));
        allPromises.push(axios.get(`/reviews`, { params: { product_id: id, count: 5000 } }));
        allPromises.push(axios.get(`/qa/questions`, { params: { product_id: id } }));
        Promise.all(allPromises)
            .then((allPromisesData) => {
                var filteredRelatedProductsIDs = allPromisesData[2].data.filter(id => id !== this.state.productID);
                filteredRelatedProductsIDs = [...new Set(filteredRelatedProductsIDs)];
                this.setState({
                    productInfo: allPromisesData[0].data,
                    productStyle: allPromisesData[1].data,
                    relatedProductsIDs: filteredRelatedProductsIDs,
                    meta: allPromisesData[3].data,
                    reviews: allPromisesData[4].data,
                    questions: allPromisesData[5].data
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
                <h1 id="logo"> Good Deals Only </h1>
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

export default App;