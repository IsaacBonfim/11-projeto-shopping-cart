const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Verificando se ao chamar a função saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;', () => {
    saveCartItems('cartItems', '<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Verificando se ao chamar a função saveCartItems com o argumento <ol><li>Item</li></ol>, oo método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    saveCartItems('cartItems', '<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
