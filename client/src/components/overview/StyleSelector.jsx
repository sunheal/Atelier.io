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
              <label className='OverView_label'htmlFor={index}><img src={style.photos[0].thumbnail_url} alt={style.name} /></label>
            </div>
          );
        })}
      </div>
      <br></br>
      <div id="size">
        <select name="size" id="size" value={props.selectedSize} onChange={props.onSizeChange}>
          <option value="SELECT SIZE" hidden>SELECT SIZE</option>
          {Object.keys(props.selectedStyle?.skus || {}).map((sku, index) => {
            return (
              <option key={index} value={props.selectedStyle.skus[sku].size}>{props.selectedStyle.skus[sku].size}</option>
            );
          })}
        </select>
      </div>
      <div id="quantity">
        <select name="quantity" id="quantity" value="SELECT">
          <option value="SELECT" selected disabled hidden>SELECT Quantity</option>
        </select>
      </div>
    </div>
  );
}

export default StyleSelector;