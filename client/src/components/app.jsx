import React from "react";
import axios from 'axios';
import Overview from "./overview/Overview.jsx";
import ListsWrapper from './RelatedProduct/ListsWrapper.jsx';
import QandA from "./Q&A/QandA_app.jsx";
import RR_app from "./Ratings&Reviews/RR_app.jsx";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: 64620,
            allProducts: [],
            selectedProductInfo: {},
            productStyle: {},
            relatedProductsIDs: [],
            relatedProductsInfo: [],
            meta: {},
            reviews: {},
            questions: {},
        }
    }

    componentDidMount() {
        this.getAllProducts();
        this.getSelectedProduct(64620);
        this.getProductStyle(64620);
        this.getRelatedProduct(64620);
        this.getMetaData(64620);
        this.getProductReviews(64620);
        this.getProductQuestions(64620);
        var arrPr = [ this.getAllProducts(),
            this.getSelectedProduct(64620),
            this.getProductStyle(64620),
            this.getRelatedProduct(64620),
            this.getMetaData(64620),
            this.getProductReviews(64620),
            this.getProductQuestions(64620)];
        return Promise.all(arrPr);
    }

    getAllProducts() {
       return axios.get('/products/')
            .then((result) => {
                this.setState({
                    allProducts: result.data
                })
            })
            .catch((error) => {
                console.log('Error fetching single product details in App', error);
            });
    }

    getSelectedProduct(id) {
       return axios.get(`/products/${id}`)
            .then((result) => {
                this.setState({
                    selectedProductInfo: result.data
                })
            })
            .catch((error) => {
                console.log('Error fetching single product details in App', error);
            });
    }

    getProductStyle(id) {
        return axios.get(`/products/${id}/styles`)
            .then((result) => {
                this.setState({
                    productStyle: result.data
                })
            })
            .catch((error) => {
                console.log('Error fetching product style in App', error);
            });
    }

    getRelatedProduct(id) {
       return axios.get(`/products/${id}/related`)
            .then((result) => {
                this.setState({
                    relatedProductsIDs: result.data
                })
                return result.data
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
                console.log('relatedProductsInfo', relatedProductsInfo)
                this.setState ({
                    relatedProductsInfo: relatedProductsInfo
                })
            })
            .catch((error) => {
                console.log('Error fetching related products in App', error);
            });
    }

    getMetaData(id) {
        return axios.get(`/reviews/meta?product_id= ${id}`)
            .then((response) => {
                this.setState({
                    meta: response.data
                })
            })
            .catch((error) => {
                console.log('Error fetching reviews meta in App', error);
            })
    }

    getProductReviews(id, sort = 'relevant') {
        return axios.get(`/reviews`, { params: {product_id: id, sort: sort } })
        .then((response) => {
            this.setState({
                reviews: response.data
            })
        })
        .catch((error) => {
            console.log('Error fetching reviews in App', error);
        })
    }

    getProductQuestions(id, page = 1, count = 5) {
       return axios.get(`/qa/questions`, { params: {product_id: id, page: page, count: count } })
        .then((response) => {
            this.setState({
                questions: response.data
            })
        })
        .catch((error) => {
            console.log('Error fetching QA questions in App', error);
        })
    }

    render() {
        console.log(this.state.meta, 'meta from app')
        return (
            <div className="app">

                <p id="logo"> Good Deals Only </p>
                <Overview />
                <ListsWrapper productID={this.state.productID} selectedProductInfo={this.state.selectedProductInfo} />
                <QandA />
                <RR_app id={this.state.productID} meta={this.state.meta? this.state.meta : null} />

            </div>
        )
    }
}

export default App;