# Geo-Data App

A web application built with React and Vite to display and interact with maps and display geo data. This app includes a complete backend setup using JSON Server to provide the required API endpoints.

## Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository and navigate to the project directory
2. Install all dependencies:
```bash
npm install
```

### Running the Application

#### Option 1: Run Backend and Frontend Together (Recommended)
```bash
npm run dev:full
```
This command will start both the JSON server (backend) on `http://localhost:3000` and the Vite development server (frontend) on `http://localhost:5173` simultaneously.

#### Option 2: Run Backend and Frontend Separately

**Start the JSON Server (Backend):**
```bash
npm run server
```
This will start the JSON server at `http://localhost:3000` with the following endpoints:
- `GET /roads` - Returns GeoJSON data for roads
- `GET /todos` - Returns todo items
- `POST /todos` - Create new todo items

**Start the Frontend (in a separate terminal):**
```bash
npm run dev
```
This will run the React app locally at `http://localhost:5173`.

### API Endpoints

The JSON server provides these RESTful endpoints:

- **GET /roads**: Returns GeoJSON FeatureCollection with road data including:
  - Geographic coordinates (LineString geometry)
  - Road properties (name, fid, eemi_grade with quality metrics)
  
- **GET /todos**: Returns array of todo items with:
  - id, title, description, status, author, road_fid

- **POST /todos**: Create new todo items

### Sample Data

The app comes with pre-populated sample data:
- **10 road features** with realistic Swiss coordinates and EEMI grade data
- **8 todo items** linked to specific roads with German descriptions

### Troubleshooting

If you encounter network errors:
1. Ensure the JSON server is running on port 3000
2. Check that no other service is using port 3000
3. Verify the API endpoints are accessible at `http://localhost:3000/roads` and `http://localhost:3000/todos`

# Pages of My Maps App

## Map Page

The **Map Page** allows users to interact with a map that displays geo-data, specifically streets represented as GeoJSON. Users can hover on streets to view additional details, including street names, grades, and sub-type grades. When clicked on the street a To-Do modal is presented. This page uses `react-leaflet` for map rendering and custom styling.

## Statistics Page

The **Statistics Page** presents various statistical insights related to the geo-data, including charts and tables. It calculates average grades and provides visualizations like top roads and street distances. This page integrates `GradeAverageChart`, `TopRoadsChart`, and `StreetDistanceTable` components for better data presentation.

## Todos Page

The **Todos Page** displays a list of to-do items associated with roads. Users can view tasks related to specific roads, including title, description, status, author, and associated road feature ID (FID). It uses a data table to show the tasks effectively.

## TypeScript

Except for the store, almost all the pages and components are strongly typed with TypeScript.

## Modules

### Dependencies used in this App

- **@heroicons/react**: React Icons Library.
- **@tailwindcss/vite**: Vite plugin for integrating [Tailwind CSS](https://tailwindcss.com/) into Vite project, allowing for efficient utility-first styling.
- **@tanstack/react-query**: Used in the current app for Data Fetching and Manipulation.
- **axios**: Used for HTTP Requests
- **chart.js**: Used for Data Visualization
- **flowbite-react**: Tailwind based React UI component Library
- **leaflet**: Used for interactive maps.
- **react-chartjs-2**: React wrapper for Chart.js.
- **react-leaflet**: A React wrapper for Leaflet, making it easier to integrate Leaflet maps within React components.
- **react-router-dom**: Used for navigation.
- **tailwindcss**: Used for styling components in this project.
- **zustand**: Used for managing application state with minimal boilerplate.

### Development Dependencies

- **concurrently**: Allows running multiple npm scripts simultaneously (used for `dev:full` command).
- **json-server**: Creates a full fake REST API from the `db.json` file for rapid prototyping and development.
