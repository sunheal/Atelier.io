import React from 'react';

// expect props.list is an array of objects
// each card displays info for a single product
// card itself are clickable, navigate to the detail page for that product

const ProductCard = (props) => {
  // console.log('1',props.relatedProductsInfo);

    return (
      <div >
        image<br></br>
        product.category<br></br>
        product.name<br></br>
        $price<br></br>
        Star Rating<br></br>
        <button> action button </button>
      </div>
    );

};


export default ProductCard;