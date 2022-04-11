import React from 'react';

const PreviewImages = (props) => {
  return (
  <div className="preview-image">
    <img className="product-image" src={props.currentStyle.photos[0].thumbnail_url} alt="Image lost :(" />
  </div>
  )
};

export default PreviewImages;
