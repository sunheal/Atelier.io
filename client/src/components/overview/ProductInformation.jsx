import React from 'react';
import StarsOW from '../Shared/StarsOW.jsx'
import './ProductInformation.css';

const ProductInformation = (props) => {
  return (
    <div className='ProductInformation'>
      <div className='stars-reviews'>
        <div>
          <StarsOW rating={props.ratings} className='stars-div'/>
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