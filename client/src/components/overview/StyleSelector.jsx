import React from 'react';
import './StyleSelector.css';

const StyleSelector = (props) => {
  return (
    <div>
      <h4>StyleSelector</h4>
      <div id='style'>STYLE > {props.selectedStyle?.name}</div>
      <div id="selectStyle">
        {props.styles?.map((style, index) => {
          return (
            <div key={index} className="styleDiv" onClick={props.onStyleClick} >
              <input type="checkbox" className="checkbox" id={index} />
              <label htmlFor={index} className="label-style"><img className="img-style" src={style.photos[0].thumbnail_url} alt={style.name} /></label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StyleSelector;