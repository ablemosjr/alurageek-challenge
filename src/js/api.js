const API_URL = 'https://663b8800fee6744a6ea1fc8f.mockapi.io';

async function getAllProducts() {
  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();

  return products;
}

async function createProduct(product, price, imageUrl) {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: product,
      price: price,
      imageUrl: imageUrl
    })
  });

  if (!response.ok) {
    throw new Error('Não foi possível criar o produto.');
  }

  const createdProduct = await response.json();
  return createdProduct;
}

async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Não foi possível excluir o produto.');
  }

  return response.json();
}

async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  const product = await response.json();

  return product;
}

async function updateProduct(id, product, price, imageUrl) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: product,
      price: price,
      imageUrl: imageUrl
    })
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar o produto.');
  }

  const updatedProduct = await response.json();
  return updatedProduct;
}

export const API = {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct
}