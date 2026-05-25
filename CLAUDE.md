# CLAUDE.md

Instructions for Claude Code when working in this repository.

## Project Overview

This is a static site containing HTML cheatsheets. There is no build step, no framework, and no bundler. Each cheatsheet is a single `.html` file that references a shared stylesheet.

## File Structure

```
index.html                      # Landing page with links to all cheatsheets
cheatsheets/                    # One .html file per cheatsheet
cheatsheets/cheatsheet.css      # Shared design system stylesheet
README.md
CLAUDE.md
```

## Cheatsheet Design System

All cheatsheets share the design system defined in `cheatsheets/cheatsheet.css`. The stylesheet is the single source of truth for tokens, layout, and component styles.

All cheatsheets are built with the `cheatsheet-builder` Claude skill. The skill lives outside this repo (it is a Claude.ai user skill), but its conventions must be respected when editing any cheatsheet:

- Each cheatsheet links to `cheatsheet.css` via `<link rel="stylesheet" href="cheatsheet.css">` — do not inline CSS or extract it to a separate per-cheatsheet file
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
4. Strip the `<style>` block from the downloaded file
5. Add `<link rel="stylesheet" href="cheatsheet.css">` in its place (alongside the Google Fonts link)
6. Save it to `cheatsheets/<slug>.html`
7. Add a link to `index.html`
8. Update the table in `README.md`

## Editing the Design System

To change styles globally (tokens, colours, layout, component rules), edit `cheatsheets/cheatsheet.css` directly. Changes apply to all cheatsheets immediately — no per-file edits needed.

## Editing Existing Cheatsheets

When asked to modify a cheatsheet's content, edit the HTML file directly. Do not add per-file `<style>` tags or inline styles unless overriding something that genuinely only applies to that one cheatsheet. Do not introduce JavaScript dependencies.

## index.html

The index is intentionally minimal — plain HTML, no styling. Frontend design for the index is out of scope until explicitly requested.

## What Not to Do

- Do not add a build pipeline or package.json
- Do not inline CSS into individual cheatsheet files — all shared styles belong in `cheatsheet.css`
- Do not add a JS framework
- Do not modify the design system tokens or colour semantics without being asked
