import React, { Component } from "react";
import './window.css';

class Window extends Component {
  render() {
    return (
      <div id="window" >
        <div className="windowBox">
          <div className="close" onClick={() => this.props.onClick()}>X</div>
          {this.props.children}  
        </div>
      </div>
    );
  }
}

export default Window;
