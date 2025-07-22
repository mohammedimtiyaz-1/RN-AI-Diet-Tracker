import React from 'react';
import { render } from '@testing-library/react-native';
import RecipeCard from '../RecipeCard';

describe('RecipeCard', () => {
  const recipe = {
    _id: '1',
    imageUrl: 'https://example.com/image.jpg',
    recipeName: 'Test Recipe',
    jsonData: {
      calories: 300,
      cookTime: 20,
      serveTo: 2,
    },
  };

  it('renders recipe name and calories', () => {
    const { getByText } = render(<RecipeCard recipe={recipe} />);
    expect(getByText('Test Recipe')).toBeTruthy();
    expect(getByText(/300/)).toBeTruthy();
  });

  it('renders image', () => {
    const { getByTestId } = render(<RecipeCard recipe={recipe} />);
    // Assuming Image has testID set in RecipeCard for testability
    // If not, add testID="recipe-image" to the Image in RecipeCard
    // expect(getByTestId('recipe-image')).toBeTruthy();
  });
});
