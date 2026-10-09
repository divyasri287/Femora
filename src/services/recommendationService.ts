import { dresses } from '../data/dresses';

export const getRecommendations = (
  category: string,
) => {
  return dresses.filter(
    item =>
      item.category
        .toLowerCase()
        .includes(
          category.toLowerCase(),
        ),
  );
};