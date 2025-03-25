# Geo-Data App

A web application built with React and Vite to display and interact with maps and display geo data. This app requires the JSON Server with Geodata running on localhost:3000

### Building the App

To start the development server:

```bash
npm run dev
```

This will run the app locally at `http://localhost:5173`.

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
