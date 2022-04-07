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
    const containerStyle = {
      'border-color': 'grey',
      'border-style': 'solid',
      'margin': '10px 5% 10px'
    }

    return (
      <div style={containerStyle} id="related_products">
        <h3>RELATED PRODUCTS</h3>
        <RelatedProductsList relatedProductsIDs={this.state.relatedProductsIDs} productID={this.state.productID} selectedProductInfo={this.props.selectedProductInfo}/>
        <h3>YOUR OUTFIT</h3>
        <OutfitList />
      </div>
    );
  }
}

export default ListsWrapper;