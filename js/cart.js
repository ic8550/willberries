const cart = function () {
  const cartBtn = document.querySelector('.button-cart');
  const cartContainer = document.getElementById('modal-cart');
  const closeBtn = cartContainer.querySelector('.modal-close');
  const productsContainer = document.querySelector('.long-goods-list');
  const cartForm = document.querySelector('.modal-form');

  const decreaseCardStorageProductQty = (prodId) => {
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
    const newCartStorage = cartStorage.map((item) => {
      if (item.id === prodId && item.qty > 1) {
        item.qty -= 1;
      }
      return item;
    });
    localStorage.setItem('cartStorage', JSON.stringify(newCartStorage));
  };

  const increaseCardStorageProductQty = (prodId) => {
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
    const newCartStorage = cartStorage.map((item) => {
      if (item.id === prodId) {
        item.qty += 1;
      }
      return item;
    });
    localStorage.setItem('cartStorage', JSON.stringify(newCartStorage));
  };

  const removeProductFromCardStorage = (prodId) => {
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
    const newCartStorage = cartStorage.filter((item) => item.id !== prodId);
    localStorage.setItem('cartStorage', JSON.stringify(newCartStorage));
    // renderCartProducts(JSON.parse(localStorage.getItem('cartStorage')));
  };

  const addToCartStorage = (productToAddId) => {
    const products = JSON.parse(localStorage.getItem('productsStorage'));
    const productToAdd = products.find(
      (product) => product.id === productToAddId
    );
    const cartStorageProducts = localStorage.getItem('cartStorage')
      ? JSON.parse(localStorage.getItem('cartStorage'))
      : [];

    const existingProductInCart = cartStorageProducts.find(
      (product) => product.id === productToAdd.id
    );

    if (existingProductInCart) {
      existingProductInCart.qty += 1;
    } else {
      productToAdd.qty = 1;
      cartStorageProducts.push(productToAdd);
    }

    localStorage.setItem('cartStorage', JSON.stringify(cartStorageProducts));
  };

  const renderCartProducts = (cartProducts) => {
    const productTableBlock = document.querySelector('.cart-table__goods');
    productTableBlock.innerHTML = '';

    const cartTotalElem = document.querySelector('.card-table__total');
    let cartTotalPrice = 0;
    cartTotalElem.innerHTML = `$${cartTotalPrice}`;

    cartProducts.forEach((product) => {
      const productTableRow = document.createElement('tr');

      productTableRow.innerHTML = `
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td><button class="cart-btn-minus">-</button></td>
        <td>${product.qty}</td>
        <td><button class="cart-btn-plus">+</button></td>
        <td>$${+product.price * +product.qty}</td>
        <td><button class="cart-btn-delete">x</button></td>
      `;
      productTableBlock.append(productTableRow);

      cartTotalPrice += +product.price * +product.qty;
      cartTotalElem.innerHTML = `$${cartTotalPrice}`;

      productTableRow.addEventListener('click', (event) => {
        if (event.target.classList.contains('cart-btn-minus')) {
          event.stopPropagation();
          decreaseCardStorageProductQty(product.id);
          renderCartProducts(JSON.parse(localStorage.getItem('cartStorage')));
        } else if (event.target.classList.contains('cart-btn-plus')) {
          event.stopPropagation();
          increaseCardStorageProductQty(product.id);
          renderCartProducts(JSON.parse(localStorage.getItem('cartStorage')));
        } else if (event.target.classList.contains('cart-btn-delete')) {
          event.stopPropagation();
          removeProductFromCardStorage(product.id);
          renderCartProducts(JSON.parse(localStorage.getItem('cartStorage')));
        }
      });
    });

    const checkoutButton = document.querySelector('.cart-buy');
    checkoutButton.style.cursor = cartTotalPrice === 0 ? 'default' : 'pointer';
  };

  cartBtn.addEventListener('click', () => {
    const cartStorage = localStorage.getItem('cartStorage');
    const cartStorageProducts = cartStorage ? JSON.parse(cartStorage) : [];
    renderCartProducts(cartStorageProducts);

    cartContainer.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    cartContainer.style.display = '';
  });

  cartContainer.addEventListener('click', (event) => {
    if (!event.target.closest('.modal')) {
      cartContainer.style.display = '';
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      cartContainer.style.display = '';
    }
  });

  if (productsContainer) {
    productsContainer.addEventListener('click', (event) => {
      if (event.target.closest('.add-to-cart')) {
        const buttonAddToCard = event.target.closest('.add-to-cart');
        const productToAddId = buttonAddToCard.dataset.id;
        addToCartStorage(productToAddId);
      }
    });
  }

  const sendFormData = () => {
    const cartStorage = localStorage.getItem('cartStorage');
    const cartStorageProducts = cartStorage ? JSON.parse(cartStorage) : [];
    cartStorageProducts.length &&
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          cart: cartStorageProducts,
          name: cartForm.querySelector(':nth-child(1)').value,
          phone: cartForm.querySelector(':nth-child(2)').value,
        }),
      }).then((response) => {
        const emptyCartStorage = [];
        localStorage.setItem('cartStorage', JSON.stringify(emptyCartStorage));
        renderCartProducts(JSON.parse(localStorage.getItem('cartStorage')));
      });
  };

  cartForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendFormData();
  });
};

cart();
