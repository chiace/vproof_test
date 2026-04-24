# VisaProof — Landing Page (Ideathon Prototype)

**VisaProof** is a concept prototype for a Solana-powered verification layer that helps people **reuse document trust** across immigration, hiring, and education—without putting sensitive files on-chain.

> **Prepare once. Verify once. Reuse trust.**

## Live demo

- **Vercel**: *(add your deployed URL here)*

## What’s in this repo

A polished, one-page landing site with an interactive “prototype” section:

- **Interactive demo**: tabs, modal preview, proof copy-to-clipboard, micro-interactions  
- **High-end UI**: Tailwind “glass” styling, motion/reveal animations, subtle 3D tilt + glare
- **Fast build**: Vite + React + TypeScript

## Tech stack

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**

## Getting started (local)

### Requirements

- Node.js 18+ (recommended)

### Install & run

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

The production build outputs to `dist/`.

## Deploy

### Vercel (recommended)

1. Import the GitHub repository on Vercel
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

Use a Vite Pages workflow that deploys the `dist/` output.

## Project structure

```text
src/
  VisaProofLanding.tsx   # Main one-page landing component
  main.tsx               # React entry
  index.css              # Tailwind + global styles
  assets/                # SVG visuals used in the UI
```

## Notes

- This is a **concept prototype** (not a production verification system).
- The UI messaging explicitly avoids token/speculation framing.

## License

MIT (or replace with your preferred license).
