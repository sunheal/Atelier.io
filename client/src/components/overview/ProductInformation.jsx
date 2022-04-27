import React from 'react';
import StarsOW from '../Shared/StarsOW.jsx'
import '../overview/ProductInformation.css';

const ProductInformation = (props) => {
  return (
    <div className='ProductInformation'>
      {!props.reviewsCount
        ? null
        : <div className='stars-reviews'>
            <StarsOW rating={props.ratings} className='stars-div'/>
            <div className='reviews-div'><a href='#RR_app'>Read All {props.reviewsCount} Reviews</a></div>
          </div>}
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