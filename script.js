const carrinho = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const item = event.target;

  carrinho.removeChild(item);

  saveCartItems('itens', carrinho.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function insereNoCarrinho(id) {
  const item = await fetchItem(id);

  const itemCarrinho = {
    sku: item.id,
    image: item.thumbnail,
    name: item.title,
    salePrice: item.price,
  };

  carrinho.appendChild(createCartItemElement(itemCarrinho));

  saveCartItems('itens', carrinho.innerHTML);
}

async function criaItem() {
  const itens = await fetchProducts('computador');
  const sessaoItens = document.querySelector('.items');
  
  itens.forEach((item, index) => {
    const produto = {
      sku: item.id,
      image: item.thumbnail,
      name: item.title,
      salePrice: item.price,
    };
    
    sessaoItens.appendChild(createProductItemElement(produto));
    
    const botao = document.querySelectorAll('.item__add');
    botao[index].addEventListener('click', () => insereNoCarrinho(produto.sku));
  });
}
criaItem();

window.onload = () => {
  if (localStorage.getItem('itens')) {
    const itenSalvo = getSavedCartItems('itens');

    carrinho.innerHTML = itenSalvo;

    const linhas = document.querySelectorAll('li');

    linhas.forEach((li) => {
      li.addEventListener('click', cartItemClickListener);
    });
  }
};
