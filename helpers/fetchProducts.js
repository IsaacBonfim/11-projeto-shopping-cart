const fetchProducts = async (produto) => {
  if (!produto) {
    throw new Error('You must provide an url');
  }

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

  const result = await fetch(url)
    .then((response) => response.json());
    
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
