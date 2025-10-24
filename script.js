const animatedElements = document.querySelectorAll('[data-animate]');
const backToTopButton = document.querySelector('.floating-button--top');

const toggleBackToTopVisibility = () => {
  if (!backToTopButton) return;
  const shouldShow = window.scrollY > window.innerHeight * 0.15;
  backToTopButton.classList.toggle('is-visible', shouldShow);
};
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.2
  }
);

animatedElements.forEach(element => observer.observe(element));

let scrollTimeout;
window.addEventListener('scroll', () => {
  document.body.classList.add('scrolling');
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    document.body.classList.remove('scrolling');
  }, 200);
  toggleBackToTopVisibility();
});

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  toggleBackToTopVisibility();
});
