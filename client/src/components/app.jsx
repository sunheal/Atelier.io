import React from "react";
import axios from "axios";
import Overview from "./overview/Overview.jsx";
import RelatedProducts from "./RelatedProduct/RelatedProducts.jsx";
import QandA from "./Q&A/QandA_app.jsx";
import RR_app from "./Ratings&Reviews/RR_app.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: 64623,
      allProducts: [],
      selectedProductInfo: {},
      productStyle: {},
      relatedProductsIDs: [],
      relatedProductsInfo: [],
      meta: {},
      reviews: {},
      questions: {},
    };
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
    this.getProductInfo(this.state.productID);
  }

  getAllProducts() {
    return axios
      .get("/products/")
      .then((result) => {
        console.log(result);
        this.setState({
          allProducts: result.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching all products details in App", error);
      });
  }

  getProductInfo(id) {
    axios
      .get(`/products/${id}`)
      .then((result) => {
        var allPromises = [];
        allPromises.push(axios.get(`/products/${id}/styles`));
        allPromises.push(axios.get(`/products/${id}/related`));
        allPromises.push(
          axios.get(`/reviews/meta`, { params: { product_id: id } })
        );
        allPromises.push(
          axios.get(`/reviews`, { params: { product_id: id, count: 5000 } })
        );
        allPromises.push(
          axios.get(`/qa/questions`, { params: { product_id: id } })
        );
        this.setState({
          selectedProductInfo: result.data,
        });
        return Promise.all(allPromises);
      })
      .then((allPromisesData) => {
        this.setState({
          productStyle: allPromisesData[0].data,
          relatedProductsIDs: [...new Set(allPromisesData[1].data)],
          meta: allPromisesData[2].data,
          reviews: allPromisesData[3].data,
          questions: allPromisesData[4].data,
        });
        return [...new Set(allPromisesData[1].data)];
      })
      .then((relatedIDs) => {
        var arrayOfPromises = [];
        relatedIDs.forEach((relatedId) => {
          arrayOfPromises.push(axios.get(`/products/${relatedId}`));
        });
        return Promise.all(arrayOfPromises);
      })
      .then((arrayOfPromisesData) => {
        var relatedProductsInfo = arrayOfPromisesData.map(
          (product) => product.data
        );
        this.setState({
          relatedProductsInfo: relatedProductsInfo,
        });
      })
      .catch((error) => {
        console.log("Error fetching product info in App", error);
      });
  }

  updateProduct(e) {
    var id = e.target;
    console.log("clicked product = ", id);
    // this.setState({
    //     productID: id
    // })
  }

  render() {
    const {
      productID,
      allProducts,
      selectedProductInfo,
      productStyle,
      relatedProductsIDs,
      relatedProductsInfo,
      meta,
      reviews,
      questions,
    } = this.state;
    return (
      <div className="app">
        <p id="logo"> Good Deals Only </p>
        <Overview />

        <RelatedProducts
          productID={productID}
          selectedProductInfo={selectedProductInfo}
          productStyle={productStyle}
          relatedProductsIDs={relatedProductsIDs}
          relatedProductsInfo={relatedProductsInfo}
          updateProduct={this.updateProduct}
        />
        <QandA productID={this.state.productID} />
        <RR_app id={productID} meta={meta} />
      </div>
    );
  }
}

export default App;
