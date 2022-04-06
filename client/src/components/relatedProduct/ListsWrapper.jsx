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
      relatedProductsID: []
    };
  }

  getRelatedProductsID(id) {
    axios.get(`/products/${id}/related`)
      .then((result) => {
        this.setState({
          relatedProductsID: result.data
        })
      })
      .catch((error) => {
        console.log('Error fetching related products in ListsWrapper', error);
      });
  }

  componentDidMount() {
    this.getRelatedProductsID(this.state.productID);
  }


  render() {
    return (
      <div id="related_products">
        <RelatedProductsList relatedProductsID={this.state.relatedProductsID} productID={this.state.productID}/>
        <OutfitList />
      </div>
    );
  }
}

export default ListsWrapper;