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