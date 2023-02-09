import React from 'react';
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
    const { categories } = this.state;
    return (
      <div>
        <input type="text" />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
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
            </label>
          ))}
        </p>
      </div>
    );
  }
}

export default Home;
