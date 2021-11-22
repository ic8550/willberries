const getGoods = () => {
  const dbLink = `https://willberries-9c880-default-rtdb.europe-west1.firebasedatabase.app`;

  const links = document.querySelectorAll('.navigation-link');
  // console.log(links);

  const viewAllBtn = document.querySelector('.more');

  const renderGoods = (goods) => {
    // console.log(goods);
    const goodsContainer = document.querySelector('.long-goods-list');

    goodsContainer.innerHTML = ``;

    goods.forEach((good) => {
      const goodBlock = document.createElement(`div`);
      goodBlock.classList.add(`col-lg-3`);
      goodBlock.classList.add(`col-sm-6`);
      goodBlock.innerHTML = `
          <div class="goods-card">
            <span class="label ${good.label ? '' : 'd-none'}">${
        good.label
      }</span>
            <!-- /.label -->
            <img src="db/${good.img}" alt="image: ${
        good.name
      }" class="goods-image">
            <h3 class="goods-title">${good.name}</h3>
            <!-- /.goods-title -->
            <p class="goods-description">${good.description}</p>
            <!-- /.goods-description -->
            <button class="button goods-card-btn add-to-cart" data-id=${
              good.id
            }>
              <span class="button-price">$${good.price}</span>
            </button>
            <!-- /.goods-price -->
          </div>
          <!-- /.goods-card -->
        `;
      // console.log(good);
      goodsContainer.append(goodBlock);
    });
  };

  const getData = (value, category) => {
    fetch(`${dbLink}/goods.json`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const goodsArray = data.filter((item) => {
          return category ? item[category] === value : true;
        });
        localStorage.setItem(`goods`, JSON.stringify(goodsArray));
        // console.log(localStorage);
        if (window.location.pathname !== `/goods.html`) {
          window.location.href = `/goods.html`;
        } else {
          renderGoods(goodsArray);
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
    localStorage.getItem(`goods`) &&
    window.location.pathname === `/goods.html`
  ) {
    renderGoods(JSON.parse(localStorage.getItem(`goods`)));
  }

  viewAllBtn.addEventListener('click', (event) => {
    event.preventDefault();
    getData();
  });
};

getGoods();
