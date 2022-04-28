import React from 'react';

// future enhancement
const PreviewImagesCarousel = (props) => {
  return (
    <div className="image-carousel-row">
      <button className="image-carousel-button  carousel-button-left" onClick={props.prevSlide} >&#10094;</button>
      <div className="image-carousel-slide">
      {props.images.map((photo, i) => (
        <div key={i} className="image-carousel-image" >
          <img className='carousel-image' src={photo.thumbnail_url} alt="Image lost :(" onClick={props.handleImageClicked}/>
        </div>
      ))}
      </div>
      <button className="image-carousel-button carousel-button-right" onClick={props.nextSlide} >&#10095;</button>
    </div>
  )
};

export default PreviewImagesCarousel;
