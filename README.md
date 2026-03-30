# UI Library Explorer

A modern, responsive web application for discovering and comparing React UI component libraries. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **🔍 Smart Search**: Find libraries by name, description, or tags
- **🎛️ Advanced Filters**: Filter by features, popularity, and more
- **📊 Comparison Tool**: Compare up to 3 libraries side-by-side
- **⭐ Favorites**: Save your preferred libraries
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📱 Responsive**: Works seamlessly on all devices
- **♿ Accessible**: Built with accessibility in mind
- **🔄 Real-Time Data**: Live GitHub statistics with automatic polling and intelligent caching

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd project

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 🛠️ Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Framer Motion** - Animations
- **Radix UI** - Accessible components

## 📁 Project Structure

```
src/
├── components/
│   ├── shared/          # Reusable components
│   └── ui/              # Base UI components
├── data/                # Static data
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
├── utils/               # Utility functions
└── App.tsx              # Main application
```

## 🎯 Usage

### Searching Libraries
- Use the search bar to find libraries by name or description
- Apply filters to narrow down results
- Sort by stars, downloads, or update date

### Comparing Libraries
- Click the compare icon on library cards
- View feature comparison in the bottom panel
- Compare up to 3 libraries simultaneously

### Managing Favorites
- Click the heart icon to save libraries
- Access favorites through filters

## 🔄 Real-Time Data Updates

This application features a real-time data system that automatically fetches live statistics from GitHub:

- **Live Statistics**: Star counts and forks update automatically from GitHub API
- **Intelligent Caching**: Data is cached for 15 minutes to minimize API calls
- **Automatic Polling**: Updates are fetched every 5 minutes when the app is active
- **Manual Refresh**: Click the refresh icon on any library card to fetch the latest data immediately
- **Error Handling**: If GitHub API is unavailable, cached or fallback data is displayed
- **Rate Limit Aware**: The service monitors GitHub API rate limits and adapts accordingly

For detailed information about the real-time data system, see [REAL_TIME_DATA.md](./REAL_TIME_DATA.md).

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- UI library data sourced from various open-source projects
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)