import React from 'react';
import Star from '../Shared/Stars.jsx'
import './ProductInformation.css';

const ProductInformation = (props) => {
  return (
    <div>
      <div className='stars-reviews'>
        <div className='stars-div'>
          <Star rating={props.ratings}/>
        </div>
        <div className='reviews-div'>Read All {props.reviewsCount} Reviews</div>
      </div>
      <div className='category'>{props.information.category}</div>
      <div className='product-title'>{props.information.name}</div>
      <br></br>
      <div className='product-price'>$ {props.information.default_price}</div>
      <br></br>
      {/* <div>Product Overview: {props.information.description}</div> */}
    </div>
  );
}

export default ProductInformation;