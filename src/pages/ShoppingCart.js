import React, { Component } from 'react';
import ProductCart from '../components/ProductCart';

class ShoppingCart extends Component {
  render() {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    const elementEmptyCart = (
      <div
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio

      </div>
    );

    return (

      <div>
        { products.length > 0
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
