import React from 'react';
import ReactDOM from 'react-dom';

//  scrolling horizontally
// frist related product is all the way on the left
// arrow(click to scroll through the list one product at a time) appear on the right and left hand edeges of the list
// first product: hide left arrow, last product: hide right arrow


class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftCordinate: 0,
      slideLength: 800,
      cardSize: 210,
      previousButton: 'hidden',
      nextButton: 'visible'
    }
    this.myRef = React.createRef();
    this.moveToNextCard = this.moveToNextCard.bind(this);
    this.moveToPrevCard = this.moveToPrevCard.bind(this);
  }

  handlePreviousBtnVisibility() {
    if (this.state.leftCordinate < 0 && this.state.previousButton === 'hidden') {
      this.setState({
        previousButton: 'visible'
      });
    } else if (this.state.previousButton === 'visible') {
      this.setState({
        previousButton: 'hidden'
      });
    }
  }

  handleNextBtnVisibility() {
    if (this.myRef.current.offsetWidth < (this.state.slideLength + this.state.leftCordinate)) {
      if (this.state.nextButton === 'hidden') {
        this.setState({
          nextButton: 'visible'
        });
      }
    } else if (this.state.nextButton === 'visible') {
      this.setState({
        nextButton: 'hidden'
      });
    }
  }

  moveToNextCard() {
    if (this.myRef.current.offsetWidth < (this.state.slideLength + this.state.leftCordinate)) {
      this.setState({
        leftCordinate: this.state.leftCordinate - this.state.cardSize
      });
    }
  }

  moveToPrevCard() {
    if (this.state.leftCordinate < 0) {
      this.setState({
        leftCordinate: this.state.leftCordinate + this.state.cardSize
      });
    }
  }

  updateSlideLength() {
    const numberOfCards = this.props.relatedProductsIDs.length;
    this.setState({
      slideLength: numberOfCards * this.state.cardSize + 2
    });
  }

  render() {
    return (
      <div>
        <button className="lefty paddle" id="left-button"> 1 </button>
        <div className="carousel-container" ref={this.myRef}>
          <div className="carousel" style={{ left: `${this.state.leftCordinate}px`, width: `${this.state.slideLength}px` }}></div>
        </div>
        <button className="righty paddle" id="right-button"> 2 </button>
      </div>
    );
  }
}
export default Carousel;
