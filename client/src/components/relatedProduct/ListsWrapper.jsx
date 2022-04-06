import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';

class ListsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: props.productID,
      relatedProductsIDs: []
    };
  }

  getRelatedProductIDs(id) {
    axios.get(`/products/${id}/related`)
      .then((result) => {
        this.setState({
          relatedProductsIDs: result.data
        })
      })
      .catch((error) => {
        console.log('Error fetching related products in ListsWrapper', error);
      });
  }

  componentDidMount() {
    this.getRelatedProductIDs(this.state.productID);
  }


  render() {
    return (
      <div id="related_products">
        <RelatedProductsList relatedProductsIDs={this.state.relatedProductsIDs} productID={this.state.productID} selectedProductInfo={this.props.selectedProductInfo}/>
        <OutfitList />
      </div>
    );
  }
}

export default ListsWrapper;