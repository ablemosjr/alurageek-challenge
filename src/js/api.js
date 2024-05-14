const API_URL = 'https://663b8800fee6744a6ea1fc8f.mockapi.io';

async function getAllProducts() {
  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();

  return products;
}

export const API = {
  getAllProducts
}