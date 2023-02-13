import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';

class ShoppingCart extends Component {
  state = {
    emptyCart: true,
    products: [],
  };

  render() {
    const { emptyCart, products } = this.state;
    const elementEmptyCart = (
      <div
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio

      </div>);
    return (
      <div>
        { emptyCart
          ? elementEmptyCart
          : products.map((productItem) => (
            <ProductCard
              key={ productItem.id }
              product={ productItem }

            />))}
      </div>
    );
  }
}

export default ShoppingCart;
