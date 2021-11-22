const search = function () {
  const dbLink = `https://willberries-9c880-default-rtdb.europe-west1.firebasedatabase.app`;

  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');

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

  const getData = (value) => {
    console.log(value);
    fetch(`${dbLink}/goods.json`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const goodsArray = data.filter((item) => {
          const searchMatch = item.name
            .toLowerCase()
            .includes(value.toLowerCase());
          console.log(searchMatch);
          return searchMatch;
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

  searchBtn.addEventListener('click', (event) => {
    // console.log(input.value);
    getData(input.value);
  });
};

search();
