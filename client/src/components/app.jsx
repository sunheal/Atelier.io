import React from "react";
import axios from 'axios';
import Overview from "./overview/Overview.jsx";
import RelatedProducts from './RelatedProduct/RelatedProducts.jsx';
import QandA from "./Q&A/QandA_app.jsx";
import RR_app from "./Ratings&Reviews/RR_app.jsx";
import Navbar from "./navbar.jsx";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: 64623,
            productInfo: {},
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
    //   this.getAllProducts();
      this.getProductInfo(this.state.productID);

    }



    getProductInfo(id) {
        axios.get(`/products/${id}`)
        .then((result) => {
            var allPromises = [];
            allPromises.push(axios.get(`/products/${id}`));
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
                productInfo: allPromisesData[0].data,
                productStyle: allPromisesData[1].data,
                relatedProductsIDs: [... new Set(allPromisesData[2].data)],
                meta: allPromisesData[3].data,
                reviews: allPromisesData[4].data,
                questions: allPromisesData[5].data
            })

            return [... new Set(allPromisesData[2].data)];
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

    updateProduct(e) {
        var id = e.target;
        console.log('clicked product = ', id)
    }

    render() {
        const { productID, productInfo, allProducts, selectedProductInfo, productStyle, relatedProductsIDs, relatedProductsInfo, meta, reviews, questions,recommend,rating, ratings, count} = this.state;
        return (
            <div className="app" >
                <p id="logo"> Good Deals Only </p>
                <Navbar />
                <Overview productID={productID} productInfo={productInfo} productStyle={productStyle} meta={meta} />
                <RelatedProducts productID={productID} selectedProductInfo={selectedProductInfo} productStyle={productStyle} relatedProductsIDs={relatedProductsIDs} relatedProductsInfo={relatedProductsInfo} updateProduct={this.updateProduct} />
                <QandA productID={this.state.productID}/>
                {Object.keys(meta).length === 0 ? null : <RR_app id={productID} meta={meta} reviews={reviews.results} />}
            </div>
        )
    }
}

export default App;
