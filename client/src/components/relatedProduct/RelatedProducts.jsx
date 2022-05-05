import React from 'react';
import axios from 'axios';
import './css/RelatedProductStyle.css';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {productID, productInfo, productStyle, relatedProductsIDs, relatedProductsInfo, updateProductID, outfitList, updateOutfitList, addOutfit } = this.props;
    return (
      <div id="related_products">
        <RelatedProductsList relatedProductsIDs={relatedProductsIDs} relatedProductsInfo={relatedProductsInfo} productID={productID} productInfo={productInfo} updateProductID={updateProductID} />
        <OutfitList productID={productID} productInfo={productInfo} updateProductID={updateProductID} outfitList={outfitList} updateOutfitList={updateOutfitList} addOutfit={addOutfit}/>
      </div>
    );
  }
}

export default RelatedProducts;