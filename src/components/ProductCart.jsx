import { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCart extends Component {
  render() {
    const { product: { title, thumbnail, price } } = this.props;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <img src={ thumbnail } alt="imagem do produto" />
        <p>{ price }</p>
        <p data-testid="shopping-cart-product-quantity">1</p>
      </div>
    );
  }
}

ProductCart.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCart;
