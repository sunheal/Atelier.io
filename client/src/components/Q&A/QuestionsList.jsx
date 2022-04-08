import React, { Component } from "react";
import axios from "axios";
import config from "../../../../config.js";
import QuestionCard from "./QuestionsList/QuestionCard_app.jsx";
import { getQAList } from "../../service/index.js";

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
    };
  }

  componentDidMount() {
    getQAList(this.props.product_id).then((res) => {
      this.setState({
        questions: res.data,
        id: res.data.product_id,
      });
    });
  }

  render() {
    return (
      <div>
        Here are the questions for this product:
        {this.state.questions.results.length}
        <h1>{this.state.id}</h1>
        {this.state.questions.results.map((item) => {
          return <QuestionCard {...item} key={item.question_id} />;
        })}
      </div>
    );
  }
}

export default QuestionsList;
