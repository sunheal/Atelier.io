import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import BarChart from "./breakdowns.jsx";
import regeneratorRuntime from "regenerator-runtime";


describe('Render Components', () => {
    
  it('It should Render the Reviews Component', () => {
    const ratings = {
        "1": "4",
        "2": "51",
        "3": "17",
        "4": "13",
        "5": "28"};
    const count = 121;
    const recommend = 94;
    render(<BarChart ratings={ratings} count={count} recommend={recommend}/>);
    const title = screen.getByText("recommend", {exact:false});
    expect(title).toBeInTheDocument();    
  });
}); 