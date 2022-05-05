import React from "react";
import '@testing-library/jest-dom'
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import AddToCart from './AddToCart.jsx';
import regeneratorRuntime from "regenerator-runtime";

describe('AddToCart', () => {
  it('should render the Add To Bag Button', () => {

    render(<AddToCart/>);
    const button = screen.getByText('ADD TO BAG +');
    expect(button).toBeInTheDocument();
  })

});

describe('AddToCart', () => {
  it('should render the Select Size Dropdown', () => {

    render(<AddToCart/>);
    const dropdown = screen.getByText('- SELECT SIZE -');
    expect(dropdown).toBeInTheDocument();
  })

});

describe('AddToCart', () => {
  it('should render the Star Button', () => {

    render(<AddToCart/>);
    const starButton = screen.getByText('☆');
    expect(starButton).toBeInTheDocument();
  })

});