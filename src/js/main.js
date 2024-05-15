import { API } from './api.js';
import card from './card.js';
import { check } from './error.js';

// GET - Carrega produtos do db
await createCardList();

async function createCardList() {
  const productList = document.getElementById('productList');

  try {
    const products = await API.getAllProducts();

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

// Limpar Modal
function cleanModal() {
  const errNewName = document.getElementById('err-productName');
  const errNewPrice = document.getElementById('err-productPrice');
  const errNewImage = document.getElementById('err-productImageUrl');

  nameCreate.value = '';
  priceCreate.value = '';
  imageCreate.value = '';
  errNewName.textContent = '';
  errNewPrice.textContent = '';
  errNewImage.textContent = '';
}

// Modal - Adicionar Produto
const modalCreate = document.getElementById('modalToCreate');
const btnModalCreate = document.getElementById('openModalToCreate');
const closeModalCreate = document.getElementById('closeModalToCreate');

const nameCreate = document.getElementById('productName');
const priceCreate = document.getElementById('productPrice');
const imageCreate = document.getElementById('productImageUrl');

const submitNewProduct = document.getElementById('formNewProd');

btnModalCreate.onclick = function () {
  modalCreate.style.display = 'block';
}

closeModalCreate.onclick = function () {
  modalCreate.style.display = 'none';
  cleanModal();
}

// Valida input - Adicionar Produto
nameCreate.addEventListener('input', (ev) => {
  check(ev.target);
});

priceCreate.addEventListener('input', (ev) => {
  check(ev.target);
});

imageCreate.addEventListener('input', (ev) => {
  check(ev.target);
});

// POST - Cria novo produto no db
submitNewProduct.addEventListener('submit', async (ev) => {
  ev.preventDefault();

  const isNameValid = check(nameCreate);
  const isPriceValid = check(priceCreate);
  const isUrlValid = check(imageCreate);

  try {
    if (isNameValid && isPriceValid && isUrlValid) {
      await API.createProduct(nameCreate.value, priceCreate.value, imageCreate.value);

      window.location.reload();
    } else {
      console.error('Erro no preenchimento do formulário.');
    }
  } catch (error) {
    console.error(error);
  }
});

// DELETE - Deleta produto no db
async function removeProduct(el) {
  const id = el.getAttribute('data-id');

  try {
    await API.deleteProduct(id);

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

// Garante acessibilidade globalmente
window.cleanModal = cleanModal;
window.removeProduct = removeProduct;