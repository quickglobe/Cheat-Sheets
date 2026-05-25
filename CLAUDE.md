# CLAUDE.md

Instructions for Claude Code when working in this repository.

## Project Overview

This is a static site containing self-contained HTML cheatsheets. There is no build step, no framework, and no bundler. Every cheatsheet is a single `.html` file with all CSS inlined.

## File Structure

```
index.html                  # Landing page with links to all cheatsheets
cheatsheets/                # One .html file per cheatsheet
README.md
CLAUDE.md
```

## Cheatsheet Design System

All cheatsheets are built with the `cheatsheet-builder` Claude skill. The skill lives outside this repo (it is a Claude.ai user skill), but its conventions must be respected when editing any cheatsheet:

- CSS is **inlined** in a `<style>` tag — do not extract it to a separate file
- Navigation uses `.nav-btn` buttons — do not use `<a href>` tags in the nav
- Tip box colours carry semantic meaning — do not change them for decoration:
  - `.tip` (teal) → pro tips, best practice
  - `.tip.blue` → informational
  - `.tip.gold` → when-to-use, caveats
  - `.tip.red` → warnings, common mistakes
- Tables must use `.table-wrap` — no horizontal scroll
- Before/after grid (`.ba-grid`) is for improvement/correction only, not neutral comparisons

## Adding a New Cheatsheet

1. Create a new conversation in Claude.ai
2. Use the `cheatsheet-builder` skill to generate the HTML
3. Download the HTML from the Artifacts panel
4. Save it to `cheatsheets/<slug>.html`
5. Add a link to `index.html`
6. Update the table in `README.md`

## Editing Existing Cheatsheets

When asked to modify a cheatsheet, edit the HTML file directly. Keep all CSS inlined. Do not introduce external stylesheets or JavaScript dependencies.

## index.html

The index is intentionally minimal — plain HTML, no styling. Frontend design for the index is out of scope until explicitly requested.

## What Not to Do

- Do not add a build pipeline or package.json
- Do not extract CSS to a shared stylesheet (cheatsheets must remain self-contained)
- Do not add a JS framework
- Do not modify the design system tokens or colour semantics without being asked
