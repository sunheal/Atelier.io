import React from 'react';
import StarsOW from '../Shared/StarsOW.jsx'
import '../overview/Productinformation.css';

const ProductInformation = (props) => {
  return (
    <div className='ProductInformation'>
      {!props.reviewsCount
        ? null
        : <div className='stars-reviews'>
            <StarsOW rating={props.ratings} className='stars-div'/>
            <div className='reviews-div'><a className='reviews-link' href='#RR_app'>Read All {props.reviewsCount} Reviews</a></div>
          </div>}
      <div className='category'>{props.information.category}</div>
      <div className='product-title'>{props.information.name}</div>
      <br></br>
      {!props.selectedStyle?.sale_price
        ? <div className='product-price'>$ {props.information.default_price}</div>
        : <div>
            <div className='product-price' style={{'textDecoration': 'line-through'}}>$ {props.information.default_price}</div>
            <div className='sale-price'>$ {props.selectedStyle?.sale_price}</div>
          </div>}
      <br></br>
      {/* <div>Product Overview: {props.information.description}</div> */}
    </div>
  );
}

export default ProductInformation;