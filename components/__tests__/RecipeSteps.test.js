import React from 'react';
import { render } from '@testing-library/react-native';
import RecipeSteps from '../RecipeSteps';

describe('RecipeSteps', () => {
  const recipeDetail = {
    jsonData: {
      steps: [
        'Step 1: Prep ingredients',
        'Step 2: Cook for 20 min',
      ],
    },
  };

  it('renders all steps', () => {
    const { getByText } = render(<RecipeSteps recipeDetail={recipeDetail} />);
    expect(getByText('Step 1: Prep ingredients')).toBeTruthy();
    expect(getByText('Step 2: Cook for 20 min')).toBeTruthy();
  });
});
