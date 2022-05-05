import React from "react";
import '@testing-library/jest-dom'
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import AddToCart from './AddToCart.jsx';
import regeneratorRuntime from "regenerator-runtime";

describe('ProductInformation', () => {
  it('should render product name', () => {
    const information = {
      "id": 64620,
      "campus": "hr-rpp",
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140.00",
      "created_at": "2022-01-28T00:20:03.466Z",
      "updated_at": "2022-01-28T00:20:03.466Z",
      "features": [
          {
              "feature": "Fabric",
              "value": "Canvas"
          },
          {
              "feature": "Buttons",
              "value": "Brass"
          }
      ]
    };
    const ratings = '3.0';
    const reviewsCount = 100;
    // selectedStyle={this.state.selectedStyle}

    // selectedSKU={this.state.selectedSKU}
    // maxQuantity={this.state.maxQuantity}
    // selectedQuantity={this.state.selectedQuantity}
    // selectedSKU={this.state.selectedSKU}
    render(<ProductInformation information={information} ratings={ratings} reviewsCount={reviewsCount} />);
    const productName = screen.getByText('Camo Onesie');
    expect(productName).toBeInTheDocument();
  })

});