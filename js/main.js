// Проверяет форму: подсвечивает ошибочные поля и возвращает true, если всё заполнено верно.
function validateForm(form) {
  const formElements = Array.from(form.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  if (form.checkValidity()) {
    return true;
  }

  formElements.forEach((element) => {
    if (element.willValidate && !element.checkValidity()) {
      element.setAttribute('aria-invalid', 'true');
    }
  });

  form.reportValidity();
  return false;
}

// Модальное окно с формой заявки (главная страница).
const orderDialog = document.getElementById('order-dialog');

if (orderDialog) {
  const orderButtons = document.querySelectorAll('.product-card__button[data-product]');
  const closeDialogButton = document.getElementById('close-order-dialog');
  const selectedProductInput = document.getElementById('selected-product');
  const orderForm = document.getElementById('order-form');
  const successMessage = document.getElementById('success-message');

  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedProductInput.value = button.dataset.product;
      successMessage.hidden = true;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm(orderForm)) {
      return;
    }

    successMessage.hidden = false;
    orderForm.reset();
    orderDialog.close();
  });
}

// Форма на отдельной странице заявки (order.html).
const orderPageForm = document.getElementById('order-page-form');

if (orderPageForm) {
  const pageSuccessMessage = document.getElementById('page-success-message');

  orderPageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm(orderPageForm)) {
      return;
    }

    // Сначала очищаем форму (это скрывает старое сообщение), затем показываем новое.
    orderPageForm.reset();
    pageSuccessMessage.hidden = false;
  });

  orderPageForm.addEventListener('reset', () => {
    pageSuccessMessage.hidden = true;
  });
}
