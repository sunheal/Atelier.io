import React, {Component} from 'react';
import SearchBar from './SearchBar.jsx';
import QuestionsList from './QuestionsList.jsx'

class QandA extends Component {
  render() {
    return (
    <div>
      <h1>Questions & Answers</h1>
      <SearchBar/>
      <QuestionsList/>
    </div>
  );
  }
}

export default QandA;