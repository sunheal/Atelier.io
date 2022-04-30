import React from 'react';

// future enhancement
const PreviewImagesCarousel = (props) => {
  let images = [];
  if(props.defaultStyle.photos[0].thumbnail_url) {
      // console.log(props.defaultStyle.photos)
      for (var i = 0; i < 4; i++) {
        if (!props.defaultStyle.photos[i]) {
          images.push(props.productStyles[1].photos[0].thumbnail_url);
        } else {
          images.push(props.defaultStyle.photos[i].thumbnail_url);
        }
      }
  }
  // console.log('images', images)

  // return(
  //   <div className="image-carousel-row">image carousel</div>
  // )
  return (
    <div className="image-carousel-row">
      <button className="image-prev" onClick={props.prev}>&#10094;</button>
      {images.map((photo, i) => (
        <div key={i} className="image-carousel-image image-slide" >
          <img className='carousel-image' src={photo} alt="Image lost :(" onClick={props.updateImage}/>
        </div>
      ))}
      <button className="image-next" onClick={props.next} >&#10095;</button>
    </div>
  )
};

export default PreviewImagesCarousel;
