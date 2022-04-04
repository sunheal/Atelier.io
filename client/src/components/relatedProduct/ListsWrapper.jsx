import React from 'react';
import ReactDOM from 'react-dom';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';

class ListsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="related_products">
        <RelatedProductsList />
        <OutfitList />
      </div>
    );
  }
}

export default ListsWrapper;