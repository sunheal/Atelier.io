import React from "react";
import '@testing-library/jest-dom'
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import AdditionalProductInfo from './AdditionalProductInfo.jsx';
import regeneratorRuntime from "regenerator-runtime";

describe('AdditionalProductInfo', () => {
  it('should render additonal product information such as slogan and features', () => {
    const productInfo = {
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

    render(<AdditionalProductInfo productInfo={productInfo}  />);
    const slogan = screen.getByText('The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.');
    expect(slogan).toBeInTheDocument();
  })

});