import React from 'react';
import ReactDOM from 'react-dom';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';

class ListsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: 64620
    };
  }

  render() {
    return (
      <div id="related_products">
        <RelatedProductsList productID={this.state.productID} />
        <OutfitList />
      </div>
    );
  }
}

export default ListsWrapper;