import React from "react";
import '@testing-library/jest-dom'
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import Overview from './Overview.jsx';
import regeneratorRuntime from "regenerator-runtime";
afterEach(cleanup);

describe('Overview', () => {
  it('should have "Overview" Title', () => {
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
    render(<ProductInformation information={information} ratings={ratings} reviewsCount={reviewsCount} />);
    const title = screen.getByText('ProductInformation');
    expect(title).toBeInTheDocument();
  })
});