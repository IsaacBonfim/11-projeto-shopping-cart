const fetchProducts = async (produto) => {
  if (!produto) {
    throw new Error('You must provide an url');
  }

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

  const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => console.log(`Algo deu errado! \n${error}`));
    
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
