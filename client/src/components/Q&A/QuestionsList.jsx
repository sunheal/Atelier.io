import React, { Component } from "react";
import axios from "axios";
import config from "../../../../config.js";
import QuestionCard from "./QuestionsList/QuestionCard_app.jsx";
import { getQAList } from "../../service/index.js";
import SearchBar from "../Q&A/QuestionsList/search-bar/SearchBar.jsx";

const host = "localhost:3111";
const headers = {
  Authorization: `${config.TOKEN}`,
};

class QuestionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: { product_id: "", results: [] },
      id: "",
      currentQuestions: [],
    };
  }

  componentDidMount() {
    getQAList(this.props.product_id).then((res) => {
      this.setState({
        questions: res.data,
        id: res.data.product_id,
        currentQuestions: res.data.results,
      });
    });
  }

  onSearch = (value) => {
    console.log(value, "父组件");
    const { questions } = this.state;
    console.log(questions)
    const currentQuestions = questions.results.filter((item) => {
      if (item.question_body.includes(value)) {
        return item;
      }
    });
    this.setState({
      currentQuestions
    })
    console.log(currentQuestions, '----------------');
  };

  render() {
    console.log(this.state.currentQuestions, '---------------------------')
    return (
      <div>
        <SearchBar onSearch={this.onSearch}></SearchBar>
        {this.state.currentQuestions.map((item) => {
          return <QuestionCard {...item} key={item.question_id} />;
        })}
      </div>
    );
  }
}

export default QuestionsList;
