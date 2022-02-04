const fetchItem = async (id) => {
  if (!id) {
    throw new Error('You must provide an url');
  }

  const url = `https://api.mercadolibre.com/items/${id}`;

  const result = await fetch(url)
    .then((response) => response.json());

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
