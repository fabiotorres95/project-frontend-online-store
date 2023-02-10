import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductById } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    productsList: [],
    emptyArray: false,
    categories: [],
    categorieProducts: [],
  };

  componentDidMount() {
    this.requirementCategories();
  }

  requirementCategories = async () => {
    const data = await getCategories();
    this.setState({
      categories: data,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { search } = this.state;
    const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
    const response = await fetch(endPoint);
    const data = await response.json();

    if (data.results.length === 0) {
      this.setState({
        emptyArray: true,
      });
    }

    this.setState({
      search: '',
      productsList: data.results,
    });
  };

  getCategorieById = async ({ target }) => {
    const { value } = target;
    const response = await getProductById(value);

    this.setState({
      categorieProducts: response,
    });
  };

  render() {
    const { search,
      productsList,
      emptyArray,
      categories,
      categorieProducts } = this.state;

    const { history } = this.props;
    return (
      <>
        <button
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/cart') }
        >
          Carrinho
        </button>
        <input
          data-testid="query-input"
          type="text"
          name="search"
          value={ search }
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.handleClick }
        >
          teste
        </button>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div>
          {categories.map((categorie) => (
            <label
              key={ categorie.id }
              htmlFor={ categorie.id }
              data-testid="category"
            >
              <input
                type="radio"
                name="categoria"
                id={ categorie.id }
                onChange={ this.getCategorieById }
                value={ categorie.id }
              />
              <span>{categorie.name}</span>
            </label>
          ))}
        </div>
        { categorieProducts.map((product) => (
          <ProductCard
            key={ product.id }
            product={ product }
          />
        ))}
        <div>
          { productsList.length > 0
            ? productsList.map((product) => (
              <ProductCard
                key={ product.id }
                product={ product }
              />
            )) : emptyArray && <h3>Nenhum produto foi encontrado</h3>}
        </div>
      </>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
