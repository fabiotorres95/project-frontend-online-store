export async function getCategories() {
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endPoint);
  const data = await response.json();

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const response = await fetch(endPoint);
  const data = await response.json();

  return data;
}

export async function getProductById(categoryId) {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(endPoint);
  const data = await response.json();

  return data.results;
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
