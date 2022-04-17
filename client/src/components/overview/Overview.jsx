import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import {headers, uri} from '../../../../config.js';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 64620,
      information: {},
      styles: [],
      selectedStyle: {},
      selectedSKU: '',
      selectedSize: '',
      selectedQuantity: '',
      maxQuantity: '',
      ratings: '',
      reviewsCount: ''
    }
  }

  componentDidMount() {
    let id = this.state.id;
    this.getProductInformation(id);
    this.getProductStyles(id);
    this.getProductRatings(id);
  }

  componentDidUpdate() {
    this.showSlides(0);
  }

  getProductInformation = (id) => {
    axios.get(`/products/${id}`)
      .then((res) => {
        const information = res.data;
        this.setState({ information });
      })
      .catch((err) => {
        console.error('getProductInformation', err);
      })
  }

  getProductStyles = (id) => {
    axios.get(`/products/${id}/styles`)
      .then((res) => {
        const styles = res.data.results;
        this.setState({ styles });
      })
      .catch((err) => {
        console.error('getProductStyles', err);
      })
  }

  getProductReviews = (id) => {
    aixos.get(`/reviews/?sort='newest'&product_id=${id}`)
  }

  getProductRatings = (id) => {
    axios.get(`/reviews/meta/?product_id=${id}`)
      .then((res) => {
        const reviewsCount = Number(res.data.ratings['1']) + Number(res.data.ratings['2']) + Number(res.data.ratings['3']) + Number(res.data.ratings['4']) + Number(res.data.ratings['5']);
        const ratings = ((Number(res.data.ratings['1']) * 1 + Number(res.data.ratings['2']) * 2 + Number(res.data.ratings['3']) * 3 + Number(res.data.ratings['4']) * 4 + Number(res.data.ratings['5']) * 5) / reviewsCount).toFixed(1);
        this.setState({ ratings, reviewsCount });
      })
      .catch((err) => {
        console.error('getProductRatings', err);
      })
  }

  onStyleClick = (e) => {
    const checkboxes = document.getElementsByClassName("checkbox");
    for (let checkbox of checkboxes) {
      checkbox.checked = false;
    }
    const styles = [...this.state.styles];
    const selectedCheckbox = e.target;
    selectedCheckbox.checked = true;
    const selectedStyle = styles[selectedCheckbox.id];
    this.setState({
      selectedStyle,
      selectedSKU: '',
      maxQuantity: '',
      selectedQuantity: '',
      selectedSize: ''
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
      // const sizeSelection = Object.keys(selectedStyle.skus).length || 1;
      // sizeDropdown.setAttribute('size', `${sizeSelection}`);
      sizeDropdown.setAttribute('size', `3`);
    }
  }

  showSlides = (n) => {
    let slideIndex;
    const slides = document.getElementsByClassName('mySlides');
    // if (n > slides.length - 1) {
    //   slideIndex = 0
    // };
    // if (n < 0) {
    //   slideIndex = slides.lenght - 1;
    // }
    // for (let i = 0; i < slides.length)

    if (slides.length > 0) {
      slides.forEach(slide => slide.style.display = 'none');
      slides[n].style.display = 'block';
    }
  }

  render() {
    return (
      <div id="overview">
        <h1>Overview</h1>
        <ImageGallery styles={this.state.styles} selectedStyle={this.state.selectedStyle}/>
        <br></br>
        <ProductInformation information={this.state.information} ratings={this.state.ratings} reviewsCount={this.state.reviewsCount} />
        <StyleSelector styles={this.state.styles} selectedStyle={this.state.selectedStyle} onStyleClick={this.onStyleClick} />
        <br></br>
        <br></br>
        <br></br>
        <AddToCart selectedStyle={this.state.selectedStyle} selectedSKU = {this.state.selectedSKU} maxQuantity = {this.state.maxQuantity} selectedQuantity={this.state.selectedQuantity} selectedSKU={this.state.selectedSKU} onSizeChange={this.onSizeChange} onQuantityChange={this.onQuantityChange} onAddToCartClick={this.onAddToCartClick} />
        <br></br>
      </div>
    );
  }
}

export default Overview;