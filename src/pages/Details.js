import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Details extends Component {
  state = {
    details: [],
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

  render() {
    const { details } = this.state;
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
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/cart') }
        >
          Carrinho
        </button>
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

//   <div data-testid="product">
//   <h3>{ title }</h3>
//   <img src={ thumbnail } alt="imagem do produto" />
//   <p>{ price }</p>
//   <Link to={ `/details/${id}` }>Detalhes</Link>
// </div>;

// categorieProducts.map((product) => (
//   <ProductCard
//     key={ product.id }
//     product={ product }
//   />

// getCategorieById = async ({ target }) => {
//   const { value } = target;
//   const response = await getProductById(value);

//   this.setState({
//     categorieProducts: response,
//   });
// };

// const endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
//   const response = await fetch(endPoint);
//   const data = await response.json();

//   return data.results;
export default Details;
