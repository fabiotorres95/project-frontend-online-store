import React, { Component } from 'react';
import ProductCart from '../components/ProductCart';

class ShoppingCart extends Component {
  render() {
    const products = JSON.parse(localStorage.getItem('products'));
    const elementEmptyCart = (
      <div
        data-testid="shopping-cart-empty-message"
      >
        Carrinho vazio

      </div>
    );

    return (

      <div>
        { products
          ? products.map((productItem) => (
            <ProductCart
              key={ productItem.id }
              product={ productItem }
            />
          ))
          : elementEmptyCart}
      </div>
    );
  }
}

export default ShoppingCart;
