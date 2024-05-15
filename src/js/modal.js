export default function modal(type) {
  return `
    <div class="modal__card">
      <div class="modal__card-header">
        <h3>${type} Produto</h3>
        <span id="closeModal">&times;</span>
      </div>
      
      <form id="form" action="submit">
        <div class="form__wrapper">
          <div class="form__input">
            <label for="productName">
              Nome:
            </label>
            <input id="productName" name="productName" type="text" minlength="3" required>
          </div>
          <span class="form__error" id="err-productName"></span>

          <div class="form__input">
            <label for="productPrice">
              Preço:
            </label>
            <input id="productPrice" name="productPrice" type="number" step="any" required>
          </div>
          <span class="form__error" id="err-productPrice"></span>

          <div class="form__input">
            <label for="productImageUrl">
              Imagem:
            </label>
            <input id="productImageUrl" name="productImageUrl" type="url" required>
          </div>
          <span class="form__error" id="err-productImageUrl"></span>
        </div>

        <div class="form__action">
          <button class="form__action-button game-font form__action-filled" type="submit">Salvar</button>
          <button id="cleanModal" class="form__action-button game-font form__action-unfilled" type="button">Limpar</button>
        </div>
      </form>
    </div>
  `;
}