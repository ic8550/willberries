const smoothScroll = () => {
  const links = document.querySelectorAll(`.scroll-link`);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  };

  links.forEach((link) => {
    link.addEventListener(`click`, scrollToTop);
  });
};

smoothScroll();
