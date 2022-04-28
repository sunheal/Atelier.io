import React from 'react';
import './ImageGallery.css';

const ImageGallery = (props) => {
  let displayStyle;
  if (props.selectedStyle) {
    if (Object.keys(props.selectedStyle).length === 0) {
      if (props.productStyle.results) {
        displayStyle = props.productStyle.results[0];
      }
    } else {
      displayStyle = props.selectedStyle;
    }
  }

  return (
    // <div className="slideshow-container">
    <div className={`slideshow-container ${props.galleryExpanded ? 'expanded-container' : null}`}>
      {!displayStyle?.photos
        ? <div>loading...</div>
        : displayStyle.photos.map((photoObj, index) => {
            return (
              // <div className="mySlides fade" key={index}>
              <div className={`mySlides ${props.galleryExpanded ? null : 'fade'}`} key={index}>
              <img className={`styleImage ${props.galleryExpanded ? 'expanded-image' : null}`} onClick={props.galleryExpanded ? props.toggleZoom : null} onMouseOver={props.zoomed ? props.followMousePosition : null} src={photoObj.url} ></img>
              </div>
            );
          })
      }
      {props.zoomed
        ? null
        : <>
          <a className="prev" onClick={props.onPrevClick} >&#10094;</a>
          <a className="next" onClick={props.onNextClick} >&#10095;</a>

          <a className="expand" onClick={props.toggleGalleryExpand}>&#8633;</a>
          </>}
      {!displayStyle?.photos
        ? <div>loading...</div>
        : <div className="thumbnail-container">
            {props.thumbnailIndex === 0? null : <a className="up" onClick={props.onUpClick}> &#65087;</a>}
              <div className="thumbnail-sliderbar" >
                {!displayStyle?.photos
                    ? <div>loading...</div>
                    : displayStyle.photos.map((photoObj, index) => {
                        return (
                          <div className="thumbnail-div" key={index} onClick={props.onThumbnailClick} id={index} style={{ transform: `translateY(${props.thumbnailPos}%)` }}>
                          <img className="thumbnail-img" src={photoObj.thumbnail_url} id={index}></img>
                          </div>
                        );
                    })
                }
              </div>
            {displayStyle.photos.length <= 7
              ? null
              : (props.thumbnailIndex === displayStyle.photos.length - 7 ? null : <a className="down" onClick={props.onDownClick}>&#65088;</a>)}
          </div>}
    </div>
  );
}

export default ImageGallery;