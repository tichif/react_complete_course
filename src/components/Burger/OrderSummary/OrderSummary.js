import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = ({
  ingredients,
  purchaseCancel,
  purchaseContinue,
  price,
}) => {
  const ingredientSummary = Object.keys(ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>:{' '}
        {ingredients[key]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout</p>
      <Button btnType='Danger' clicked={purchaseCancel}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={purchaseContinue}>
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default OrderSummary;
