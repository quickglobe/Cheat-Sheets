# Cheatsheets

A collection of interactive HTML cheatsheets on topics I'm exploring — built using Claude with a custom `cheatsheet-builder` skill.

Each cheatsheet is a self-contained HTML file with a fixed nav, smooth scroll, responsive layout, and automatic dark mode.

## Contents

| File | Topic |
|------|-------|
| [AI Prompting Skills](cheatsheets/prompting.html) | Prompt engineering techniques for Claude and other LLMs |
| [Agentic Prompting](cheatsheets/agentic-prompting.html) | Prompting for agentic and API environments |
| [LLM Reasoning vs Non-Reasoning](cheatsheets/llm-reasoning.html) | When to use reasoning models vs larger non-reasoning models |
| [Bash Scripting Basics](cheatsheets/bash.html) | Shell scripting fundamentals for a Windows-background user |
| [Tailscale vs Traditional VPN](cheatsheets/tailscale-vpn.html) | How VPNs and Tailscale work, and when to use each |

## Design System

All cheatsheets share a single stylesheet at `cheatsheets/cheatsheet.css`. Edit that file to change styles globally.

- **Fonts:** DM Serif Display (headings), DM Sans (body), JetBrains Mono (code)
- **Colour semantics:** Red = accent/brand, Teal = tips/best practice, Blue = info, Gold = caveats/timing
- **Dark mode:** automatic via `prefers-color-scheme`
- **Layout:** fixed nav, hero, sections, footer; collapses to single column on mobile

## Development

This repository is managed with [Claude Code](https://claude.ai/code). See `CLAUDE.md` for instructions.
