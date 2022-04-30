import React from 'react'
import {render} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import QuestionCard from './QuestionCard_app.jsx';
// require("babel-core/register");
// require("babel-polyfill");

const testQuestionOne =
  {
    question_id: 329059,
    question_body: "Tempora quod quia aut expedita voluptas odit vero.",
    question_date: "2021-02-21T00:00:00.000Z",
    asker_name: "Eudora_Willms",
    question_helpfulness: 31,
    reported: false,
    answers: {
      3073949: {
        id: 3073949,
        body: "Saepe quia aliquam ea voluptatibus doloremque distinctio.",
        date: "2021-06-25T00:00:00.000Z",
        answerer_name: "Dante18",
        helpfulness: 4,
        photos: [],
      },
      3073950: {
        id: 3073950,
        body: "Dolore eum quis.",
        date: "2020-12-12T00:00:00.000Z",
        answerer_name: "Yessenia99",
        helpfulness: 2,
        photos: [],
      },
      3073951: {
        id: 3073951,
        body: "Molestias atque ea aperiam quisquam est ea et.",
        date: "2020-10-17T00:00:00.000Z",
        answerer_name: "Laverna.Shields",
        helpfulness: 0,
        photos: [],
      },
    },
  };



describe('Question Component Unit Tests', () => {

  it('renders and Add Answer button', () => {
    const {getByText} = render(
      <QuestionCard
        question={testQuestionOne}
      />
    );
    expect(getByText(/add Answer/)).toBeInTheDocument();
  })
})
