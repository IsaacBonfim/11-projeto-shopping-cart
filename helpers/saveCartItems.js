const saveCartItems = (name, itens) => localStorage.setItem(name, itens);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
