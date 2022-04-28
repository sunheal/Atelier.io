import React from "react";
import '@testing-library/jest-dom'
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import RelatedProducts from './RelatedProducts.jsx';
afterEach(cleanup);
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

    const relatedProductsInfo = [
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
      },
      {
        "id": 64622,
        "campus": "hr-rpp",
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": "40.00",
        "created_at": "2022-01-28T00:20:03.466Z",
        "updated_at": "2022-01-28T00:20:03.466Z",
        "features": [
          {
            "feature": "Fabric",
            "value": "100% Cotton"
          },
          {
            "feature": "Cut",
            "value": "Skinny"
          }
        ]
      },
      {
        "id": 64627,
        "campus": "hr-rpp",
        "name": "YEasy 350",
        "slogan": "Just jumped over jumpman",
        "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
        "category": "Kicks",
        "default_price": "450.00",
        "created_at": "2022-01-28T00:20:03.466Z",
        "updated_at": "2022-01-28T00:20:03.466Z",
        "features": [
          {
            "feature": "Sole",
            "value": "Rubber"
          },
          {
            "feature": "Material",
            "value": "FullControlSkin"
          },
          {
            "feature": "Stitching",
            "value": "Double Stitch"
          }
        ]
      },
      {
        "id": 64626,
        "campus": "hr-rpp",
        "name": "Blues Suede Shoes",
        "slogan": "2019 Stanley Cup Limited Edition",
        "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
        "category": "Dress Shoes",
        "default_price": "120.00",
        "created_at": "2022-01-28T00:20:03.466Z",
        "updated_at": "2022-01-28T00:20:03.466Z",
        "features": [
          {
            "feature": "Sole",
            "value": "Rubber"
          },
          {
            "feature": "Material",
            "value": "FullControlSkin"
          },
          {
            "feature": "Stitching",
            "value": "Double Stitch"
          }
        ]
      }
    ];

    render(<RelatedProducts productID={64620} selectedProductInfo={productInfo} relatedProductsIDs={[64621, 64622, 64627, 64626]} relatedProductsInfo={relatedProductsInfo} />);
    const title = screen.getByText('RELATED PRODUCTS');
    const title1 = screen.getByText('YOUR OUTFIT');
    expect(title).toBeInTheDocument();
    expect(title1).toBeInTheDocument();
  })

});