import React from 'react';
import { render } from '@testing-library/react-native';
import RecipeOptionList from '../RecipeOptionList';

describe('RecipeOptionList', () => {
  const mealOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
  ];

  it('renders all meal options', () => {
    const { getByText } = render(
      <RecipeOptionList mealOptions={mealOptions} />
    );
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
  });
});
