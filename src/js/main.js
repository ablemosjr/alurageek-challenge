import { API } from './api.js';
import card from './card.js';

await createCardList();

async function createCardList() {
  const productList = document.getElementById('productList');

  try {
    const products = await API.getAllProducts();
    console.log(products);
    if (products.length === 0) {
      productList.innerHTML = `
        <h2 class="productList__empty">
          Nenhum produto encontrado.
        </h2>
      `;
    } else {
      products.forEach(prod => 
        productList.innerHTML += card(prod.id, prod.name, prod.price, prod.imageUrl)
      );
    }
  } catch (error) {
    productList.innerHTML = `
      <h2 class="productList__empty">
        Nenhum produto encontrado.
      </h2>
    `;
  }
}


// Modal - Adicionar Produto
const modalCreate = document.getElementById('modalToCreate');
const btnModalCreate = document.getElementById('openModalToCreate');
const closeModalCreate = document.getElementById('closeModalToCreate');

btnModalCreate.onclick = function () {
  modalCreate.style.display = 'block';
}

closeModalCreate.onclick = function () {
  modalCreate.style.display = 'none';
}