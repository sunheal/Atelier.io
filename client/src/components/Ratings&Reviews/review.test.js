
import React from 'react';
import ReviewListView from './reviewListView.jsx';
import {render} from '@testing-library/react';
import {jsdom} from '@testing-library/jest-dom';

describe('Render Components', () => {
  test('It should Render the Reviews Component', () => {
    const {getByText} = render(<ReviewListView/>);
    expect(getByText('Reviews').toBeInTheDocument);
  });
}); 