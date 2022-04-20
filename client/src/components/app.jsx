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
            relatedProductsIDs: null,
            relatedProductsInfo: [],
            meta: {},
            reviews: {},
            questions: {},
        }
        this.updateProduct = this.updateProduct.bind(this);
    }

    componentDidMount() {
        this.getAllProducts();
        this.getProductInfo(this.state.productID);
    }


    getAllProducts() {
       return axios.get('/products/')
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
            var filtered = allPromisesData[1].data.filter(id => id !== this.state.productID);
            filtered = [...new Set(filtered)];
            this.setState({
                productStyle: allPromisesData[0].data,
                relatedProductsIDs: filtered,
                meta: allPromisesData[2].data,
                reviews: allPromisesData[3].data,
                questions: allPromisesData[4].data
            })

            return filtered;
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

    // updateProduct(id) {
    //     console.log('pass in here = ', id)
    //     this.setState({
    //         productID: id
    //     }, ()=> {
    //         console.log('in callback', id)
    //         // this.getProductInfo(id);
    //     })
    // }
    updateProduct(id) {
        console.log('pass in here = ', id)
        // this.setState({
        //     productID: id
        // })
    }

    render() {
        const { productID, allProducts, selectedProductInfo, productStyle, relatedProductsIDs, relatedProductsInfo, meta, reviews, questions,recommend,rating, ratings, count} = this.state;
        return (
            <div className="app">
                <p id="logo"> Good Deals Only </p>
                <Overview />
                <RelatedProducts productID={productID} selectedProductInfo={selectedProductInfo} productStyle={productStyle} relatedProductsIDs={relatedProductsIDs} relatedProductsInfo={relatedProductsInfo} updateProduct={this.updateProduct} />
                <QandA productID={this.state.productID}/>
               {Object.keys(meta).length === 0 ? null : <RR_app id={productID} meta={meta} reviews={reviews.results} />}
            </div>
        )
    }
}

export default App;