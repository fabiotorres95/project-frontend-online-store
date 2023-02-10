import React from 'react';
import ProductCard from '../components/ProductCard';

class Home extends React.Component {
  state = {
    search: '',
    productsList: [],
    emptyArray: false,
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

  render() {
    const { search, productsList, emptyArray } = this.state;
    return (
      <>
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

export default Home;
