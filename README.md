# 🎉 Task Database Website

A fun and zany Notion-like task database website built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 **Database View**: Create and manage databases with customizable columns
- ✏️ **Column Types**: Support for text, status, number, and date fields
- 🎨 **Status Fields**: Customizable status options with colors (like Notion select fields)
- ➕ **Add/Edit Rows**: Easily add and edit rows in your database
- 🗑️ **Delete Rows**: Remove rows you no longer need
- 🎨 **Fun Design**: Zany and colorful design with gradients and animations

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

- **Add a Column**: Click the "Add Column" button in the header
- **Edit a Column**: Click the settings icon (⚙️) on any column header
- **Delete a Column**: Click the settings icon and select "Delete Column"
- **Add a Row**: Click the "Add Row" button in the last column
- **Edit a Cell**: Click on any cell to edit it
- **Delete a Row**: Click the trash icon (🗑️) in the actions column

## Column Types

- **Text**: Simple text input
- **Status**: Dropdown with customizable options and colors
- **Number**: Numeric input
- **Date**: Date input (coming soon)

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

## License

MIT

