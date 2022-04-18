import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import RelatedProducts from './RelatedProducts.jsx';
import RelatedProductsList from './RelatedProductsList.jsx';
import Modal from './Modal.jsx';

const comparisionArray = [
  {
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
  },
  {
    "id": 64621,
    "campus": "hr-rpp",
    "name": "Bright Future Sunglasses",
    "slogan": "You've got to wear shades",
    "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    "category": "Accessories",
    "default_price": "69.00",
    "created_at": "2022-01-28T00:20:03.466Z",
    "updated_at": "2022-01-28T00:20:03.466Z",
    "features": [
      {
        "feature": "Lenses",
        "value": "Ultrasheen"
      },
      {
        "feature": "UV Protection",
        "value": null
      },
      {
        "feature": "Frames",
        "value": "LightCompose"
      }
    ]
  }
];

describe('Modal', () => {

  it('should have "Comparing" title', () => {
    render(<Modal comparisionArray={comparisionArray} />);
    const title = screen.getByText('Comparing');
    expect(title).toBeInTheDocument();
  });

  it('should contain two comparing products names', () => {
    render(<Modal comparisionArray={comparisionArray} />);
    const product1 = screen.getByText('Camo Onesie');
    expect(product1).toBeInTheDocument();
    const product2 = screen.getByText('Bright Future Sunglasses');
    expect(product2).toBeInTheDocument();
  });

  // it('should display checkmark if either one product has an value in common features', () => {
  //   render(<Modal comparisionArray={comparisionArray} />);
  //   const feature = screen.getByRole('tr', {description: 'Fabric'});
  //   expect(feature).toBeInTheDocument();
  // });

});