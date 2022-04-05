import React from 'react';

// expect props.list is an array of objects
// each card displays info for a single product
// card itself are clickable, navigate to the detail page for that product

const ProductCard = (props) => (
  <div >
    image<br></br>
    Product Category <br></br>
    Product Name <br></br>
    $ Price <br></br>
    Star Rating<br></br>
    action button
  </div>
);

export default ProductCard;