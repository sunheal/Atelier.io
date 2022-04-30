import React from "react";
import {render} from '@testing-library/react';
import App from './app.jsx';
import "@testing-library/jest-dom/extend-expect";



test("header renders with correct text", () => {
  const {getByTestId} = render(<App />);
  const headerEl = getByTestId("header")

  expect(headerEl.textContent).toBe("Good Deals Only")
})