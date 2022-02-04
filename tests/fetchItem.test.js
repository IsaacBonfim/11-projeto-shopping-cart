require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verificando se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verificando se fetch é chamado corretamente ao executar a função fetchItem com o argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verificando se a url (endpoint) utilizada por fetch ao chamar a função fetchItem com "MLB1615760527" como argumento é "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Verificando se o retorno da função fetchItem com o argumento "MLB1615760527" é igual ao objeto item', async () => {
    const retorno = await fetchItem('MLB1615760527');
    expect(retorno).toEqual(item);
  });

  it('Verificando se ao chamar a função sem informar um argumento, ela retorna a mensagem de erro "You must provide an url"', () => {
    expect(fetchItem()).rejects.toEqual(new Error('You must provide an url'));
  });
});
