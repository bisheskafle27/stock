# Stock Portfolio App

A React-based frontend application for visualizing stock performance and managing a personal stock portfolio. Built with Next.js, Highcharts, Tanstack Table, and Zustand.

## Features

- **Stock Visualization**: Line and column charts visualizing mock stock price and volume using `Highcharts`.
- **Portfolio Management**: A robust, tabular list of personal stocks with sorting, built using `@tanstack/react-table`.
- **Add/Edit/Delete**: Interactive modals to modify portfolio entries with instant optimistic UI updates.
- **Persistent Storage**: Portfolio state is persisted in localStorage via `Zustand` middleware.
- **Testing**: Unit tests ensuring state management accuracy via `Vitest`.

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm

### Installation

1. Run `npm install` to install dependencies.

### Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.
- The `/dashboard` (Home) path visualizes stock trends.
- The `/portfolio` tab allows for full CRUD management.

### Running Tests

Execute the Vitest suite against the Zustand store logic:

```bash
npm run test
# or
npx vitest run
```
