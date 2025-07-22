import React from 'react';
import { render } from '@testing-library/react-native';
import RecipeIntro from '../RecipeIntro';

describe('RecipeIntro', () => {
  const recipeDetail = {
    imageUrl: 'https://example.com/image.jpg',
    recipeName: 'Sample Recipe',
    jsonData: {
      calories: 400,
      cookTime: 30,
      serveTo: 4,
    },
    description: 'A delicious sample recipe.'
  };

  it('renders recipe name and description', () => {
    const { getByText } = render(
      <RecipeIntro recipeDetail={recipeDetail} showActionSheet={() => {}} />
    );
    expect(getByText('Sample Recipe')).toBeTruthy();
    expect(getByText('A delicious sample recipe.')).toBeTruthy();
  });
});
