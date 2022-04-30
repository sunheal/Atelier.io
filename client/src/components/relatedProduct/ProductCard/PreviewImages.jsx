import React from 'react';

const PreviewImages = (props) => {
  return (
  <div className="preview-image">
    <img className="product-image" src={props.displayImage} alt={props.productInfo.name} />
  </div>
  )
};

export default PreviewImages;
