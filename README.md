# Pagefolio

A modern web app that helps people create beautiful personal websites without touching code. Built for a hackathon project.

## What is this?

Pagefolio lets users pick from different templates and customize them to make their own portfolio/resume websites. The idea came from seeing how many people struggle with making a simple personal website - they either need to learn code or pay for expensive website builders.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives + custom components
- **Backend**: Supabase (auth + database)
- **Build Tool**: Vite
- **Routing**: React Router v6

## Getting Started

### Prerequisites
You'll need Node.js installed. I'm using v18 but anything recent should work.

### Installation

```bash
#Download code
download the zip code from github then extract it and go to the folder then--

# install dependencies (this might take a minute)
npm install

# start dev server
npm run dev
```

The app should open at `http://localhost:8080`

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

You'll need to set up a Supabase project for the backend. Check `supabase/migrations/` for the database schema.

## Project Structure

```
src/
├── components/
│   ├── landing/        # homepage sections
│   ├── builder/        # template builder UI
│   ├── templates/      # different template renderers
│   ├── effects/        # animation components
│   └── ui/             # reusable UI components
├── pages/              # main routes
├── lib/                # utilities and helpers
└── integrations/       # third-party integrations
```

## Features

- 40+ templates across different categories (minimal, bold, creative, etc.)
- Visual editor for Pro users
- Form-based content input
- Template preview before publishing
- Custom domains support
- Credit system for free users
- Mobile-responsive designs

## Building for Production

```bash
npm run build
```

Output goes to `dist/` folder.

## Known Issues

- Template preview can be slow on older devices
- Some animations might not work on Safari < 15
- Image uploads need to be handled better

## Contributing

This is a hackathon project so the code might be messy in places. Feel free to fork and improve!

## License

MIT - do whatever you want with it

---

Made with ☕ for a flavortown.
