function showTab(event, id) {
  const tabs = event.target.closest('.tabs');
  const section = tabs.parentElement;
  tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  section.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(id).classList.add('active');
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const sections = document.querySelectorAll('section[id]');
const navBtns = document.querySelectorAll('nav .nav-btn');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navBtns.forEach(b => b.classList.remove('active'));
      navBtns.forEach(b => {
        if (b.getAttribute('onclick').includes("'" + entry.target.id + "'"))
          b.classList.add('active');
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sections.forEach(s => navObserver.observe(s));

if (!window.matchMedia('(hover: hover)').matches) {
  const cards = document.querySelectorAll('.card');
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { e.target.dataset.ratio = e.isIntersecting ? e.intersectionRatio : 0; });
    let best = null, bestR = 0;
    cards.forEach(c => { const r = parseFloat(c.dataset.ratio) || 0; if (r > bestR) { bestR = r; best = c; } });
    cards.forEach(c => c.classList.toggle('in-view', c === best && bestR > 0));
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  cards.forEach(c => cardObserver.observe(c));
}
