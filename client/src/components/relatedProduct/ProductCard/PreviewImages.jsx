import React from 'react';

class PreviewImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      length: 4,
      image: {}
    };
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  prevSlide() {
    const { current, length } = this.state;
    if (current !== 0) {
      this.setState({
        current: current - 1
      })
    } else {
      this.setState({
        length: length - 1
      })
    }
  }

  nextSlide() {
    const { current, length } = this.state;
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

  handleImageClicked(e) {
    let images;
  }



  render() {
    const { current, length } = this.state;
    const { currentStyle, productID } = this.props;

    let images;
    if (this.props.currentStyle.photos.length > 4) {
      images = this.props.currentStyle.photos.slice(0, 4);
    } else {
      images = this.props.currentStyle.photos;
    }

    return (
      <div className="previewImage-container">
        <div className="previewImage">
        <img className='product-image' src={images[0].thumbnail_url} alt="Image lost :(" />
        </div>

        <div className="image-carousel-row">
          <button className="image-carousel-button  carousel-button-left" onClick={this.prevSlide} >&#10094;</button>
          {images.map((photo, i) => (
            <div key={i} className="image-carousel-slide" >
                <img className='carousel-image' src={photo.thumbnail_url} alt="Image lost :(" />
            </div>
          ))}
          <button className="image-carousel-button carousel-button-right" onClick={this.nextSlide} >&#10095;</button>
        </div>

      </div>
    )
  }

  // render() {
  //   const { current, length } = this.state;
  //   const { currentStyle, productID } = this.props;

  //   let images;
  //   if (this.props.currentStyle.photos.length > 4) {
  //     images = this.props.currentStyle.photos.slice(0, 4);
  //   } else {
  //     images = this.props.currentStyle.photos;
  //   }

  //   return (
  //       <div className="image-carousel">
  //         <button className="image-carousel-button  carousel-button-left" onClick={this.prevSlide} >&#10094;</button>
  //         {images.map((photo, i) => (
  //           <div key={i} className="image-carousel-slide" >
  //             {/* <img className="product-image" src={photo.thumbnail_url} alt="Image lost :(" /> */}
  //             {i === current && (
  //               <img src={photo.thumbnail_url} alt="Image lost :(" className='product-image' />
  //             )}
  //           </div>
  //         ))}
  //         <button className="image-carousel-button carousel-button-right" onClick={this.nextSlide} >&#10095;</button>
  //       </div>
  //   )
  // }

}

// const PreviewImages = (props) => {
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
