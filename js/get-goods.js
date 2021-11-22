const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');
  console.log(links);

  const getData = () => {
    fetch(
      `https://willberries-9c880-default-rtdb.europe-west1.firebasedatabase.app/goods.json/`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      getData();
    });
  });

  window.localStorage.setItem(`goods`, JSON.stringify([1, 2, 3, 4, 5]));

  const goods = localStorage.goods;
  console.log(goods);

  console.log(localStorage);

  localStorage.removeItem(`goods`);

  console.log(localStorage);
};

getGoods();
