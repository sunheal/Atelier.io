import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import QandA from "./QandA_app.jsx";
import regeneratorRuntime from "regenerator-runtime";


describe('Render Components', () => {
  it('It should Render the Q&A Component', () => {
    render(<QandA/>);
    const title = screen.getByText("Questions", {exact:false});
    expect(title).toBeInTheDocument();
  });
});