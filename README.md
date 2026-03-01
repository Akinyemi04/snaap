# Snaap Dashboard

A Next.js 16 dashboard UI built with React 19, Tailwind CSS, and MUI components/icons.

## Run the project

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

`http://localhost:3000`

## Useful scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint checks

## Challenges faced

- Recreating the UI from a static image reference (instead of a Figma design file) slowed development.
  Missing design specs such as spacing scale, font sizes, component states, and responsive behavior led to repeated visual guesswork and iteration.
  Small details had to be inferred manually, which increased rework and made consistency checks more time-consuming.
- Balancing a dense dashboard layout across screen sizes while keeping sections readable.
- Optimizing performance for a large, widget-heavy page required extra effort to keep interactions and rendering smooth.
- Implementing drag-and-drop across multiple dashboard sections introduced additional state and ordering complexity.
- Defining accessibility behavior (keyboard flow, focus visibility, and contrast) took extra time because these details were not specified in the image reference.
- Managing many UI/icon dependencies (MUI + Emotion + Tailwind) .
- Keeping the large single-page dashboard maintainable as more widgets and charts are added.
