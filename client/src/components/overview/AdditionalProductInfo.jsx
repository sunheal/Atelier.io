import React from 'react';
import './AdditionalProductInfo.css';

const AdditionalProductInfo = (props) => {
  return (
    <div className='additonalProductInfo'>
      <div className='sloganDescription'>
        <div className='slogan'>{props.productInfo.slogan}</div>
        <br></br>
        <div className='description'>{props.productInfo.description}</div>
      </div>
      <div className='features'>
        <ul className='featuresList'>
          {props.productInfo.features?.map((feature,index) => {
            return (
              <li key={index} className='featureListItem'>✓ &nbsp;&nbsp;{feature.feature}: {feature.value}</li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default AdditionalProductInfo;