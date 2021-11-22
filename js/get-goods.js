const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');
  console.log(links);

  const getData = () => {
    fetch(
      `https://willberries-9c880-default-rtdb.europe-west1.firebasedatabase.app/goods.json/`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        localStorage.setItem(`goods`, JSON.stringify(data));
        // console.log(localStorage);
      });
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      getData();
    });
  });

};;

getGoods();
