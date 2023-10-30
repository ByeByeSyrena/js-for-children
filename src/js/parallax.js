const leaf = document.getElementById('leaf');
const hill1 = document.getElementById('hill1');
const hill4 = document.getElementById('hill4');
const hill5 = document.getElementById('hill5');
const headlinePlayGames =
  document.getElementsByClassName('headlinePlayGames')[0];

const parallaxSection = document.querySelector('.parallax');
const gamesSection = document.querySelector('.section-with-games');

let isScrolling = false;

window.addEventListener('scroll', () => {
  const value = window.scrollY;

  headlinePlayGames.style.marginTop = value * 2.5 + 'px';
  leaf.style.top = value * -1.5 + 'px';
  leaf.style.left = value * 1.5 + 'px';
  hill5.style.left = value * 1.5 + 'px';
  hill4.style.left = value * -1.5 + 'px';
  hill1.style.top = value * 1 + 'px';

  if (!isScrolling) {
    isScrolling = true;

    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const parallaxHeight = parallaxSection.offsetHeight;
      const gamesHeight = gamesSection.offsetHeight;

      const maxScrollHeight = parallaxHeight + gamesHeight - window.innerHeight;

      if (scrollY < 0) {
        window.scrollTo(0, 0);
      } else if (scrollY > maxScrollHeight) {
        window.scrollTo(0, maxScrollHeight);
      }

      isScrolling = false;
    });
  }
});
