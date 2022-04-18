import React from 'react';
import './ImageGallery.css';

const ImageGallery = (props) => {
  // if (!props.styles && !props.selectedStyle) {
  //   console.log(111111);
  //   return <div>loading...</div>;
  // }
  let displayStyle;
  if (props.selectedStyle) {
    if (Object.keys(props.selectedStyle).length === 0) {
      displayStyle = props.styles[0];
    } else {
      displayStyle = props.selectedStyle;
    }
  }
  return (
    <div>
      <div className="slideshow-container">
        {!displayStyle?.photos
          ? <div>loading...</div>
          : displayStyle.photos.map((photoObj, index) => {
              return (
                <div className="mySlides fade" key={index}>
                <img className="styleImage" src={photoObj.url}   ></img>
                </div>
              );
            })
        }
        <a className="prev" onClick={props.onPrevClick} >&#10094;</a>
        <a className="next" onClick={props.onNextClick} >&#10095;</a>
        <div className="thumbnail-slider">
          {!displayStyle?.photos
              ? <div>loading...</div>
              : displayStyle.photos.map((photoObj, index) => {
                  return (
                    <div className="thumbnail-div" key={index}>
                    <img className="thumbnail-img" src={photoObj.thumbnail_url}   ></img>
                    </div>
                  );
              })
          }
          <a className="down" >&#65088;</a>
        </div>
      </div>
      <br></br>
      {/* <div   >
        <span className="dot"  ></span>
        <span className="dot"  ></span>
        <span className="dot"  ></span>
      </div> */}
    </div>
  );
}

export default ImageGallery;