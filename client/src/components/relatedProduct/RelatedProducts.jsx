import React from 'react';
import axios from 'axios';
import './css/RelatedProductStyle.css';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {productID, productInfo, productStyle, relatedProductsIDs, relatedProductsInfo, updateProductID} = this.props;
    return (
      <div id="related_products">
        {/* <h3>RELATED PRODUCTS</h3> */}
        <RelatedProductsList relatedProductsIDs={relatedProductsIDs} relatedProductsInfo={relatedProductsInfo} productID={productID} productInfo={productInfo} updateProductID={updateProductID} />
        {/* <h3>YOUR OUTFIT</h3> */}
        <OutfitList productID={productID} productInfo={productInfo} updateProductID={updateProductID} />
      </div>
    );
  }
}

export default RelatedProducts;