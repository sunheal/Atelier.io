import React, { Component } from "react";

class Window extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props)
    return <div id="window" onClick={() => this.props.onClick()}>{this.props.children}</div>;
  }
}

export default Window;
