import React, {Component} from 'react';
import SearchBar from './SearchBar.jsx';
import QuestionsList from './QuestionsList.jsx'

class QandA extends Component {
  constructor(props){
    super(props)
    this.state={
      product_id:64620
    }
  }
  render() {
    return (
    <div id='QandA'>
      <h1>Questions & Answers</h1>
      <SearchBar/>
      {/*<QuestionsList product_id={this.state.product_id}/>*/}

      <QuestionsList product_id={40356}/>
    </div>
  );
  }
}

export default QandA;