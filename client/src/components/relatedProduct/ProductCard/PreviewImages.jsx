import React from 'react';

const PreviewImages = (props) => (
  <div className="preview-image" role="button">
    <img src={props.currentStyle.photos[0].thumbnail_url} alt='product' />
  </div>
);

export default PreviewImages;
