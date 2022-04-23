import React from 'react';

const PreviewImagesCarousel = (props) => {
  return (
    <div className="image-carousel-row">
      <button className="image-carousel-button  carousel-button-left" onClick={props.prevSlide} >&#10094;</button>
      {props.images.map((photo, i) => (
        <div key={i} className="image-carousel-slide" >
          <img className='carousel-image' src={photo.thumbnail_url} alt="Image lost :(" onClick={props.handleImageClicked}/>
        </div>
      ))}
      <button className="image-carousel-button carousel-button-right" onClick={props.nextSlide} >&#10095;</button>
    </div>
  )
};

export default PreviewImagesCarousel;
