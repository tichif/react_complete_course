import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key]; //return the amount of each ingredient
      })
      .reduce((ingSum, el) => ingSum + el, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancellingHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    axios
      .post('/orders.json', {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: 'John Doe',
          address: 'TestStreet 1',
        },
        email: 'test@test.com',
        deliveryMethod: 'fastest',
      })
      .then((res) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false, purchasing: false });
      });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updateCount;
    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updateCount;
    const priceDeduction = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updateIngredients);
  };

  componentDidMount() {
    axios
      .get('https://burger-ae01d-default-rtdb.firebaseio.com/ingredients.json')
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            purchasing={this.purchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancel={this.purchaseCancellingHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancellingHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
