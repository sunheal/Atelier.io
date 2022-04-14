import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import RelatedProducts from '../../RelatedProduct/RelatedProducts.jsx';

describe('RelatedProducts', () => {
  it('should have "RELATED PRODUCTS" and "YOUR OUTFIT" title', () => {
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
    render(<RelatedProducts productID={64620} selectedProductInfo={productInfo} />);
    const title = screen.getByText('RELATED PRODUCTS');
    const title1 = screen.getByText('YOUR OUTFIT');
    expect(title).toBeInTheDocument();
    expect(title1).toBeInTheDocument();
  })
});