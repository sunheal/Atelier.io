import React, { Component } from "react";

class Answers extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let answersArray = Object.values(this.props.answersArray);

    answersArray.sort((a,b) => b.helpfulness - a.helpfulness)
    return <div>
      {answersArray.map(item => {
        return <p key={item.id}>A: {item.body}</p>
      })}
    </div>;
  }
}

export default Answers;
