import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
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

  render() {
    const { history } = this.props;
    const { categories } = this.state;
    return (
      <div>
        <input type="text" />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <button
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/cart') }
        >
          Carrinho
        </button>
        <p>
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
              />
              <span>{categorie.name}</span>
            </label>
          ))}
        </p>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
