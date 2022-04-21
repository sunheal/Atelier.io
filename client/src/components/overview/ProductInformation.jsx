import React from 'react';
import Star from '../Shared/Stars.jsx'

const ProductInformation = (props) => {
  return (
    <div>
      <h4>ProductInformation</h4>
      <div>Ratings: <Star rating={props.ratings}/></div>
      <div>Read All {props.reviewsCount} Reviews</div>
      <div>Category: {props.information.category}</div>
      <div>Title: {props.information.name}</div>
      <div>Price: {props.information.default_price}</div>
      {/* <div>Product Overview: {props.information.description}</div> */}
    </div>
  );
}

export default ProductInformation;