import React from 'react';

// future enhancement

class PreviewImagesCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      currentPosition: 0
    }
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  onPrevClick(e) {
    let slideIndex = this.state.slideIndex - 1;
    let currentPosition = this.state.currentPosition + 100;
    if (slideIndex < 0) {
      slideIndex = 4 - 1;
      currentPosition = -300;
    };
    this.setState({ slideIndex, currentPosition });
  }

  onNextClick(e) {
    let slideIndex = this.state.slideIndex + 1;
    let currentPosition = this.state.currentPosition - 100;
    if (slideIndex > 4 - 1) {
      slideIndex = 0;
      currentPosition = 0;
    };
    this.setState({ slideIndex, currentPosition });
  }

  render() {
    let images = [];
    if (this.props.defaultStyle.photos[0].thumbnail_url) {
      for (var i = 0; i < 4; i++) {
        if (!this.props.defaultStyle.photos[i]) {
          for (var j = 0; j < this.props.productStyles[1].photos.length; j++) {
            if (!images.includes(this.props.productStyles[1].photos[j].thumbnail_url)) {
              images.push(this.props.productStyles[1].photos[j].thumbnail_url);
            }
          }
        } else {
          images.push(this.props.defaultStyle.photos[i].thumbnail_url);
        }
      }
    }
    return (
      <div className="image-carousel-row" >
        <button className="image-prev" onClick={this.onPrevClick}>&#10094;</button>
        {images.map((photo, i) => (
          <div key={i} className="image-carousel-image image-slide" style={{ transform: `translateY(${this.state.currentPosition}%)` }}>
            <img className='carousel-image' src={photo} alt="Image lost :(" onClick={this.props.updateImage} />
          </div>
        ))}
        <button className="image-next" onClick={this.onNextClick} >&#10095;</button>
      </div>
    )
  }

};

export default PreviewImagesCarousel;
