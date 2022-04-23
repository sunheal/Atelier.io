import React from 'react';
import PreviewImagesCarousel from './PreviewImagesCarousel.jsx';

class PreviewImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      length: 4,
      imageChange: false
    };
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.handleImageClicked = this.handleImageClicked.bind(this);
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
    var target = e.target.src;
    console.log('target', this.state.current)
    this.setState({
      imageChange: true
    })

  }

  render() {
    const { current, length, imageChange } = this.state;
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
          <img className='product-image' src={images[current].thumbnail_url} alt="Image lost :(" />
        </div>
        <PreviewImagesCarousel images={images} prevSlide={this.prevSlide} nextSlide={this.nextSlide} handleImageClicked={this.handleImageClicked} />
      </div>
    )
  }
}

// const PreviewImages = (props) => {
//   return (
//   <div className="preview-image">
//     <img className="product-image" src={props.currentStyle.photos[0].thumbnail_url} alt="Image lost :(" />
//   </div>
//   )
// };

export default PreviewImages;
