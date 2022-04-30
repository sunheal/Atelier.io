import React from "react";
import {render} from '@testing-library/react';
import QuestionsList from './QuestionsList.jsx';
import "@testing-library/jest-dom/extend-expect";



test("header renders with correct text", () => {
  const {getByTestId} = render(<QuestionsList />);
  const headerEl = getByTestId("header")

  expect(headerEl.textContent).toBe("Here are the questions for this product:0")
})