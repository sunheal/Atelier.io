import React from "react";
import {render, screen} from '@testing-library/react';
import App from './app.jsx';
import "@testing-library/jest-dom/extend-expect";





test("header renders with correct text", () => {
  const component = render(<App />);
  const headerEl = component.getByTestId("header")

  expect(headerEl.textContent).toBe("Good Deals Only")
})