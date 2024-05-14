export default function card(id, product, price, imageUrl) {
  return `
    <div class="card">
      <div class="card__image">
        <img src="${imageUrl}" alt="Imagem ${product}">
        <span>${id}</span>
      </div>
      <div class="card__info">
        <h2 class="card__info-name">${product}</h2>

        <div class="card__info-wrapper">
          <span class="card__info-price game-font">R$${price}</span>
          <button class="card__btn" type="button">
            <img src="./src/assets/image/trash.svg" alt="Lixeira">
          </button>
        </div>
      </div>
    </div>
  `;
}