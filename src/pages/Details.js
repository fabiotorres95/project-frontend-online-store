import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addCart } from '../services/cartFunctions';

class Details extends Component {
  state = {
    details: [],
    email: '',
    rating: '',
    comments: '',
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const endPoint = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(endPoint);
    const data = await response.json();

    this.setState({
      details: data,
    });
  };

  addProductToCart = () => {
    const { details } = this.state;
    console.log(details);
    addCart(details);
  };

  validationFields = () => {
    const { email, rating, comments } = this.state;
    const validation = email.length > 0 && rating.length > 0 && comments.length > 0;
    this.state({
      validation,
    }, () => {
      this.setState({
        email: '',
        rating: '',
        comments: '',
      });
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { details, email, comments, rating } = this.state;
    const { title, thumbnail, price } = details;
    const { history } = this.props;

    return (
      <div data-testid="product">
        <h3 data-testid="product-detail-name">{ title }</h3>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt="imagem do produto"
        />
        <p data-testid="product-detail-price">{ price }</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addProductToCart }
        >
          Adicionar ao Carrinho
        </button>
        <button
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/cart') }
        >
          Carrinho
        </button>
        <form>
          <label>
            Email
            <input
              type="text"
              data-testid="product-detail-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <select
            name="rating"
            onChange={ this.handleChange }
            value={ rating }
          >
            <option data-testid="1-rating">Selecione</option>
            <option value="1" data-testid="1-rating">1</option>
            <option value="2" data-testid="2-rating">2</option>
            <option value="3" data-testid="3-rating">3</option>
            <option value="4" data-testid="4-rating">4</option>
            <option value="5" data-testid="5-rating">5</option>
          </select>

          <label>
            Comentários
            <input
              type="text"
              data-testid="product-detail-evaluation"
              onChange={ this.handleChange }
              name="comments"
              value={ comments }
            />
          </label>

          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.validationFields }
          >
            Enviar
          </button>

        </form>
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Details;
