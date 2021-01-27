import React from 'react';

import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = ({ ingredients }) => {
  const transformedIngredients = Object.keys(ingredients).map((key) => {
    return [...Array(ingredients[key])].map((_, i) => (
      <BurgerIngredients key={key + 1} type={key} />
    ));
  });
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type='bread-top' />
      {transformedIngredients}
      <BurgerIngredients type='bread-bottom' />
    </div>
  );
};

export default Burger;
