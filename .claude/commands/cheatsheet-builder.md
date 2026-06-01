# Cheatsheet Builder

Builds a new cheatsheet HTML file and wires it into the site. Use when the user asks to create a new cheatsheet, reference guide, or quick-reference page.

## Environment

- All cheatsheets live in `cheatsheets/<slug>.html`
- Styles come from the shared `cheatsheets/cheatsheet.css` — **never inline CSS**
- After creating the file, add a card to the `.card-grid` in `index.html`

## Workflow

1. **Clarify** topic, audience, and sections if not already specified. Confirm the section list before writing.
2. **Read** `cheatsheets/cheatsheet.css` to understand available classes; read one existing cheatsheet (e.g. `cheatsheets/bash.html`) for the exact page shell.
3. **Write** `cheatsheets/<slug>.html` using the page shell and component patterns below.
4. **Update** `index.html` — add an `a.sheet-card` block to the `.card-grid` (before the closing `</div>`).
5. Report the two files changed and the slug.

---

## Page Shell

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TOPIC Cheat Sheet</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23d63555'/%3E%3Cpath d='M8 8l10 8-10 8' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3Cline x1='20' y1='24' x2='26' y2='24' stroke='white' stroke-width='3.5' stroke-linecap='round'/%3E%3C/svg%3E">
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="cheatsheet.css">
</head>
<body>

<nav>
  <a href="../index.html" class="logo" style="text-decoration:none;">TOPIC</a>
  <!-- one nav-btn per section -->
  <button class="nav-btn" onclick="scrollToSection('SECTION_ID')">LABEL</button>
</nav>

<div class="container">
  <div class="hero">
    <h1>TOPIC Cheat Sheet</h1>
    <p>One-sentence description of what this covers.</p>
  </div>

  <!-- sections go here -->

</div>

<footer>
  TOPIC Cheat Sheet · Built with Claude · MONTH YEAR
</footer>

<script>
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
      cards.forEach(c => { const r = parseFloat(c.dataset.ratio)||0; if (r > bestR) { bestR = r; best = c; } });
      cards.forEach(c => c.classList.toggle('in-view', c === best && bestR > 0));
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    cards.forEach(c => cardObserver.observe(c));
  }
</script>
</body>
</html>
```

---

## Section Shell

Each section follows this pattern. Number sections 01, 02, 03 … in the label.

```html
<section id="SECTION_ID">
  <div class="section-label">Section 01</div>
  <h2>Section Title</h2>
  <p>One-sentence intro.</p>

  <!-- components here -->

</section>
```

---

## Components

### Table

Always wrap in `.table-wrap` — no horizontal scroll.

```html
<div class="table-wrap">
  <table>
    <thead>
      <tr><th>Col A</th><th>Col B</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>…</td><td>…</td><td>…</td></tr>
    </tbody>
  </table>
</div>
```

### Card Grid

Use for numbered gotchas, checklists, or parallel concepts.

```html
<div class="card-grid">
  <div class="card">
    <div class="num">1</div>
    <strong>Card Title</strong>
    <span>Card body text.</span>
  </div>
</div>
```

### Tip Boxes — colour = semantic meaning, non-negotiable

```html
<!-- Teal: pro tips, best practice -->
<div class="tip">
  <div class="tip-label">Pro Tip</div>
  Body text.
</div>

<!-- Blue: informational, "remember this" -->
<div class="tip blue">
  <div class="tip-label">Remember</div>
  Body text.
</div>

<!-- Gold: when to use, timing, caveats -->
<div class="tip gold">
  <div class="tip-label">When to Use</div>
  Body text.
</div>

<!-- Red: warnings, common mistakes -->
<div class="tip red">
  <div class="tip-label">Watch Out</div>
  Body text.
</div>
```

### Before / After Grid

For improvement or correction only — bad→good, wrong→right. Do NOT use for neutral comparisons (use a table instead).

```html
<div class="ba-grid">
  <div class="ba-box">
    <div class="ba-tag">Before</div>
    <blockquote>Weak or incorrect version.</blockquote>
  </div>
  <div class="ba-box after">
    <div class="ba-tag">After</div>
    <blockquote>Improved version.</blockquote>
  </div>
</div>
```

### Styled List

```html
<ul class="styled">
  <li>Item one</li>
  <li>Item two</li>
</ul>
```

### Inline Code

Use `<code>` inside prose and table cells. Use fenced `<pre><code>` for multi-line blocks.

---

## index.html Card

After writing the cheatsheet, add this block inside `.card-grid` in `index.html` (before the closing `</div>`):

```html
    <a href="cheatsheets/SLUG.html" class="sheet-card">
      <div class="card">
        <div class="tag">TAG</div>
        <h3>TITLE</h3>
        <p>One-sentence description.</p>
      </div>
    </a>
```

- **TAG**: short category label in title case (e.g. `AI`, `CLI`, `Networking`, `Git`)
- **TITLE**: the cheatsheet's display name
- **description**: one sentence, plain text, no trailing period needed

---

## Rules

- Link stylesheet as `<link rel="stylesheet" href="cheatsheet.css">` — do not inline any CSS
- Nav uses `.nav-btn` buttons — no `<a href>` tags in the nav (except the logo back-link)
- Tip colours carry semantic meaning — never swap them for decoration
- Tables always use `.table-wrap`
- Before/after grid is for genuine improvement/correction only
- No JavaScript beyond the required scroll/observer block
- No per-file `<style>` tags unless the override is truly page-specific and cannot go in `cheatsheet.css`
