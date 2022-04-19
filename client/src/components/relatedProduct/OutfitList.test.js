import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import RelatedProducts from './RelatedProducts.jsx';
import OutfitList from './OutfitList.jsx';

describe('OutfitList', () => {
  it('should have "Add to Outfit" button', () => {
    render(<OutfitList />);
    const buttonName = screen.getByText('Add to Outfit');
    expect(buttonName).toBeInTheDocument();
  })
});