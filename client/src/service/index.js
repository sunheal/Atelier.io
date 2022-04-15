import axios from "axios";
const baseUrl = "http://localhost:3111";

export const getQAList = (product_id) => {
  const url = `${baseUrl}/qa/questions?product_id=${product_id}`
  return axios.get(url);
};

export const voteHelpfulness = (question_id) => {
  const url = `${baseUrl}/qa/questions/${question_id}/helpful`
  return axios.put(url);
}

export const reportRequest = (question_id) => {
  const url = `${baseUrl}/qa/questions/${question_id}/report`
  return axios.put(url);
}

export const voteAnswerHelpfulness = (answer_id) => {
  const url = `${baseUrl}/qa/answers/${answer_id}/helpful`
  return axios.put(url);
}

export const reportAnswerRequest = (answer_id) => {
  const url = `${baseUrl}/qa/answers/${answer_id}/report`
  return axios.put(url);
}

export const uploadImage = (options) => {
  return axios(options);
}












