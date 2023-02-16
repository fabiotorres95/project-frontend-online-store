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
    const validation = rating.length === 0;
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
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { details, email, text, isNotValid, reviews } = this.state;
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

          <label htmlFor="option1">1</label>
          <input
            type="radio"
            data-testid="1-rating"
            id="option1"
            value="1"
            name="rating"
            onChange={ this.handleChange }
          />

          <label htmlFor="option2">2</label>
          <input
            type="radio"
            data-testid="2-rating"
            id="option2"
            value="2"
            name="rating"
            onChange={ this.handleChange }
          />

          <label htmlFor="option3">3</label>
          <input
            type="radio"
            data-testid="3-rating"
            id="option3"
            value="3"
            name="rating"
            onChange={ this.handleChange }
          />

          <label htmlFor="option4">4</label>
          <input
            type="radio"
            data-testid="4-rating"
            id="option4"
            value="4"
            name="rating"
            onChange={ this.handleChange }
          />

          <label htmlFor="option5">5</label>
          <input
            type="radio"
            data-testid="5-rating"
            id="option5"
            value="5"
            name="rating"
            onChange={ this.handleChange }
          />

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
          ? reviews.map((obj, index) => (
            <ReviewCard
              key={ index }
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
