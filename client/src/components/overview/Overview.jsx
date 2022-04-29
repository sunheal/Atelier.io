import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import {headers, uri} from '../../../../config.js';
import axios from 'axios';
import './Overview.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: {},
      selectedSKU: '',
      selectedSize: '',
      selectedQuantity: '',
      maxQuantity: '',
      // ratings: '',
      // reviewsCount: '',
      slideIndex: 0,
      thumbnailPos: 0,
      thumbnailIndex: 0,
      galleryExpanded: false,
      zoomed: false
    }
  }

  // componentDidMount() {
  //   this.getProductRatings(this.props.productID);
  // }

  componentDidUpdate(prevProps, prevState) {
    const slideIndex = this.state.slideIndex;
    this.showSlides(slideIndex);

    // new product click
    if (this.props.productID !== prevProps.productID) {
      if (this.state.zoomed) {
        this.removeZoom();
      }
      this.removeSelected();
      this.setState({
        selectedStyle: {},
        selectedSKU: '',
        selectedSize: '',
        selectedQuantity: '',
        maxQuantity: '',
        // ratings: '',
        // reviewsCount: '',
        slideIndex: 0,
        thumbnailPos: 0,
        thumbnailIndex: 0,
        galleryExpanded: false,
        zoomed: false
      })
      const slideIndex = this.state.slideIndex;
      this.showSlides(slideIndex);
    }
  }

  // getProductRatings = (id) => {
  //   axios.get(`/reviews/meta/?product_id=${id}`)
  //     .then((res) => {
  //       const ratingsObj = res.data.ratings;
  //         let totalRatings = 0;
  //         let reviewsCount = 0;
  //         for (let key in ratingsObj) {
  //           totalRatings += (parseInt(key) * parseInt(ratingsObj[key]));
  //           reviewsCount += parseInt(ratingsObj[key]) || 0;
  //         }
  //         let ratings = (totalRatings / reviewsCount).toFixed(1) || 0;
  //         this.setState({ ratings, reviewsCount });
  //     })
  //     .catch((err) => {
  //       console.error('getProductRatings', err);
  //     })
  // }

  removeSelected = () => {
    const checkboxes = document.getElementsByClassName("checkbox");
    for (let checkbox of checkboxes) {
      checkbox.checked = false;
    }
  }

  onStyleClick = (e) => {
    this.removeSelected();
    const styles = [...this.props.productStyle.results];
    const selectedCheckbox = e.target;
    selectedCheckbox.checked = true;
    const selectedStyle = styles[selectedCheckbox.id];
    this.setState({
      selectedStyle,
      selectedSKU: '',
      maxQuantity: '',
      selectedQuantity: '',
      selectedSize: '',
      slideIndex: 0
    });
  }

  onSizeChange = (e) => {
    const selectedSKU = e.target.value;
    const selectedStyle = {...this.state.selectedStyle};
    const selectedSize = selectedStyle.skus[selectedSKU].size;
    const maxQuantity = selectedStyle.skus[selectedSKU].quantity;
    this.setState({selectedSKU, selectedSize, maxQuantity});
    const sizeDropdown = document.getElementById('sizeDropdown');
    sizeDropdown.removeAttribute('size');
    const sizeAlert = document.getElementsByClassName('sizeAlert');
    sizeAlert[0].setAttribute('hidden', 'hidden');
  }

  onQuantityChange = (e) => {
    const selectedQuantity = e.target.value;
    this.setState({selectedQuantity})
  }

  onAddToCartClick = (e) => {
    const selectedStyle = { ...this.state.selectedStyle };
    const selectedSize = this.state.selectedSize;
    if (Object.keys(selectedStyle).length > 0 && selectedSize === '') {
      const sizeAlert = document.getElementsByClassName('sizeAlert');
      sizeAlert[0].removeAttribute('hidden');
      const sizeDropdown = document.getElementById('sizeDropdown');
      sizeDropdown.setAttribute('size', `3`);
    }
  }

  showSlides = (slideIndex) => {
    const slides = document.getElementsByClassName('mySlides');
    const thumbnails = document.getElementsByClassName('thumbnail-div');
    if (slides.length > 0) {
      slides.forEach(slide => slide.style.display = 'none');
      thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
      slides[slideIndex].style.display = 'block';
      thumbnails[slideIndex].classList.add('active');
    }
  }

  onPrevClick = (e) => {
    let slideIndex = this.state.slideIndex - 1;
    const slides = document.getElementsByClassName('mySlides');
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    };
    this.setState({slideIndex});
  }

  onNextClick = (e) => {
    let slideIndex = this.state.slideIndex + 1;
    const slides = document.getElementsByClassName('mySlides');
    if (slideIndex > slides.length - 1) {
      slideIndex = 0;
    };
    this.setState({slideIndex});
  }

  onThumbnailClick = (e) => {
    const slideIndex = e.target.id;
    const zoomed = this.state.zoomed;
    this.setState({slideIndex});
    if (zoomed) {
      this.removeZoom();
    }
  }

  onUpClick = (e) => {
    let thumbnailPos = this.state.thumbnailPos + 110;
    let thumbnailIndex = this.state.thumbnailIndex - 1;
    this.setState({thumbnailPos, thumbnailIndex});
  }

  onDownClick = (e) => {
    let thumbnailPos = this.state.thumbnailPos - 110;
    let thumbnailIndex = this.state.thumbnailIndex + 1;
    this.setState({thumbnailPos, thumbnailIndex});
  }

  toggleGalleryExpand = (e) => {
    let galleryExpanded = this.state.galleryExpanded;
    this.setState({galleryExpanded: !galleryExpanded});
  }

  toggleZoom = (e) => {
    const zoomed = this.state.zoomed;
    const expandedImage = document.getElementsByClassName('expanded-image');
    const slideIndex = this.state.slideIndex;
    expandedImage[slideIndex].classList.toggle('zoomed');
    this.setState({zoomed: !zoomed});
  }

  removeZoom = () => {
    const zoomedImage = document.querySelector('.zoomed');
    zoomedImage.classList.remove('zoomed');
    this.setState({zoomed: false});
  }

  followMousePosition = (e) => {
    const expandedContainer = document.querySelector('.myslide');
    const zoomedImage = document.querySelector('.zoomed');
    // console.log(e.nativeEvent);
    zoomedImage.style.left = e.nativeEvent.offsetX / 1200 * 100 + '%';
    zoomedImage.style.top = e.nativeEvent.offsetY / 600 * 100 + '%';
  }

  render() {
    return (
      <div id="overview" className="container1">
        <div className="container1-1">
          <ImageGallery
            productStyle={this.props.productStyle}
            selectedStyle={this.state.selectedStyle}
            thumbnailIndex={this.state.thumbnailIndex}
            thumbnailPos={this.state.thumbnailPos}
            galleryExpanded={this.state.galleryExpanded}
            zoomed={this.state.zoomed}
            onPrevClick={this.onPrevClick}
            onNextClick={this.onNextClick}
            onThumbnailClick={this.onThumbnailClick}
            onUpClick={this.onUpClick}
            onDownClick={this.onDownClick}
            toggleGalleryExpand={this.toggleGalleryExpand}
            toggleZoom={this.toggleZoom}
            followMousePosition={this.followMousePosition}
          />
        </div>
        <div className="container1-2">
        <div className="container1-2-1">
          <ProductInformation
            information={this.props.productInfo}
            ratings={this.props.ratings}
            reviewsCount={this.props.reviewsCount}
            selectedStyle={this.state.selectedStyle}
          />
          <br></br>
          {/* <br></br> */}
        </div>
        <div className="container1-2-2">
          <StyleSelector
            productStyle={this.props.productStyle}
            selectedStyle={this.state.selectedStyle}
            onStyleClick={this.onStyleClick}
          />
          <br></br>
          <br></br>
          <br></br>
          {/* <br></br> */}
        </div>
        <div className="container1-2-3">
          <AddToCart
            selectedStyle={this.state.selectedStyle}
            selectedSKU={this.state.selectedSKU}
            maxQuantity={this.state.maxQuantity}
            selectedQuantity={this.state.selectedQuantity}
            selectedSKU={this.state.selectedSKU}
            onSizeChange={this.onSizeChange}
            onQuantityChange={this.onQuantityChange}
            onAddToCartClick={this.onAddToCartClick}
            addOutfit={this.props.addOutfit}
          />
          {/* <br></br> */}
        </div>
        </div>
      </div>
    );
  }
}

export default Overview;