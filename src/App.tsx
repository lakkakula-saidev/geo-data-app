import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import { queryClient } from "./api/api-query-client";
import { MapPage, NavBar as Navbar, StatisticsPage } from "./pages";
import { TodosPage } from "./pages/TodosPage";

/**
 * GitHub Pages routing:
 * - Vite sets import.meta.env.BASE_URL from vite.config.ts (base: "/geo-data-app/")
 * - We use that directly as BrowserRouter basename (no any casts to satisfy ESLint).
 */
const BASENAME = import.meta.env.BASE_URL;

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={BASENAME}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/todos" element={<TodosPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
