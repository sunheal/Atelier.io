import React from 'react';
import "../Ratings&Reviews/rr.css";
import { useState, useEffect } from 'react';


const Stars = (props) => {
  const percent = props.rating / 5 * 100;

  const containerStyle = {
    'position': 'relative'
  }

  const starStyle = {
    'position': 'absolute',
    'left': '0',
    'fontSize': 'large',
    'backgroundImage': `-webkit-linear-gradient(0deg, gold ${percent}%, transparent ${percent}% 100%)`,
    'backgroundClip': 'text',
    'WebkitBackgroundClip': 'text',
    'WebkitTextFillColor': 'transparent'
  }

  const emptyStarStyle = {
    // 'z-Index': '1',
    'color': 'gold',
    'position': 'absolute',
    'left': '0',
    'fontSize': 'large'
  }

  if (props.rating === null) {
    return null;
  } else {
    return (
      <span className="productInfo-rating" style={containerStyle}>
        <span style={starStyle}>★★★★★</span>
        <span style={emptyStarStyle}>☆☆☆☆☆</span>
      </span>
    )
  }
}

export default Stars;
