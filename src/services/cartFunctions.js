const PRODUCT = 'products';

if (!JSON.parse(localStorage.getItem(PRODUCT))) {
  localStorage.setItem(PRODUCT, JSON.stringify([]));
}
const readProductCart = () => JSON.parse(localStorage.getItem(PRODUCT));

export const saveProducts = (cartProducts) => localStorage
  .setItem(PRODUCT, JSON.stringify(cartProducts));

export const getCartProducts = () => {
  const cartProducts = readProductCart();
  return cartProducts;
};

export const addCart = (product) => {
  const productInfo = {
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    id: product.id,
    quantity: 1,
  };

  const cartProducts = readProductCart();
  saveProducts([...cartProducts, productInfo]);
};
