const cart = function () {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = cart.querySelector('.modal-close');

  cartBtn.addEventListener('click', () => {
    cart.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    cart.style.display = '';
  });

  cart.addEventListener('click', (event) => {
    // if (event.target.classList.contains('overlay')) {
    //   cart.style.display = '';
    // }
    if (!event.target.closest(`.modal`)) {
      cart.style.display = '';
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === `Escape`) {
      cart.style.display = '';
    }
  });
};

cart();
