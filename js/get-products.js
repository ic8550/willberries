const getProducts = () => {
  const dbURL =
    'https://willberries-9c880-default-rtdb.europe-west1.firebasedatabase.app';

  const links = document.querySelectorAll('.navigation-link');
  // console.log(links);

  const viewAllBtn = document.querySelector('.more');

  const renderProducts = (products) => {
    // console.log(products);
    const productsContainer = document.querySelector('.long-goods-list');

    productsContainer.innerHTML = '';

    products.forEach((product) => {
      const productBlock = document.createElement('div');
      productBlock.classList.add('col-lg-3');
      productBlock.classList.add('col-sm-6');
      const labelClass = product.label ? '' : 'd-none';
      productBlock.innerHTML = `
        <div class="goods-card">
          <span class="label ${labelClass}">${product.label}</span>
          <!-- /.label -->
          <img src="db/${product.img}" alt="image: ${product.name}" class="goods-image">
          <h3 class="goods-title">${product.name}</h3>
          <!-- /.goods-title -->
          <p class="goods-description">${product.description}</p>
          <!-- /.goods-description -->
          <button class="button goods-card-btn add-to-cart" data-id=${product.id}>
            <span class="button-price">$${product.price}</span>
          </button>
          <!-- /.goods-price -->
        </div>
        <!-- /.goods-card -->
      `;
      // console.log(product);
      productsContainer.append(productBlock);
    });
  };

  const getData = (value, category) => {
    fetch(`${dbURL}/goods.json`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const productsArray = data.filter((product) => {
          return category ? product[category] === value : true;
        });
        localStorage.setItem('productsStorage', JSON.stringify(productsArray));
        // console.log(localStorage);
        if (window.location.pathname !== '/products.html') {
          window.location.href = '/products.html';
        } else {
          renderProducts(productsArray);
        }
      });
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const linkValue = link.textContent;
      const category = link.dataset.field;

      getData(linkValue, category);
    });
  });

  if (
    localStorage.getItem('productsStorage') &&
    window.location.pathname === '/products.html'
  ) {
    renderProducts(JSON.parse(localStorage.getItem('productsStorage')));
  }

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (event) => {
      event.preventDefault();
      getData();
    });
  }
};

getProducts();
