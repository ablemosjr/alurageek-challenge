const errorsType = [
  'valueMissing',
  'patternMismatch',
  'tooShort',
  'typeMismatch',
  'badInput'
]

const messages = {
  productName: {
    valueMissing: 'O campo nome não pode estar vazio.',
    tooShort: 'Por favor, preencha um nome válido.'
  },
  updateProductName: {
    valueMissing: 'O campo nome não pode estar vazio.',
    tooShort: 'Por favor, preencha um nome válido.'
  },
  productPrice: {
    valueMissing: 'O campo preço não pode estar vazio.',
    patternMismatch: 'Valor deve ser preenchido com as casas decimais (0,00)'
  },
  updateProductPrice: {
    valueMissing: 'O campo preço não pode estar vazio.',
    badInput: 'Valor deve ser preenchido com as casas decimais (0,00)'
  },
  productImageUrl: {
    valueMissing: 'O campo de URL da imagem não pode estar vazio.',
    typeMismatch: `URL inválida, deve ter protocolo HTTP ou HTTPS.`
  },
  updateProductImageUrl: {
    valueMissing: 'O campo de URL da imagem não pode estar vazio.',
    typeMismatch: `URL inválida, deve ter protocolo HTTP ou HTTPS.`
  }
}

export function check(field) {
  let message = '';
  field.setCustomValidity('');

  errorsType.forEach(err => {
    if (field.validity[err]) {
      message = messages[field.name][err];
    }
  });

  if (field.name === 'productPrice' && !isValidCurrencyFormat(field.value)) {
    message = messages[field.name].patternMismatch;
  }

  const errorMessage = document.querySelector(`#err-${field.name}`);
  const isValid = field.checkValidity();

  errorMessage.textContent = isValid ? '' : message;

  return isValid;
}

function isValidCurrencyFormat(value) {
  const pattern = /^\d+(\.\d{1,2})?$/;
  return pattern.test(value);
}