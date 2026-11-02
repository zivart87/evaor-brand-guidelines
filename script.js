const sections = [...document.querySelectorAll('main > section')];
const links = [...document.querySelectorAll('nav a[href^="#"]')];
const starts = links.map(link => ({link, index: sections.indexOf(document.querySelector(link.getAttribute('href')))})).filter(item => item.index >= 0);
let scheduled = false;
function updateNavigation() {
  scheduled = false;
  let index = 0;
  sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= innerHeight * 0.35) index = i; });
  const current = starts.filter(item => item.index <= index).at(-1)?.link;
  links.forEach(link => {
    const active = link === current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
function scheduleNavigation() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}
window.addEventListener('scroll', scheduleNavigation, {passive:true});
window.addEventListener('resize', scheduleNavigation);
window.addEventListener('hashchange', scheduleNavigation);
window.addEventListener('load', scheduleNavigation);
updateNavigation();
