# Claude Artifact Viewer - Template

A modern web application for viewing and interacting with Claude-generated artifacts. This project provides an automatic navigation system for artifacts uploaded to the `src/artifacts` folder, making it easy to showcase and interact with AI-generated content.

## Features

- **Automatic Navigation**: Components added to the `src/artifacts` folder are automatically included in the navigation
- **Modern UI**: Built with React, TypeScript, Tailwind CSS, and shadcn/ui components
- **Data Visualization**: Integration with Recharts for beautiful data visualizations
- **Responsive Design**: Fully responsive layout that works well on all devices

## Tech Stack

- **Frontend Framework**: React 18
- **Router**: React Router 7
- **Runtime**: Bun
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (with Radix UI primitives)
- **Charting**: Recharts
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Bun (latest version)
- Node.js (v18 or higher recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd claude-artifact-viewer
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

4. Build for production:
   ```bash
   bun run build
   ```

## Authentication

The application includes HTTP Basic Authentication via Cloudflare Pages Functions middleware. To configure authentication:

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Modify the username and password in the `.env` file (defaults are `claude`/`claude2025`)

The authentication middleware in `functions/_middleware.js` validates these credentials before allowing access to the application.

## Project Structure

```
claude-artifact-viewer/
├── public/           # Static assets
├── src/
│   ├── artifacts/    # Claude-generated artifacts (add your components here)
│   ├── components/   # Shared React components
│   ├── lib/          # Utility functions and shared logic
│   ├── index.css     # Global CSS
│   └── main.tsx      # Application entry point
├── package.json      # Project dependencies and scripts
├── tailwind.config.mjs # Tailwind CSS configuration
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Adding New Artifacts

To add a new artifact:

1. Create a new `.tsx` file in the `src/artifacts` directory
2. The file will automatically be added to the navigation
3. The file name will be converted to a human-readable format for the navigation menu

## Navigation System

The application provides:

- A dropdown menu for quick access to all artifacts
- Previous/Next buttons for sequential navigation
- A homepage that lists all available artifacts

## License

MIT license - see [LICENSE](LICENSE) for details

## Acknowledgments

- [CLaude Artifact Runner](https://github.com/claudio-silva/claude-artifact-runner): The original project which this is based on with some improvements and refactoring
- [shadcn/ui](https://ui.shadcn.com/) for providing a modern and accessible UI component library
- [Recharts](https://recharts.org/) for the beautiful data visualizations
- [Vite](https://vitejs.dev/) for the build tool
- [React Router](https://reactrouter.com/) for the routing system
