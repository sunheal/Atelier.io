import React from "react";
import axios from 'axios';
import Overview from "./overview/Overview.jsx";
import RelatedProducts from './RelatedProduct/RelatedProducts.jsx';
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
        this.getProductInfo(64620)
    }

    getAllProducts() {
        axios.get('/products/')
            .then((result) => {
                this.setState({
                    allProducts: result.data
                })
            })
            .catch((error) => {
                console.log('Error fetching all products details in App', error);
            });
    }

    getProductInfo(id) {
        axios.get(`/products/${id}`)
        .then((result) => {
            var allPromises = [];
            allPromises.push(axios.get(`/products/${id}/styles`));
            allPromises.push(axios.get(`/products/${id}/related`));
            allPromises.push(axios.get(`/reviews/meta`, { params: { product_id: id } }));
            allPromises.push(axios.get(`/reviews`, { params: {product_id: id, count: 5000 } }));
            allPromises.push(axios.get(`/qa/questions`, { params: {product_id: id} }));
            this.setState({
                selectedProductInfo: result.data
            })
            return Promise.all(allPromises);
        })
        .then((allPromisesData) => {
            this.setState({
                productStyle: allPromisesData[0].data,
                relatedProductsIDs: allPromisesData[1].data,
                meta: allPromisesData[2].data,
                reviews: allPromisesData[3].data,
                questions: allPromisesData[4].data
            })
            return allPromisesData[1].data;
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
            this.setState ({
                relatedProductsInfo: relatedProductsInfo
            })
        })
        .catch((error) => {
            console.log('Error fetching product info in App', error);
        });

    }

    render() {
        return (
            <div className="app">
                <p id="logo"> Good Deals Only </p>
                <Overview />
                <RelatedProducts productID={this.state.productID} selectedProductInfo={this.state.selectedProductInfo} />
                <QandA />
                <RR_app id={this.state.productID} />
            </div>
        )
    }
}

export default App;