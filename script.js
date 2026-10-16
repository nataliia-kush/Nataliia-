const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();


// The three supplied portraits rotate every five seconds.
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const slides = Array.from(document.querySelectorAll('.about-slide'));
  let active = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
  let timer;
  const restart = () => {
    window.clearInterval(timer);
    if (slides.length < 2 || motion.matches || document.hidden) return;
    timer = window.setInterval(() => {
      slides[active].classList.remove('is-active');
      active = (active + 1) % slides.length;
      slides[active].classList.add('is-active');
    }, 5000);
  };
  restart();
  document.addEventListener('visibilitychange', restart);
  motion.addEventListener('change', restart);

  const video = document.querySelector('.hero-video');
  const media = document.querySelector('.hero-media');
  const button = document.querySelector('.hero-film-toggle');
  if (!video || !media || !button) return;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = false;
  let photoTimer;
  const play = () => {
    window.clearTimeout(photoTimer);
    video.play().catch(() => { button.hidden = false; });
  };
  const showPhoto = () => {
    window.clearTimeout(photoTimer);
    video.pause();
    media.classList.remove('is-playing');
    video.currentTime = 0;
    button.hidden = true;
    if (!motion.matches) photoTimer = window.setTimeout(play, 60000);
    else button.hidden = false;
  };
  video.addEventListener('playing', () => {
    media.classList.add('is-playing');
    button.hidden = true;
  });
  video.addEventListener('ended', showPhoto);
  video.addEventListener('error', () => {
    window.clearTimeout(photoTimer);
    media.classList.remove('is-playing');
    button.hidden = false;
  });
  button.addEventListener('click', play);
  motion.addEventListener('change', showPhoto);
  showPhoto();
})();
