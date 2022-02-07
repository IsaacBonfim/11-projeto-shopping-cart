const carrinho = document.querySelector('.cart__items');
const valorItens = document.querySelector('.total-price');

function somaValor(valor) {
  const novoValor = parseFloat(valorItens.innerText) + parseFloat(valor);

  valorItens.innerText = novoValor;
}

function subtraiValor(valor) {
  const novoValor = parseFloat(valorItens.innerText) - parseFloat(valor);

  valorItens.innerText = novoValor;
}

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  const item = event.target;
  const array = item.innerText.split(' ');
  const valor = array[array.length - 1].split('');

  carrinho.removeChild(item);

  saveCartItems('cartItems', carrinho.innerHTML);

  valor.shift();
  subtraiValor(valor.join(''));
}

function createCartItemElement({ sku, image, name, salePrice }) {
  const li = document.createElement('li');
  const Imagem = `<img class="cart__image" src="${image}">`;
  const Texto = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;

  li.className = 'cart__item';
  li.innerHTML = `${Imagem}${Texto}`;
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

  saveCartItems('cartItems', carrinho.innerHTML);

  somaValor(itemCarrinho.salePrice);
}

function loading(item) {
  const load = createCustomElement('section', 'loading', 'Loading');
  item.appendChild(load);
}

function carregado(item) {
  const load = document.querySelector('.loading');
  item.removeChild(load);
}

async function criaItem() {
  const sessaoItens = document.querySelector('.items');
  loading(sessaoItens);
  const itens = await fetchProducts('computador');
  carregado(sessaoItens);
  
  itens.results.forEach((item, index) => {
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

function esvaziaCarrinho() {
  carrinho.innerHTML = '';
  valorItens.innerText = '0.00';
  saveCartItems('cartItems', '');
}

const esvaziar = document.querySelector('.empty-cart');
esvaziar.addEventListener('click', esvaziaCarrinho);

window.onload = () => {
  if (localStorage.getItem('cartItems')) {
    const itenSalvo = getSavedCartItems('cartItems');

    carrinho.innerHTML = itenSalvo;

    const linhas = document.querySelectorAll('li');

    linhas.forEach((li) => {
      const array = li.innerText.split(' ');
      const valor = array[array.length - 1].split('');
      
      li.addEventListener('click', cartItemClickListener);

      valor.shift();
      somaValor(valor.join(''));
    });
  }
};
