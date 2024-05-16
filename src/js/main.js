import { API } from './api.js';
import { check } from './error.js';
import card from './card.js';
import modal from './modal.js';

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

const modalCreate = document.getElementById('openModalToCreate');

modalCreate.addEventListener('click', () => {
  modalManipulation('Adicionar');
});

function modalUpdate(id) {
  modalManipulation('Alterar', id);
}

async function modalManipulation(type, id) {
  const modalSection = document.getElementById('modal');
  modalSection.innerHTML = modal(type);
  modalSection.style.display = 'block';

  const closeModal = document.getElementById('closeModal');
  closeModal.onclick = function () {
    modalSection.style.display = 'none';
    clean();
  }

  const name = document.getElementById('productName');
  const price = document.getElementById('productPrice');
  const imageUrl = document.getElementById('productImageUrl');

  const cleanModal = document.getElementById('cleanModal');
  cleanModal.addEventListener('click', () => {
    clean();
  });
  
  function clean() {
    const errName = document.getElementById('err-productName');
    const errPrice = document.getElementById('err-productPrice');
    const errImageUrl = document.getElementById('err-productImageUrl');

    name.value = '';
    price.value = '';
    imageUrl.value = '';

    errName.textContent = '';
    errPrice.textContent = '';
    errImageUrl.textContent = '';
  }

  name.addEventListener('input', (ev) => {
    check(ev.target);
  });

  price.addEventListener('input', (ev) => {
    check(ev.target);
  });

  imageUrl.addEventListener('input', (ev) => {
    check(ev.target);
  });

  if (type === 'Alterar') {
    const prod = await API.getProductById(id);
    
    name.value = prod.name;
    price.value = prod.price;
    imageUrl.value = prod.imageUrl;
  }

  const formSubmit = document.getElementById('form');
  formSubmit.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const isNameValid = check(name);
    const isPriceValid = check(price);
    const isUrlValid = check(imageUrl);
// POST - Adicionar produto no db
    if (type === 'Adicionar') {
      try {
        if (isNameValid && isPriceValid && isUrlValid) {
          await API.createProduct(name.value, price.value, imageUrl.value);

          window.location.reload();
        } else {
          console.error('Erro no preenchimento do formulário de adicionar produto.');
        }
      } catch (error) {
        console.error(error);
      }
    }
// PUT - Alterar produto no db
    if (type === 'Alterar') {
      try {
        if (isNameValid && isPriceValid && isUrlValid) {
          await API.updateProduct(id, name.value, price.value, imageUrl.value);

          window.location.reload();
        } else {
          console.error('Erro no preenchimento do formulário de atualizar produto.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
}

// Garante acessibilidade globalmente
window.removeProduct = removeProduct;
window.modalUpdate = modalUpdate;