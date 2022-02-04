require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verificando se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  
  it('Verificando se fetch é chamado corretamente ao executar a função fetchProducts com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it(`Verificando se a url (endpoint) utilizada por fetch ao chamar a função fetchProducts com "computador" como argumento é "https://api.mercadolibre.com/sites/MLB/search?q=computador"`, () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Verificando se o retorno da função fetchProducts com o argumento "computador" é igual ao objeto computadorSearch', async () => {
    const retorno = await fetchProducts('computador');
    expect(retorno).toEqual(computadorSearch);
  });

  it('Verificando se ao chamar a função sem informar um argumento, ela retorna a mensagem de erro "You must provide an url".', () => {
    expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  });
});
