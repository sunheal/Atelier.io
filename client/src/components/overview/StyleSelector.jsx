import React from 'react';
import './StyleSelector.css';

const StyleSelector = (props) => {
  return (
    <div>
      <h4>StyleSelector</h4>
      {/* {props.styles?.map((style, index) => {
        return (
          <div key={index} className="styleDiv">
            <label className="styleLabel">
            <img className="styleThumbnail"src={style.photos[0].thumbnail_url} alt="style" />
            </label>
            <input type="checkbox" className="styleCheckbox" />
          </div>
        );
      })} */}
      {props.styles?.map((style, index) => {
        return (
          <div key={index} className="styleDiv">
            {/* <label className="styleLabel">
            <img className="styleThumbnail"src={style.photos[0].thumbnail_url} alt="style" />
            </label>
            <input type="checkbox" className="styleCheckbox" /> */}

            <input type="checkbox" id={index} />
            <label htmlFor={index}><img src={style.photos[0].thumbnail_url} alt={style.name} /></label>
          </div>
        );
      })}
    </div>
  );
}

export default StyleSelector;