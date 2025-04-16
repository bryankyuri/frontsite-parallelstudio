# React Vite PWA

This project is a React application built with Vite, designed as a Progressive Web App (PWA). It utilizes React Query for data fetching, Tailwind CSS for styling, and SCSS modules for component-specific styles.

## Project Structure

```
react-vite-pwa
├── public
│   └── vite.svg          # Logo or icon for the application
├── src
│   ├── api
│   │   └── index.js      # API interaction functions
│   ├── assets             # Static assets (images, fonts, etc.)
│   ├── components
│   │   └── App.jsx       # Main application component
│   ├── hooks
│   │   └── useQuery.js    # Custom hook for data fetching with React Query
│   ├── pages
│   │   └── Home.jsx      # Home page component
│   ├── styles
│   │   ├── global.scss    # Global styles including Tailwind CSS
│   │   └── Home.module.scss # Scoped styles for Home component
│   ├── utils
│   │   └── index.js      # Utility functions
│   ├── App.jsx           # Entry point for the application structure
│   ├── main.jsx          # Main entry point for rendering the app
│   └── sw.js             # Service worker for PWA features
├── .eslintrc.cjs         # ESLint configuration
├── .gitignore            # Git ignore file
├── index.html            # Main HTML file
├── package.json          # NPM configuration
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## Getting Started

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd react-vite-pwa
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Build for production:**
   ```
   npm run build
   ```

## Features

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **PWA**: Progressive Web App capabilities for offline support and improved performance.
- **React Query**: For efficient data fetching and state management.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **SCSS Modules**: For scoped styling in components.

## License

This project is licensed under the MIT License.