const search = function () {
  const dbURL =
    'https://willberries-9c880-default-rtdb.europe-west1.firebasedatabase.app';

  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');

  const renderProducts = (products) => {
    // console.log(products);
    const productsContainer = document.querySelector('.long-goods-list');

    productsContainer.innerHTML = '';

    products.forEach((product) => {
      const productBlock = document.createElement('div');
      productBlock.classList.add('col-lg-3');
      productBlock.classList.add('col-sm-6');
      productBlock.innerHTML = `
          <div class="goods-card">
            <span class="label ${product.label ? '' : 'd-none'}">${
        product.label
      }</span>
            <!-- /.label -->
            <img src="db/${product.img}" alt="image: ${
        product.name
      }" class="goods-image">
            <h3 class="goods-title">${product.name}</h3>
            <!-- /.goods-title -->
            <p class="goods-description">${product.description}</p>
            <!-- /.goods-description -->
            <button class="button goods-card-btn add-to-cart" data-id=${
              product.id
            }>
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

  const getData = (value) => {
    console.log(value);
    fetch(`${dbURL}/goods.json`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const productsArray = data.filter((product) => {
          const searchMatch = product.name
            .toLowerCase()
            .includes(value.toLowerCase());
          console.log(searchMatch);
          return searchMatch;
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

  searchBtn.addEventListener('click', (event) => {
    // console.log(input.value);
    getData(input.value);
  });
};

search();
