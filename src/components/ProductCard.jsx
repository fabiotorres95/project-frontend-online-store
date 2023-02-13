import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  handleLocalStorage = () => {
    const { product } = this.props;
    let productsList = [];
    if (localStorage.products) {
      productsList = JSON.parse(localStorage.getItem('products'));
    }
    const newProduct = product;
    productsList.push(newProduct);
    localStorage.products = JSON.stringify(productsList);
  };

  render() {
    const { product: { title, thumbnail, price } } = this.props;
    return (
      <div data-testid="product">
        <h3>{ title }</h3>
        <img src={ thumbnail } alt="imagem do produto" />
        <p>{ price }</p>
        <button
          data-testid="product-add-to-cart"
          onClick={ this.handleLocalStorage }
        >
          Adicionar ao carrrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
