const smoothScroll = () => {
  const links = document.querySelectorAll(`.scroll-link`);
  console.log(links);

  const handleScrollTopClick = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  };

  links.forEach((link) => {
    console.log(link);
    link.addEventListener(`click`, handleScrollTopClick);
  });
};

smoothScroll();
