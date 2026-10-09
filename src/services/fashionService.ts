export const getFashionTips = (
    occasion: string,
  ) => {
    switch (
      occasion.toLowerCase()
    ) {
      case 'wedding':
        return 'Wear elegant gowns and premium accessories.';
  
      case 'party':
        return 'Choose stylish party wear with matching heels.';
  
      case 'casual':
        return 'Comfortable casual dresses are recommended.';
  
      default:
        return 'Explore our trending collection.';
    }
  };