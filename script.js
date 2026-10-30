const sections = [...document.querySelectorAll('main > section')];
const links = [...document.querySelectorAll('nav a[href^="#"]')];
const sectionFor = index => index === 0 ? '#cover' : index === 1 ? '#purpose' : index < 18 ? '#logo' : index < 21 ? '#color-intro' : '#typography-intro';
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const current = sectionFor(sections.indexOf(visible.target));
  links.forEach(link => { const active = link.getAttribute('href') === current; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
}, { threshold: [0.3, 0.6] });
sections.forEach(section => observer.observe(section));
