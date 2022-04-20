import React from 'react';

class PreviewImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      length: 4,
      // images: []
    };
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  prevSlide() {
    const {current, length} = this.state;
    if (current !== 0) {
      this.setState({
        current: current - 1
      })
    }
  }

  nextSlide() {
    const {current, length} = this.state;
    if (current !== length - 1) {
      this.setState({
        current: current + 1
      })
    } else {
      this.setState({
        current: 0
      })
    }
  }

  // getImages() {
  //   console.log(this.props.currentStyle.photos)
  //   let images;
  //   // if (this.props.currentStyle.photos.length > 4) {
  //   //   images = this.props.currentStyle.photos.slice(0, 4);
  //   // } else {
  //   //   images = this.props.currentStyle.photos;
  //   // }
  //   // this.setState({images});
  // }

  // componentDidMount() {
  //   this.getImages();
  // }

  render() {
    const {current, length} = this.state;
    const {currentStyle, productID} = this.props;
    // console.log('fuk', currentStyle.photos.length)

    let images;
    if (this.props.currentStyle.photos.length > 4) {
      images = this.props.currentStyle.photos.slice(0, 4);
    } else {
      images = this.props.currentStyle.photos;
    }

    return (
      <div className="image-carousel">
        <button className="image-carousel-button  carousel-button-left" onClick={this.prevSlide} >&#10094;</button>
        {images.map((photo, i) => (
          <div key={i} className="image-carousel-slide" >
            {/* <img className="product-image" src={photo.thumbnail_url} alt="Image lost :(" /> */}
            {i === current && (
              <img src={photo.thumbnail_url} alt="Image lost :(" className='product-image' />
            )}
          </div>
        ))}
        <button className="image-carousel-button carousel-button-right" onClick={this.nextSlide} >&#10095;</button>
      </div>
    )
  }
}

// const PreviewImages = (props) => {
//   var images;
//   if (props.currentStyle.photos.length > 4) {
//     images = props.currentStyle.photos.slice(0, 4);
//   } else {
//     images = props.currentStyle.photos;
//   }

//   nextSlide () {
//     setCurrent(current === length - 1 ? 0 : current + 1);
//   };

//   prevSlide () {
//     setCurrent(current === 0 ? length - 1 : current - 1);
//   };

//   return (
//   <div className="image-carousel">
//     <button className="image-carousel-button  carousel-button-left" onClick={props.onPrevClick}>&#10094;</button>
//       {images.map((photo, i) => (
//         <div key={i} className="image-carousel-slide" hidden="hidden">
//           <img className="product-image" src={photo.thumbnail_url} alt="Image lost :(" />
//         </div>
//       ))}
//     <button className="image-carousel-button carousel-button-right" onClick={props.onNextClick}>&#10095;</button>
//   </div>
//   )
// };

export default PreviewImages;
