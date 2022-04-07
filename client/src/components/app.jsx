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
            selectedProductInfo: {}
        }
    }


    getAllProducts () {
        axios.get('/products/')
            .then((result) => {
                this.setState({
                    allProducts: result.data
                })
            })
            .catch((error) => {
                console.log('Error fetching single product details in relatedProductsList', error);
            });
    }

    getSelectedProduct () {
        axios.get(`/products/${this.state.productID}`)
            .then((result) => {
                this.setState({
                    selectedProductInfo: result.data
                })
            })
            .catch((error) => {
                console.log('Error fetching single product details in relatedProductsList', error);
            });
    }


    componentDidMount() {
        this.getAllProducts();
        this.getSelectedProduct();
    }

    render() {
        return (
            <div className="app"
            <p id="logo"> Good Deals Only </p>
            <Overview />
            <ListsWrapper productID={this.state.productID}  selectedProductInfo={this.state.selectedProductInfo}/>
            <QandA/>
            <RR_app id={this.state.productID}/>
            </div>
        )
    }
}

export default App;