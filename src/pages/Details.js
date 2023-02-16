import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addCart } from '../services/cartFunctions';
import ReviewCard from '../components/ReviewCard';

class Details extends Component {
  constructor() {
    super();

    this.validationFields = this.validationFields.bind(this);

    this.state = {
      reviews: [],
      details: [],
      email: '',
      rating: '',
      text: '',
      isNotValid: false,
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const endPoint = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(endPoint);
    const data = await response.json();
    const savedReviews = localStorage.getItem(data.id);
    if (savedReviews) {
      this.setState({
        details: data,
        reviews: JSON.parse(savedReviews),
      });
    } else {
      this.setState({
        details: data,
      });
    }
  };

  addProductToCart = () => {
    const { details } = this.state;
    addCart(details);
  };

  validationFields = () => {
    const { details, email, rating, text, reviews } = this.state;
    const validation = email.length === 0 || rating.length === 0 || text.length === 0;
    console.log(validation);
    const reviewData = { email, text, rating };
    this.setState({
      email: '',
      rating: '',
      text: '',
      isNotValid: validation,
    }, () => {
      if (validation === false) {
        const allReviews = reviews;
        allReviews.push(reviewData);
        localStorage.setItem(
          details.id,
          JSON.stringify(allReviews),
        );
      }
    });
    this.getProduct();
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { details, email, text, rating, isNotValid, reviews } = this.state;
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
              type="email"
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
            <option value="">Selecione</option>
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
              name="text"
              value={ text }
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
        { isNotValid ? <p data-testid="error-msg">Campos inválidos</p> : <p /> }
        { reviews.length !== 0
          ? reviews.map((obj) => (
            <ReviewCard
              key={ obj.email }
              email={ obj.email }
              rating={ obj.rating }
              text={ obj.text }
            />
          ))
          : <p />}
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
